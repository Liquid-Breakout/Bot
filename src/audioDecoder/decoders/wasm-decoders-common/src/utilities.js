"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assignNames = void 0;
var assignNames = function assignNames(Class, name) {
  Object.defineProperty(Class, "name", {
    value: name
  });
};
exports.assignNames = assignNames;