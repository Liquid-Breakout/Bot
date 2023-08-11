"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = functionTimeout;
exports.isTimeoutError = isTimeoutError;
var _nodeVm = _interopRequireDefault(require("node:vm"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function functionTimeout(_function_) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    timeout = _ref.timeout;
  var script = new _nodeVm["default"].Script('returnValue = function_()');
  var wrappedFunction = function wrappedFunction() {
    for (var _len = arguments.length, arguments_ = new Array(_len), _key = 0; _key < _len; _key++) {
      arguments_[_key] = arguments[_key];
    }
    var context = {
      function_: function function_() {
        return _function_.apply(void 0, arguments_);
      }
    };
    script.runInNewContext(context, {
      timeout: timeout
    });
    return context.returnValue;
  };
  Object.defineProperty(wrappedFunction, 'name', {
    value: "functionTimeout(".concat(_function_.name || '<anonymous>', ")"),
    configurable: true
  });
  return wrappedFunction;
}
function isTimeoutError(error) {
  return (error === null || error === void 0 ? void 0 : error.code) === 'ERR_SCRIPT_EXECUTION_TIMEOUT';
}