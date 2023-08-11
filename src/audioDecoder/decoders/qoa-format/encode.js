"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = encode;
var _bitstream = require("@thi.ng/bitstream");
var _common = require("./lib/common.js");
/* The reciprocal_tab maps each of the 16 scalefactors to their rounded 
reciprocals 1/scalefactor. This allows us to calculate the scaled residuals in 
the encoder with just one multiplication instead of an expensive division. We 
do this in .16 fixed point with integers, instead of floats.

The reciprocal_tab is computed as:
reciprocal_tab[s] <- ((1<<16) + scalefactor_tab[s] - 1) / scalefactor_tab[s] */

var qoa_reciprocal_tab = _common.qoa_scalefactor_tab.map(function (s) {
  return Math.floor(((1 << 16) + s - 1) / s);
});

/* The quant_tab provides an index into the dequant_tab for residuals in the
range of -8 .. 8. It maps this range to just 3bits and becommes less accurate at 
the higher end. Note that the residual zero is identical to the lowest positive 
value. This is mostly fine, since the qoa_div() function always rounds away 
from zero. */

var qoa_quant_tab = [
// -8..-1
7, 7, 7, 5, 5, 3, 3, 1,
// 0
0,
//  1.. 8
0, 2, 2, 4, 4, 6, 6, 6];

/* qoa_div() implements a rounding division, but avoids rounding to zero for 
small numbers. E.g. 0.1 will be rounded to 1. Note that 0 itself still 
returns as 0, which is handled in the qoa_quant_tab[].
qoa_div() takes an index into the .16 fixed point qoa_reciprocal_tab as an
argument, so it can do the division with a cheaper integer multiplication. */

