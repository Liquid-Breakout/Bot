"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "OggVorbisDecoder", {
  enumerable: true,
  get: function get() {
    return _OggVorbisDecoder["default"];
  }
});
Object.defineProperty(exports, "OggVorbisDecoderWebWorker", {
  enumerable: true,
  get: function get() {
    return _OggVorbisDecoderWebWorker["default"];
  }
});
var _OggVorbisDecoder = _interopRequireDefault(require("./src/OggVorbisDecoder.js"));
var _OggVorbisDecoderWebWorker = _interopRequireDefault(require("./src/OggVorbisDecoderWebWorker.js"));
var _common = require("../wasm-decoders-common/index.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
(0, _common.assignNames)(_OggVorbisDecoder["default"], "OggVorbisDecoder");
(0, _common.assignNames)(_OggVorbisDecoderWebWorker["default"], "OggVorbisDecoderWebWorker");