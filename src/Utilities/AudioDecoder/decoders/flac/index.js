"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "FLACDecoder", {
  enumerable: true,
  get: function get() {
    return _FLACDecoder["default"];
  }
});
Object.defineProperty(exports, "FLACDecoderWebWorker", {
  enumerable: true,
  get: function get() {
    return _FLACDecoderWebWorker["default"];
  }
});
var _FLACDecoder = _interopRequireDefault(require("./src/FLACDecoder.js"));
var _FLACDecoderWebWorker = _interopRequireDefault(require("./src/FLACDecoderWebWorker.js"));
var _common = require("../wasm-decoders-common/index.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
(0, _common.assignNames)(_FLACDecoder["default"], "FLACDecoder");
(0, _common.assignNames)(_FLACDecoderWebWorker["default"], "FLACDecoderWebWorker");