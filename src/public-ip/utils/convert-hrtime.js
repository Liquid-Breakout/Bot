"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = convertHrtime;
function convertHrtime(hrtime) {
  var nanoseconds = hrtime;
  var number = Number(nanoseconds);
  var milliseconds = number / 1000000;
  var seconds = number / 1000000000;
  return {
    seconds: seconds,
    milliseconds: milliseconds,
    nanoseconds: nanoseconds
  };
}