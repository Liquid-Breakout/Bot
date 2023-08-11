"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "MPEGDecoder", {
  enumerable: true,
  get: function get() {
    return _MPEGDecoder["default"];
  }
});
Object.defineProperty(exports, "MPEGDecoderWebWorker", {
  enumerable: true,
  get: function get() {
    return _MPEGDecoderWebWorker["default"];
  }
});
var _MPEGDecoder = _interopRequireDefault(require("./src/MPEGDecoder.js"));
var _MPEGDecoderWebWorker = _interopRequireDefault(require("./src/MPEGDecoderWebWorker.js"));
var _common = require("../wasm-decoders-common/index.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
(0, _common.assignNames)(_MPEGDecoder["default"], "MPEGDecoder");
(0, _common.assignNames)(_MPEGDecoderWebWorker["default"], "MPEGDecoderWebWorker");