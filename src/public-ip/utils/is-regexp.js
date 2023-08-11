"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isRegexp;
var toString = Object.prototype.toString;
function isRegexp(value) {
  return toString.call(value) === '[object RegExp]';
}