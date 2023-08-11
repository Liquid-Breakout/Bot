"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = functionTimeout;
exports.isTimeoutError = isTimeoutError;
// Even though the browser version is a no-op, we wrap it to ensure consistent behavior.
function functionTimeout(function_) {
  var wrappedFunction = function wrappedFunction() {
    return function_.apply(void 0, arguments);
  };
  Object.defineProperty(wrappedFunction, 'name', {
    value: "functionTimeout(".concat(function_.name || '<anonymous>', ")"),
    configurable: true
  });
  return wrappedFunction;
}
function isTimeoutError() {
  return false;
}