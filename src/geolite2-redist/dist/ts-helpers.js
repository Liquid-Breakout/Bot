"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildObjectFromEntries = buildObjectFromEntries;
// Type helpers, better than Object functions with TypeScript
function buildObjectFromEntries(entries) {
  let object;
  let entry;
  for (entry of entries) {
    object = {
      // @ts-ignore
      ...object,
      [entry[0]]: entry[1]
    };
  }
  // @ts-ignore
  return object;
}