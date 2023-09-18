"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reverse = exports.flacCrc16 = exports.crc8 = exports.crc32Function = exports.concatBuffers = exports.bytesToString = exports.BitReader = void 0;
var _constants = require("./constants.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; } /* Copyright 2020-2023 Ethan Halsall
                                                                                                                                                                                        
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
var getCrcTable = function getCrcTable(crcTable, crcInitialValueFunction, crcFunction) {
  for (var _byte = 0; _byte < crcTable[_constants.length]; _byte++) {
    var crc = crcInitialValueFunction(_byte);
    for (var bit = 8; bit > 0; bit--) crc = crcFunction(crc);
    crcTable[_byte] = crc;
  }
  return crcTable;
};
var crc8Table = getCrcTable(new _constants.uint8Array(256), function (b) {
  return b;
}, function (crc) {
  return crc & 0x80 ? 0x07 ^ crc << 1 : crc << 1;
});
var flacCrc16Table = [getCrcTable(new Uint16Array(256), function (b) {
  return b << 8;
}, function (crc) {
  return crc << 1 ^ (crc & 1 << 15 ? 0x8005 : 0);
})];
var crc32Table = [getCrcTable(new Uint32Array(256), function (b) {
  return b;
}, function (crc) {
  return crc >>> 1 ^ (crc & 1) * 0xedb88320;
})];

// build crc tables
for (var i = 0; i < 15; i++) {
  flacCrc16Table.push(new Uint16Array(256));
  crc32Table.push(new Uint32Array(256));
  for (var j = 0; j <= 0xff; j++) {
    flacCrc16Table[i + 1][j] = flacCrc16Table[0][flacCrc16Table[i][j] >>> 8] ^ flacCrc16Table[i][j] << 8;
    crc32Table[i + 1][j] = crc32Table[i][j] >>> 8 ^ crc32Table[0][crc32Table[i][j] & 0xff];
  }
}
var crc8 = function crc8(data) {
  var crc = 0;
  var dataLength = data[_constants.length];
  for (var _i = 0; _i !== dataLength; _i++) crc = crc8Table[crc ^ data[_i]];
  return crc;
};
exports.crc8 = crc8;
var flacCrc16 = function flacCrc16(data) {
  var dataLength = data[_constants.length];
  var crcChunkSize = dataLength - 16;
  var crc = 0;
  var i = 0;
  while (i <= crcChunkSize) {
    crc ^= data[i++] << 8 | data[i++];
    crc = flacCrc16Table[15][crc >> 8] ^ flacCrc16Table[14][crc & 0xff] ^ flacCrc16Table[13][data[i++]] ^ flacCrc16Table[12][data[i++]] ^ flacCrc16Table[11][data[i++]] ^ flacCrc16Table[10][data[i++]] ^ flacCrc16Table[9][data[i++]] ^ flacCrc16Table[8][data[i++]] ^ flacCrc16Table[7][data[i++]] ^ flacCrc16Table[6][data[i++]] ^ flacCrc16Table[5][data[i++]] ^ flacCrc16Table[4][data[i++]] ^ flacCrc16Table[3][data[i++]] ^ flacCrc16Table[2][data[i++]] ^ flacCrc16Table[1][data[i++]] ^ flacCrc16Table[0][data[i++]];
  }
  while (i !== dataLength) crc = (crc & 0xff) << 8 ^ flacCrc16Table[0][crc >> 8 ^ data[i++]];
  return crc;
};
exports.flacCrc16 = flacCrc16;
var crc32Function = function crc32Function(data) {
  var dataLength = data[_constants.length];
  var crcChunkSize = dataLength - 16;
  var crc = 0;
  var i = 0;
  while (i <= crcChunkSize) crc = crc32Table[15][(data[i++] ^ crc) & 0xff] ^ crc32Table[14][(data[i++] ^ crc >>> 8) & 0xff] ^ crc32Table[13][(data[i++] ^ crc >>> 16) & 0xff] ^ crc32Table[12][data[i++] ^ crc >>> 24] ^ crc32Table[11][data[i++]] ^ crc32Table[10][data[i++]] ^ crc32Table[9][data[i++]] ^ crc32Table[8][data[i++]] ^ crc32Table[7][data[i++]] ^ crc32Table[6][data[i++]] ^ crc32Table[5][data[i++]] ^ crc32Table[4][data[i++]] ^ crc32Table[3][data[i++]] ^ crc32Table[2][data[i++]] ^ crc32Table[1][data[i++]] ^ crc32Table[0][data[i++]];
  while (i !== dataLength) crc = crc32Table[0][(crc ^ data[i++]) & 0xff] ^ crc >>> 8;
  return crc ^ -1;
};
exports.crc32Function = crc32Function;
var concatBuffers = function concatBuffers() {
  for (var _len = arguments.length, buffers = new Array(_len), _key = 0; _key < _len; _key++) {
    buffers[_key] = arguments[_key];
  }
  var buffer = new _constants.uint8Array(buffers.reduce(function (acc, buf) {
    return acc + buf[_constants.length];
  }, 0));
  buffers.reduce(function (offset, buf) {
    buffer.set(buf, offset);
    return offset + buf[_constants.length];
  }, 0);
  return buffer;
};
exports.concatBuffers = concatBuffers;
var bytesToString = function bytesToString(bytes) {
  return String.fromCharCode.apply(String, _toConsumableArray(bytes));
};

// prettier-ignore
exports.bytesToString = bytesToString;
var reverseTable = [0x0, 0x8, 0x4, 0xc, 0x2, 0xa, 0x6, 0xe, 0x1, 0x9, 0x5, 0xd, 0x3, 0xb, 0x7, 0xf];
var reverse = function reverse(val) {
  return reverseTable[val & 15] << 4 | reverseTable[val >> 4];
};
exports.reverse = reverse;
var BitReader = /*#__PURE__*/function () {
  function BitReader(data) {
    _classCallCheck(this, BitReader);
    this._data = data;
    this._pos = data[_constants.length] * 8;
  }
  _createClass(BitReader, [{
    key: "position",
    get: function get() {
      return this._pos;
    },
    set: function set(position) {
      this._pos = position;
    }
  }, {
    key: "read",
    value: function read(bits) {
      var _byte2 = Math.floor(this._pos / 8);
      var bit = this._pos % 8;
      this._pos -= bits;
      var window = (reverse(this._data[_byte2 - 1]) << 8) + reverse(this._data[_byte2]);
      return window >> 7 - bit & 0xff;
    }
  }]);
  return BitReader;
}();
exports.BitReader = BitReader;