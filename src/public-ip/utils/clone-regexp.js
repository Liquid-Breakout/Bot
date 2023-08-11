"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = clonedRegexp;
var _isRegexp = _interopRequireDefault(require("./is-regexp.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var flagMap = {
  global: 'g',
  ignoreCase: 'i',
  multiline: 'm',
  dotAll: 's',
  sticky: 'y',
  unicode: 'u'
};
function clonedRegexp(regexp) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (!(0, _isRegexp["default"])(regexp)) {
    throw new TypeError('Expected a RegExp instance');
  }
  var flags = Object.keys(flagMap).map(function (flag) {
    return (typeof options[flag] === 'boolean' ? options[flag] : regexp[flag]) ? flagMap[flag] : '';
  }).join('');
  var clonedRegexp = new RegExp(options.source || regexp.source, flags);
  clonedRegexp.lastIndex = typeof options.lastIndex === 'number' ? options.lastIndex : regexp.lastIndex;
  return clonedRegexp;
}