function qoa_div(v, scalefactor) {
  var reciprocal = qoa_reciprocal_tab[scalefactor];
  var n = v * reciprocal + (1 << 15) >> 16;
  n = n + ((v > 0) - (v < 0)) - ((n > 0) - (n < 0)); /* round away from 0 */
  return n;
}
function qoa_encode_frame(stream, audio, lmses, sample_offset, frame_len) {
  var channels = audio.channels;
  var sampleRate = audio.sampleRate;
  var channelData = audio.channelData;
  var samples = audio.samples;
  var slices = Math.floor((frame_len + _common.QOA_SLICE_LEN - 1) / _common.QOA_SLICE_LEN);
  var frame_size = (0, _common.QOA_FRAME_SIZE)(channels, slices);

  // Frame header
  stream.write(channels, 8);
  stream.write(sampleRate, 24);
  stream.write(frame_len, 16); // frame samples
  stream.write(frame_size, 16);

  // write current LMS weights and history state
  for (var c = 0; c < channels; c++) {
    var lms = lmses[c];
    for (var i = 0; i < _common.QOA_LMS_LEN; i++) {
      stream.write(lms.history[i], 16);
    }
    for (var _i = 0; _i < _common.QOA_LMS_LEN; _i++) {
      stream.write(lms.weights[_i], 16);
    }
  }

  /* We encode all samples with the channels interleaved on a slice level.
  E.g. for stereo: (ch-0, slice 0), (ch 1, slice 0), (ch 0, slice 1), ...*/
  for (var sample_index = 0; sample_index < frame_len; sample_index += _common.QOA_SLICE_LEN) {
    for (var _c = 0; _c < channels; _c++) {
      var slice_len = (0, _common.qoa_clamp)(_common.QOA_SLICE_LEN, 0, frame_len - sample_index);
      var slice_start = sample_index;

      /* Brute for search for the best scalefactor. Just go through all
      16 scalefactors, encode all samples for the current slice and 
      meassure the total squared error. */
      var best_error = Number.MAX_SAFE_INTEGER;
      var best_slice = void 0;
      var best_slice_scalefactor = void 0;
      var best_lms = void 0;
      var sampleData = channelData[_c];
      for (var scalefactor = 0; scalefactor < 16; scalefactor++) {
        /* We have to reset the LMS state to the last known good one
        before trying each scalefactor, as each pass updates the LMS
        state when encoding. */
        var _lms = (0, _common.LMS)(lmses[_c].history, lmses[_c].weights);
        var table = _common.qoa_dequant_tab[scalefactor];

        // an array of slice data
        var slice = [];
        var current_error = 0;
        var idx = slice_start + sample_offset;
        for (var _i2 = 0; _i2 < slice_len; _i2++) {
          var sample = sampleData[idx++];

          // turn into 16 bit signed integer
          sample = Math.floor(Math.fround(sample < 0 ? sample * 32768 : sample * 32767));
          sample = (0, _common.qoa_clamp)(sample, -32768, 32767);
          var predicted = (0, _common.qoa_lms_predict)(_lms.weights, _lms.history);
          var residual = sample - predicted;
          var scaled = qoa_div(residual, scalefactor);
          var clamped = (0, _common.qoa_clamp)(scaled, -8, 8);
          var quantized = qoa_quant_tab[clamped + 8];
          var dequantized = table[quantized];
          var reconstructed = (0, _common.qoa_clamp)(predicted + dequantized, -32768, 32767);
          var error = sample - reconstructed;
          current_error += error * error;
          if (current_error > best_error) {
            break;
          }
          (0, _common.qoa_lms_update)(_lms.weights, _lms.history, reconstructed, dequantized);
          slice.push(quantized);
        }
        if (current_error < best_error) {
          best_error = current_error;
          best_slice = slice;
          best_slice_scalefactor = scalefactor;
          best_lms = _lms;
        }
      }
      lmses[_c] = best_lms;
      // first, write the 4bit scalefactor
      stream.write(best_slice_scalefactor, 4);
      // now write each 3bit datum in the slice
      for (var _i3 = 0; _i3 < _common.QOA_SLICE_LEN; _i3++) {
        // the last frame of a file might be smaller than QOA_SLICE_LEN
        var v = _i3 < best_slice.length ? best_slice[_i3] : 0;
        stream.write(v, 3);
      }
    }
  }
}
function encode() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    channelData = _ref.channelData,
    _ref$sampleRate = _ref.sampleRate,
    sampleRate = _ref$sampleRate === void 0 ? 44100 : _ref$sampleRate;
  var channels = channelData.length;
  var samples = channels >= 1 ? channelData[0].length : 0;
  var audio = {
    samples: samples,
    channels: channels,
    channelData: channelData,
    sampleRate: sampleRate
  };
  var num_frames = (samples + _common.QOA_FRAME_LEN - 1) / _common.QOA_FRAME_LEN;
  var num_slices = (samples + _common.QOA_SLICE_LEN - 1) / _common.QOA_SLICE_LEN;
  var encoded_size = 8 /* 8 byte file header */ + num_frames * 8 /* 8 byte frame headers */ + num_frames * _common.QOA_LMS_LEN * 4 * audio.channels /* 4 * 4 bytes lms state per channel */ + num_slices * 8 * audio.channels; /* 8 byte slices */

  var lmses = [];
  for (var c = 0; c < audio.channels; c++) {
    var lms = (0, _common.LMS)();
    lms.weights[0] = 0;
    lms.weights[1] = 0;
    lms.weights[2] = -(1 << 13);
    lms.weights[3] = 1 << 14;
    lmses.push(lms);
  }

  // write header
  var stream = new _bitstream.BitOutputStream(encoded_size);
  stream.write(_common.QOA_MAGIC, 32);
  stream.write(samples, 32);
  var frame_len = _common.QOA_FRAME_LEN;
  for (var sample_index = 0; sample_index < samples; sample_index += frame_len) {
    frame_len = (0, _common.qoa_clamp)(_common.QOA_FRAME_LEN, 0, samples - sample_index);
    qoa_encode_frame(stream, audio, lmses, sample_index, frame_len);
  }
  return stream.bytes();
}