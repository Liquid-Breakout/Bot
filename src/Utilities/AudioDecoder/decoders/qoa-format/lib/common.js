"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LMS = LMS;
exports.QOA_SLICE_LEN = exports.QOA_SLICES_PER_FRAME = exports.QOA_MIN_FILESIZE = exports.QOA_MAX_CHANNELS = exports.QOA_MAGIC = exports.QOA_LMS_LEN = exports.QOA_FRAME_SIZE = exports.QOA_FRAME_LEN = void 0;
exports.qoa_clamp = qoa_clamp;
exports.qoa_dequant_tab = void 0;
exports.qoa_lms_predict = qoa_lms_predict;
exports.qoa_lms_update = qoa_lms_update;
exports.qoa_scalefactor_tab = exports.qoa_round = void 0;
var QOA_MIN_FILESIZE = 16;
exports.QOA_MIN_FILESIZE = QOA_MIN_FILESIZE;
var QOA_MAX_CHANNELS = 8;
exports.QOA_MAX_CHANNELS = QOA_MAX_CHANNELS;
var QOA_SLICE_LEN = 20;
exports.QOA_SLICE_LEN = QOA_SLICE_LEN;
var QOA_SLICES_PER_FRAME = 256;
exports.QOA_SLICES_PER_FRAME = QOA_SLICES_PER_FRAME;
var QOA_FRAME_LEN = QOA_SLICES_PER_FRAME * QOA_SLICE_LEN;
exports.QOA_FRAME_LEN = QOA_FRAME_LEN;
var QOA_LMS_LEN = 4;
exports.QOA_LMS_LEN = QOA_LMS_LEN;
var QOA_MAGIC = 0x716f6166; /* 'qoaf' */
exports.QOA_MAGIC = QOA_MAGIC;
var QOA_FRAME_SIZE = function QOA_FRAME_SIZE(channels, slices) {
  return Math.floor(8 + QOA_LMS_LEN * 4 * channels + 8 * slices * channels);
};
exports.QOA_FRAME_SIZE = QOA_FRAME_SIZE;
function qoa_clamp(v, min, max) {
  return v < min ? min : v > max ? max : v;
}
function LMS(h, w) {
  var history = new Int16Array(h || 4);
  var weights = new Int16Array(w || 4);
  return {
    history: history,
    weights: weights
  };
}
function qoa_lms_predict(weights, history) {
  return weights[0] * history[0] + weights[1] * history[1] + weights[2] * history[2] + weights[3] * history[3] >> 13;
}
function qoa_lms_update(weights, history, sample, residual) {
  var delta = residual >> 4;
  weights[0] += history[0] < 0 ? -delta : delta;
  weights[1] += history[1] < 0 ? -delta : delta;
  weights[2] += history[2] < 0 ? -delta : delta;
  weights[3] += history[3] < 0 ? -delta : delta;
  history[0] = history[1];
  history[1] = history[2];
  history[2] = history[3];
  history[3] = sample;
}
var qoa_round = function qoa_round(num) {
  return Math.sign(num) * Math.round(Math.abs(num));
};

/* We have 16 different scalefactors. Like the quantized residuals these become
less accurate at the higher end. In theory, the highest scalefactor that we
would need to encode the highest 16bit residual is (2**16)/8 = 8192. However we
rely on the LMS filter to predict samples accurately enough that a maximum 
residual of one quarter of the 16 bit range is high sufficent. I.e. with the 
scalefactor 2048 times the quant range of 8 we can encode residuals up to 2**14.

The scalefactor values are computed as:
scalefactor_tab[s] <- round(pow(s + 1, 2.75)) */
exports.qoa_round = qoa_round;
var qoa_scalefactor_tab = Array(16).fill().map(function (_, s) {
  return qoa_round(Math.pow(s + 1, 2.75));
});

/* The dequant_tab maps each of the scalefactors and quantized residuals to 
their unscaled & dequantized version.

Since qoa_div rounds away from the zero, the smallest entries are mapped to 3/4
instead of 1. The dequant_tab assumes the following dequantized values for each 
of the quant_tab indices and is computed as:
float dqt[8] = {0.75, -0.75, 2.5, -2.5, 4.5, -4.5, 7, -7};
dequant_tab[s][q] <- round(scalefactor_tab[s] * dqt[q]) */
exports.qoa_scalefactor_tab = qoa_scalefactor_tab;
var dqt = [0.75, -0.75, 2.5, -2.5, 4.5, -4.5, 7, -7];
var qoa_dequant_tab = qoa_scalefactor_tab.map(function (sf) {
  return dqt.map(function (dq) {
    return qoa_round(dq * sf);
  });
});
exports.qoa_dequant_tab = qoa_dequant_tab;