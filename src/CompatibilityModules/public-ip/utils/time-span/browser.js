"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = timeSpan;
function timeSpan() {
  var start = performance.now();
  var end = function end() {
    return performance.now() - start;
  };
  end.rounded = function () {
    return Math.round(end());
  };
  end.seconds = function () {
    return end() / 1000;
  };
  end.nanoseconds = function () {
    return end() * 1000000;
  };
  return end;
}