"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _globals = require("../globals.js");
var _constants = require("../constants.js");
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /* Copyright 2020-2023 Ethan Halsall
                                                                                                                                                              
                                                                                                                                                              This file is part of codec-parser.
                                                                                                                                                              
                                                                                                                                                              codec-parser is free software: you can redistribute it and/or modify
                                                                                                                                                              it under the terms of the GNU Lesser General Public License as published by
                                                                                                                                                              the Free Software Foundation, either version 3 of the License, or
                                                                                                                                                              (at your option) any later version.
                                                                                                                                                          
                                                                                                                                                              codec-parser is distributed in the hope that it will be useful,
                                                                                                                                                              but WITHOUT ANY WARRANTY; without even the implied warranty of
                                                                                                                                                              MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
                                                                                                                                                              GNU Lesser General Public License for more details.
                                                                                                                                                          
                                                                                                                                                              You should have received a copy of the GNU Lesser General Public License
                                                                                                                                                              along with this program.  If not, see <https://www.gnu.org/licenses/>
                                                                                                                                                          */
var CodecHeader = /*#__PURE__*/_createClass(
/**
 * @private
 */
function CodecHeader(header) {
  _classCallCheck(this, CodecHeader);
  _globals.headerStore.set(this, header);
  this[_constants.bitDepth] = header[_constants.bitDepth];
  this[_constants.bitrate] = null; // set during frame mapping
  this[_constants.channels] = header[_constants.channels];
  this[_constants.channelMode] = header[_constants.channelMode];
  this[_constants.sampleRate] = header[_constants.sampleRate];
});
exports["default"] = CodecHeader;