"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "OggOpusDecoder", {
  enumerable: true,
  get: function get() {
    return _OggOpusDecoder["default"];
  }
});
Object.defineProperty(exports, "OggOpusDecoderWebWorker", {
  enumerable: true,
  get: function get() {
    return _OggOpusDecoderWebWorker["default"];
  }
});
var _OggOpusDecoder = _interopRequireDefault(require("./src/OggOpusDecoder.js"));
var _OggOpusDecoderWebWorker = _interopRequireDefault(require("./src/OggOpusDecoderWebWorker.js"));
var _common = require("../wasm-decoders-common/index.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
(0, _common.assignNames)(_OggOpusDecoder["default"], "OggOpusDecoder");
(0, _common.assignNames)(_OggOpusDecoderWebWorker["default"], "OggOpusDecoderWebWorker");