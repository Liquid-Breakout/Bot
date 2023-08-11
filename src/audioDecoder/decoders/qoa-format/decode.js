"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = decode;
var _bitstream = require("@thi.ng/bitstream");
var _common = require("./lib/common.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function decodeHeader(stream) {
  var magic = stream.read(32);
  if (magic !== _common.QOA_MAGIC) {
    throw new Error("Not a QOA file; expected magic number 'qoaf'");
  }

  // peek first frame to get audio file data
  var header = {
    samples: stream.read(32),
    channels: stream.read(8),
    sampleRate: stream.read(24)
  };

  // go back to end of header
  stream.seek(64);

  // return data
  return header;
}
function qoa_decode_frame(stream, audio, lmses, channelData, sampleOffset) {
  var channels = stream.read(8);
  var sampleRate = stream.read(24);
  var samples = stream.read(16); // frame samples
  var frameSize = stream.read(16);
  var dataSize = Math.floor(frameSize - 8 - _common.QOA_LMS_LEN * 4 * channels);
  var numSlices = Math.floor(dataSize / 8);
  var maxTotalSamples = numSlices * _common.QOA_SLICE_LEN;
  if (channels != audio.channels || sampleRate != audio.sampleRate || samples * channels > maxTotalSamples) {
    throw new Error("invalid frame header data");
  }

  // decode LMS history and weights
  for (var c = 0; c < channels; c++) {
    var lms = lmses[c];
    for (var i = 0; i < _common.QOA_LMS_LEN; i++) {
      var h = stream.read(16);
      lms.history[i] = h;
    }
    for (var _i = 0; _i < _common.QOA_LMS_LEN; _i++) {
      var w = stream.read(16);
      lms.weights[_i] = w;
    }
  }
  for (var sample_index = 0; sample_index < samples; sample_index += _common.QOA_SLICE_LEN) {
    for (var _c = 0; _c < channels; _c++) {
      var scalefactor = stream.read(4);
      var table = _common.qoa_dequant_tab[scalefactor];
      var slice_start = sample_index;
      var slice_end = Math.min(sample_index + _common.QOA_SLICE_LEN, samples);
      var slice_count = slice_end - slice_start;
      var _lms = lmses[_c];
      var sampleData = channelData[_c];
      var idx = sampleOffset + slice_start;
      var weights = _lms.weights;
      var history = _lms.history;
      var bitsRemaining = 60;
      // note: this loop is a hot code path and could be optimized
      for (var _i2 = 0; _i2 < slice_count; _i2++) {
        var predicted = (0, _common.qoa_lms_predict)(weights, history);
        var quantized = stream.read(3);
        var dequantized = table[quantized];
        var reconstructed = (0, _common.qoa_clamp)(predicted + dequantized, -32768, 32767);
        var sample = reconstructed < 0 ? reconstructed / 32768 : reconstructed / 32767;
        sampleData[idx++] = sample;
        (0, _common.qoa_lms_update)(weights, history, reconstructed, dequantized);
        bitsRemaining -= 3;
      }
      // skip stream if needed
      if (bitsRemaining > 0) {
        stream.read(bitsRemaining);
      }
    }
  }
  return samples;
}
function decode(data) {
  if (data.byteLength < _common.QOA_MIN_FILESIZE) {
    throw new Error("QOA file size must be >= ".concat(_common.QOA_MIN_FILESIZE));
  }
  var stream = new _bitstream.BitInputStream(data);
  var audio = decodeHeader(stream);
  var channelData = [];
  var lmses = [];
  for (var c = 0; c < audio.channels; c++) {
    var d = new Float32Array(audio.samples);
    channelData.push(d);
    lmses.push((0, _common.LMS)());
  }
  var sampleIndex = 0;
  var frameLen = 0;
  do {
    frameLen = qoa_decode_frame(stream, audio, lmses, channelData, sampleIndex);
    sampleIndex += frameLen;
  } while (frameLen && sampleIndex < audio.samples);
  return _objectSpread(_objectSpread({}, audio), {}, {
    channelData: channelData
  });
}