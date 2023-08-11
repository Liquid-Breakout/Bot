"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ipVersion = ipVersion;
exports.isIP = isIP;
exports.isIPv4 = isIPv4;
exports.isIPv6 = isIPv6;
var _ipRegex = _interopRequireDefault(require("./ip-regex.js"));
var _superRegex = require("./super-regex.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var maxIPv4Length = 15;
var maxIPv6Length = 45;
var options = {
  timeout: 400
};
function isIP(string) {
  if (string.length > maxIPv6Length) {
    return false;
  }
  return (0, _superRegex.isMatch)((0, _ipRegex["default"])({
    exact: true
  }), string, options);
}
function isIPv6(string) {
  if (string.length > maxIPv6Length) {
    return false;
  }
  return (0, _superRegex.isMatch)(_ipRegex["default"].v6({
    exact: true
  }), string, options);
}
function isIPv4(string) {
  if (string.length > maxIPv4Length) {
    return false;
  }
  return (0, _superRegex.isMatch)(_ipRegex["default"].v4({
    exact: true
  }), string, options);
}
function ipVersion(string) {
  if (isIPv6(string)) {
    return 6;
  }
  if (isIPv4(string)) {
    return 4;
  }
}