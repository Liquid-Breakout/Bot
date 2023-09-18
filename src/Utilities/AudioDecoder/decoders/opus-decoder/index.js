"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "OpusDecoder", {
  enumerable: true,
  get: function get() {
    return _OpusDecoder["default"];
  }
});
Object.defineProperty(exports, "OpusDecoderWebWorker", {
  enumerable: true,
  get: function get() {
    return _OpusDecoderWebWorker["default"];
  }
});
var _OpusDecoder = _interopRequireDefault(require("./src/OpusDecoder.js"));
var _OpusDecoderWebWorker = _interopRequireDefault(require("./src/OpusDecoderWebWorker.js"));
var _common = require("../wasm-decoders-common/index.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
(0, _common.assignNames)(_OpusDecoder["default"], "OpusDecoder");
(0, _common.assignNames)(_OpusDecoderWebWorker["default"], "OpusDecoderWebWorker");