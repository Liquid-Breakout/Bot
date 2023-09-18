"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _constants = require("../../constants.js");
var _utilities = require("../../utilities.js");
var _CodecHeader2 = _interopRequireDefault(require("../CodecHeader.js"));
var _excluded = ["length", "data", "version", "vorbisSetup", "vorbisComments"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); } /* Copyright 2020-2023 Ethan Halsall
                                                                                                                                                                                                                         
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
                                                                                                                                                                                                                     */ /*
                                                                                                                                                                                                                        
                                                                                                                                                                                                                        1  1) [packet_type] : 8 bit value
                                                                                                                                                                                                                        2  2) 0x76, 0x6f, 0x72, 0x62, 0x69, 0x73: the characters ’v’,’o’,’r’,’b’,’i’,’s’ as six octets
                                                                                                                                                                                                                        
                                                                                                                                                                                                                        Letter bits Description
                                                                                                                                                                                                                        A      8    Packet type
                                                                                                                                                                                                                        B      48   Magic signature (vorbis)
                                                                                                                                                                                                                        C      32   Version number
                                                                                                                                                                                                                        D      8    Channels
                                                                                                                                                                                                                        E      32   Sample rate
                                                                                                                                                                                                                        F      32   Bitrate Maximum (signed)
                                                                                                                                                                                                                        G      32   Bitrate Nominal (signed)
                                                                                                                                                                                                                        H      32   Bitrate Minimum (signed)
                                                                                                                                                                                                                        I      4    blocksize 1
                                                                                                                                                                                                                        J      4    blocksize 0
                                                                                                                                                                                                                        K      1    Framing flag
                                                                                                                                                                                                                        */
var blockSizes = {
  // 0b0110: 64,
  // 0b0111: 128,
  // 0b1000: 256,
  // 0b1001: 512,
  // 0b1010: 1024,
  // 0b1011: 2048,
  // 0b1100: 4096,
  // 0b1101: 8192
};
for (var i = 0; i < 8; i++) blockSizes[i + 6] = Math.pow(2, 6 + i);
var VorbisHeader = /*#__PURE__*/function (_CodecHeader) {
  _inherits(VorbisHeader, _CodecHeader);
  var _super = _createSuper(VorbisHeader);
  /**
   * @private
   * Call VorbisHeader.getHeader(Array<Uint8>) to get instance
   */
  function VorbisHeader(header) {
    var _this;
    _classCallCheck(this, VorbisHeader);
    _this = _super.call(this, header);
    _this[_constants.bitrateMaximum] = header[_constants.bitrateMaximum];
    _this[_constants.bitrateMinimum] = header[_constants.bitrateMinimum];
    _this[_constants.bitrateNominal] = header[_constants.bitrateNominal];
    _this[_constants.blocksize0] = header[_constants.blocksize0];
    _this[_constants.blocksize1] = header[_constants.blocksize1];
    _this[_constants.data] = header[_constants.data];
    _this[_constants.vorbisComments] = header[_constants.vorbisComments];
    _this[_constants.vorbisSetup] = header[_constants.vorbisSetup];
    return _this;
  }
  _createClass(VorbisHeader, null, [{
    key: _constants.getHeaderFromUint8Array,
    value: function value(dataValue, headerCache, vorbisCommentsData, vorbisSetupData) {
      // Must be at least 30 bytes.
      if (dataValue[_constants.length] < 30) throw new Error("Out of data while inside an Ogg Page");

      // Check header cache
      var key = (0, _utilities.bytesToString)(dataValue[_constants.subarray](0, 30));
      var cachedHeader = headerCache[_constants.getHeader](key);
      if (cachedHeader) return new VorbisHeader(cachedHeader);
      var header = _defineProperty({}, _constants.length, 30);

      // Bytes (1-7 of 30): /01vorbis - Magic Signature
      if (key.substr(0, 7) !== "\x01vorbis") {
        return null;
      }
      header[_constants.data] = _constants.uint8Array.from(dataValue[_constants.subarray](0, 30));
      var view = new _constants.dataView(header[_constants.data][_constants.buffer]);

      // Byte (8-11 of 30)
      // * `CCCCCCCC|CCCCCCCC|CCCCCCCC|CCCCCCCC`: Version number
      header[_constants.version] = view.getUint32(7, true);
      if (header[_constants.version] !== 0) return null;

      // Byte (12 of 30)
      // * `DDDDDDDD`: Channel Count
      header[_constants.channels] = dataValue[11];
      header[_constants.channelMode] = _constants.vorbisOpusChannelMapping[header[_constants.channels] - 1] || "application defined";

      // Byte (13-16 of 30)
      // * `EEEEEEEE|EEEEEEEE|EEEEEEEE|EEEEEEEE`: Sample Rate
      header[_constants.sampleRate] = view.getUint32(12, true);

      // Byte (17-20 of 30)
      // * `FFFFFFFF|FFFFFFFF|FFFFFFFF|FFFFFFFF`: Bitrate Maximum
      header[_constants.bitrateMaximum] = view.getInt32(16, true);

      // Byte (21-24 of 30)
      // * `GGGGGGGG|GGGGGGGG|GGGGGGGG|GGGGGGGG`: Bitrate Nominal
      header[_constants.bitrateNominal] = view.getInt32(20, true);

      // Byte (25-28 of 30)
      // * `HHHHHHHH|HHHHHHHH|HHHHHHHH|HHHHHHHH`: Bitrate Minimum
      header[_constants.bitrateMinimum] = view.getInt32(24, true);

      // Byte (29 of 30)
      // * `IIII....` Blocksize 1
      // * `....JJJJ` Blocksize 0
      header[_constants.blocksize1] = blockSizes[(dataValue[28] & 240) >> 4];
      header[_constants.blocksize0] = blockSizes[dataValue[28] & 15];
      if (header[_constants.blocksize0] > header[_constants.blocksize1]) return null;

      // Byte (29 of 30)
      // * `00000001` Framing bit
      if (dataValue[29] !== 0x01) return null;
      header[_constants.bitDepth] = 32;
      header[_constants.vorbisSetup] = vorbisSetupData;
      header[_constants.vorbisComments] = vorbisCommentsData;
      {
        // set header cache
        var _length = header.length,
          _data = header.data,
          _version = header.version,
          _vorbisSetup = header.vorbisSetup,
          _vorbisComments = header.vorbisComments,
          codecUpdateFields = _objectWithoutProperties(header, _excluded);
        headerCache[_constants.setHeader](key, header, codecUpdateFields);
      }
      return new VorbisHeader(header);
    }
  }]);
  return VorbisHeader;
}(_CodecHeader2["default"]);
exports["default"] = VorbisHeader;