"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var word = '[a-fA-F\\d:]';
var boundry = function boundry(options) {
  return options && options.includeBoundaries ? "(?:(?<=\\s|^)(?=".concat(word, ")|(?<=").concat(word, ")(?=\\s|$))") : '';
};
var v4 = '(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}';
var v6segment = '[a-fA-F\\d]{1,4}';
var v6 = "\n(?:\n(?:".concat(v6segment, ":){7}(?:").concat(v6segment, "|:)|                                    // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8\n(?:").concat(v6segment, ":){6}(?:").concat(v4, "|:").concat(v6segment, "|:)|                             // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4\n(?:").concat(v6segment, ":){5}(?::").concat(v4, "|(?::").concat(v6segment, "){1,2}|:)|                   // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4\n(?:").concat(v6segment, ":){4}(?:(?::").concat(v6segment, "){0,1}:").concat(v4, "|(?::").concat(v6segment, "){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4\n(?:").concat(v6segment, ":){3}(?:(?::").concat(v6segment, "){0,2}:").concat(v4, "|(?::").concat(v6segment, "){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4\n(?:").concat(v6segment, ":){2}(?:(?::").concat(v6segment, "){0,3}:").concat(v4, "|(?::").concat(v6segment, "){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4\n(?:").concat(v6segment, ":){1}(?:(?::").concat(v6segment, "){0,4}:").concat(v4, "|(?::").concat(v6segment, "){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4\n(?::(?:(?::").concat(v6segment, "){0,5}:").concat(v4, "|(?::").concat(v6segment, "){1,7}|:))             // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4\n)(?:%[0-9a-zA-Z]{1,})?                                             // %eth0            %1\n").replace(/\s*\/\/.*$/gm, '').replace(/\n/g, '').trim();

// Pre-compile only the exact regexes because adding a global flag make regexes stateful
var v46Exact = new RegExp("(?:^".concat(v4, "$)|(?:^").concat(v6, "$)"));
var v4exact = new RegExp("^".concat(v4, "$"));
var v6exact = new RegExp("^".concat(v6, "$"));
var ipRegex = function ipRegex(options) {
  return options && options.exact ? v46Exact : new RegExp("(?:".concat(boundry(options)).concat(v4).concat(boundry(options), ")|(?:").concat(boundry(options)).concat(v6).concat(boundry(options), ")"), 'g');
};
ipRegex.v4 = function (options) {
  return options && options.exact ? v4exact : new RegExp("".concat(boundry(options)).concat(v4).concat(boundry(options)), 'g');
};
ipRegex.v6 = function (options) {
  return options && options.exact ? v6exact : new RegExp("".concat(boundry(options)).concat(v6).concat(boundry(options)), 'g');
};
var _default = ipRegex;
exports["default"] = _default;