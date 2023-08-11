"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "WASMAudioDecoderCommon", {
  enumerable: true,
  get: function get() {
    return _WASMAudioDecoderCommon["default"];
  }
});
Object.defineProperty(exports, "WASMAudioDecoderWorker", {
  enumerable: true,
  get: function get() {
    return _WASMAudioDecoderWorker["default"];
  }
});
Object.defineProperty(exports, "assignNames", {
  enumerable: true,
  get: function get() {
    return _utilities.assignNames;
  }
});
var _WASMAudioDecoderCommon = _interopRequireDefault(require("./src/WASMAudioDecoderCommon.js"));
var _WASMAudioDecoderWorker = _interopRequireDefault(require("./src/WASMAudioDecoderWorker.js"));
var _utilities = require("./src/utilities.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }