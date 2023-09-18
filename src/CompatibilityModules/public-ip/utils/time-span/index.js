"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = timeSpan;
var _convertHrtime = _interopRequireDefault(require("../convert-hrtime.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function timeSpan() {
  var start = process.hrtime.bigint();
  var end = function end(type) {
    return (0, _convertHrtime["default"])(process.hrtime.bigint() - start)[type];
  };
  var returnValue = function returnValue() {
    return end('milliseconds');
  };
  returnValue.rounded = function () {
    return Math.round(end('milliseconds'));
  };
  returnValue.seconds = function () {
    return end('seconds');
  };
  returnValue.nanoseconds = function () {
    return end('nanoseconds');
  };
  return returnValue;
}