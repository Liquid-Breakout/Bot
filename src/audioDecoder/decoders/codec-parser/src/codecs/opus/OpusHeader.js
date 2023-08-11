"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _constants = require("../../constants.js");
var _utilities = require("../../utilities.js");
var _CodecHeader2 = _interopRequireDefault(require("../CodecHeader.js"));
var _excluded = ["length", "data", "channelMappingFamily"];
var _, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } /* Copyright 2020-2023 Ethan Halsall
                                                                                                                                                                                                                                                                                                                                                                                                  
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
                                                                                                                                                                                                                                                                                                                                                                                                 https://tools.ietf.org/html/rfc7845.html
                                                                                                                                                                                                                                                                                                                                                                                                  0                   1                   2                   3
                                                                                                                                                                                                                                                                                                                                                                                                  0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
                                                                                                                                                                                                                                                                                                                                                                                                 +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
                                                                                                                                                                                                                                                                                                                                                                                                 |      'O'      |      'p'      |      'u'      |      's'      |
                                                                                                                                                                                                                                                                                                                                                                                                 +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
                                                                                                                                                                                                                                                                                                                                                                                                 |      'H'      |      'e'      |      'a'      |      'd'      |
                                                                                                                                                                                                                                                                                                                                                                                                 +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
                                                                                                                                                                                                                                                                                                                                                                                                 |  Version = 1  | Channel Count |           Pre-skip            |
                                                                                                                                                                                                                                                                                                                                                                                                 +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
                                                                                                                                                                                                                                                                                                                                                                                                 |                     Input Sample Rate (Hz)                    |
                                                                                                                                                                                                                                                                                                                                                                                                 +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
                                                                                                                                                                                                                                                                                                                                                                                                 |   Output Gain (Q7.8 in dB)    | Mapping Family|               |
                                                                                                                                                                                                                                                                                                                                                                                                 +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+               :
                                                                                                                                                                                                                                                                                                                                                                                                 |                                                               |
                                                                                                                                                                                                                                                                                                                                                                                                 :               Optional Channel Mapping Table...               :
                                                                                                                                                                                                                                                                                                                                                                                                 |                                                               |
                                                                                                                                                                                                                                                                                                                                                                                                 +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
                                                                                                                                                                                                                                                                                                                                                                                                 
                                                                                                                                                                                                                                                                                                                                                                                                 Letter  Length (bits)  Description
                                                                                                                                                                                                                                                                                                                                                                                                 A  64  Magic Signature - OpusHead
                                                                                                                                                                                                                                                                                                                                                                                                 B  8   Version number - 00000001
                                                                                                                                                                                                                                                                                                                                                                                                 C  8   Output channel count (unsigned)
                                                                                                                                                                                                                                                                                                                                                                                                 D  16  Pre-skip (unsigned, little endian)
                                                                                                                                                                                                                                                                                                                                                                                                 E  32  Sample rate (unsigned, little endian)
                                                                                                                                                                                                                                                                                                                                                                                                 F  16  Output Gain (signed, little endian)
                                                                                                                                                                                                                                                                                                                                                                                                 G  8   Channel Mapping family (unsigned)
                                                                                                                                                                                                                                                                                                                                                                                                 
                                                                                                                                                                                                                                                                                                                                                                                                 // if(channel mapping !== 0)
                                                                                                                                                                                                                                                                                                                                                                                                 H  8   Stream count (unsigned)
                                                                                                                                                                                                                                                                                                                                                                                                 I  8   Coupled Stream Count (unsigned)
                                                                                                                                                                                                                                                                                                                                                                                                 J  8*C Channel Mapping
                                                                                                                                                                                                                                                                                                                                                                                                 */
/* prettier-ignore */
var channelMappingFamilies = {
  0: _constants.vorbisOpusChannelMapping.slice(0, 2),
  /*
  0: "monophonic (mono)"
  1: "stereo (left, right)"
  */
  1: _constants.vorbisOpusChannelMapping
  /*
  0: "monophonic (mono)"
  1: "stereo (left, right)"
  2: "linear surround (left, center, right)"
  3: "quadraphonic (front left, front right, rear left, rear right)"
  4: "5.0 surround (front left, front center, front right, rear left, rear right)"
  5: "5.1 surround (front left, front center, front right, rear left, rear right, LFE)"
  6: "6.1 surround (front left, front center, front right, side left, side right, rear center, LFE)"
  7: "7.1 surround (front left, front center, front right, side left, side right, rear left, rear right, LFE)"
  */
  // additional channel mappings are user defined
};

var silkOnly = "SILK-only";
var celtOnly = "CELT-only";
var hybrid = "Hybrid";
var narrowBand = "narrowband";
var mediumBand = "medium-band";
var wideBand = "wideband";
var superWideBand = "super-wideband";
var fullBand = "fullband";

//  0 1 2 3 4 5 6 7
// +-+-+-+-+-+-+-+-+
// | config  |s| c |
// +-+-+-+-+-+-+-+-+
// prettier-ignore
var configTable = {
  0: (_ = {}, _defineProperty(_, _constants.mode, silkOnly), _defineProperty(_, _constants.bandwidth, narrowBand), _defineProperty(_, _constants.frameSize, 10), _),
  8: (_2 = {}, _defineProperty(_2, _constants.mode, silkOnly), _defineProperty(_2, _constants.bandwidth, narrowBand), _defineProperty(_2, _constants.frameSize, 20), _2),
  16: (_3 = {}, _defineProperty(_3, _constants.mode, silkOnly), _defineProperty(_3, _constants.bandwidth, narrowBand), _defineProperty(_3, _constants.frameSize, 40), _3),
  24: (_4 = {}, _defineProperty(_4, _constants.mode, silkOnly), _defineProperty(_4, _constants.bandwidth, narrowBand), _defineProperty(_4, _constants.frameSize, 60), _4),
  32: (_5 = {}, _defineProperty(_5, _constants.mode, silkOnly), _defineProperty(_5, _constants.bandwidth, mediumBand), _defineProperty(_5, _constants.frameSize, 10), _5),
  40: (_6 = {}, _defineProperty(_6, _constants.mode, silkOnly), _defineProperty(_6, _constants.bandwidth, mediumBand), _defineProperty(_6, _constants.frameSize, 20), _6),
  48: (_7 = {}, _defineProperty(_7, _constants.mode, silkOnly), _defineProperty(_7, _constants.bandwidth, mediumBand), _defineProperty(_7, _constants.frameSize, 40), _7),
  56: (_8 = {}, _defineProperty(_8, _constants.mode, silkOnly), _defineProperty(_8, _constants.bandwidth, mediumBand), _defineProperty(_8, _constants.frameSize, 60), _8),
  64: (_9 = {}, _defineProperty(_9, _constants.mode, silkOnly), _defineProperty(_9, _constants.bandwidth, wideBand), _defineProperty(_9, _constants.frameSize, 10), _9),
  72: (_10 = {}, _defineProperty(_10, _constants.mode, silkOnly), _defineProperty(_10, _constants.bandwidth, wideBand), _defineProperty(_10, _constants.frameSize, 20), _10),
  80: (_11 = {}, _defineProperty(_11, _constants.mode, silkOnly), _defineProperty(_11, _constants.bandwidth, wideBand), _defineProperty(_11, _constants.frameSize, 40), _11),
  88: (_12 = {}, _defineProperty(_12, _constants.mode, silkOnly), _defineProperty(_12, _constants.bandwidth, wideBand), _defineProperty(_12, _constants.frameSize, 60), _12),
  96: (_13 = {}, _defineProperty(_13, _constants.mode, hybrid), _defineProperty(_13, _constants.bandwidth, superWideBand), _defineProperty(_13, _constants.frameSize, 10), _13),
  104: (_14 = {}, _defineProperty(_14, _constants.mode, hybrid), _defineProperty(_14, _constants.bandwidth, superWideBand), _defineProperty(_14, _constants.frameSize, 20), _14),
  112: (_15 = {}, _defineProperty(_15, _constants.mode, hybrid), _defineProperty(_15, _constants.bandwidth, fullBand), _defineProperty(_15, _constants.frameSize, 10), _15),
  120: (_16 = {}, _defineProperty(_16, _constants.mode, hybrid), _defineProperty(_16, _constants.bandwidth, fullBand), _defineProperty(_16, _constants.frameSize, 20), _16),
  128: (_17 = {}, _defineProperty(_17, _constants.mode, celtOnly), _defineProperty(_17, _constants.bandwidth, narrowBand), _defineProperty(_17, _constants.frameSize, 2.5), _17),
  136: (_18 = {}, _defineProperty(_18, _constants.mode, celtOnly), _defineProperty(_18, _constants.bandwidth, narrowBand), _defineProperty(_18, _constants.frameSize, 5), _18),
  144: (_19 = {}, _defineProperty(_19, _constants.mode, celtOnly), _defineProperty(_19, _constants.bandwidth, narrowBand), _defineProperty(_19, _constants.frameSize, 10), _19),
  152: (_20 = {}, _defineProperty(_20, _constants.mode, celtOnly), _defineProperty(_20, _constants.bandwidth, narrowBand), _defineProperty(_20, _constants.frameSize, 20), _20),
  160: (_21 = {}, _defineProperty(_21, _constants.mode, celtOnly), _defineProperty(_21, _constants.bandwidth, wideBand), _defineProperty(_21, _constants.frameSize, 2.5), _21),
  168: (_22 = {}, _defineProperty(_22, _constants.mode, celtOnly), _defineProperty(_22, _constants.bandwidth, wideBand), _defineProperty(_22, _constants.frameSize, 5), _22),
  176: (_23 = {}, _defineProperty(_23, _constants.mode, celtOnly), _defineProperty(_23, _constants.bandwidth, wideBand), _defineProperty(_23, _constants.frameSize, 10), _23),
  184: (_24 = {}, _defineProperty(_24, _constants.mode, celtOnly), _defineProperty(_24, _constants.bandwidth, wideBand), _defineProperty(_24, _constants.frameSize, 20), _24),
  192: (_25 = {}, _defineProperty(_25, _constants.mode, celtOnly), _defineProperty(_25, _constants.bandwidth, superWideBand), _defineProperty(_25, _constants.frameSize, 2.5), _25),
  200: (_26 = {}, _defineProperty(_26, _constants.mode, celtOnly), _defineProperty(_26, _constants.bandwidth, superWideBand), _defineProperty(_26, _constants.frameSize, 5), _26),
  208: (_27 = {}, _defineProperty(_27, _constants.mode, celtOnly), _defineProperty(_27, _constants.bandwidth, superWideBand), _defineProperty(_27, _constants.frameSize, 10), _27),
  216: (_28 = {}, _defineProperty(_28, _constants.mode, celtOnly), _defineProperty(_28, _constants.bandwidth, superWideBand), _defineProperty(_28, _constants.frameSize, 20), _28),
  224: (_29 = {}, _defineProperty(_29, _constants.mode, celtOnly), _defineProperty(_29, _constants.bandwidth, fullBand), _defineProperty(_29, _constants.frameSize, 2.5), _29),
  232: (_30 = {}, _defineProperty(_30, _constants.mode, celtOnly), _defineProperty(_30, _constants.bandwidth, fullBand), _defineProperty(_30, _constants.frameSize, 5), _30),
  240: (_31 = {}, _defineProperty(_31, _constants.mode, celtOnly), _defineProperty(_31, _constants.bandwidth, fullBand), _defineProperty(_31, _constants.frameSize, 10), _31),
  248: (_32 = {}, _defineProperty(_32, _constants.mode, celtOnly), _defineProperty(_32, _constants.bandwidth, fullBand), _defineProperty(_32, _constants.frameSize, 20), _32)
};
var OpusHeader = /*#__PURE__*/function (_CodecHeader) {
  _inherits(OpusHeader, _CodecHeader);
  var _super = _createSuper(OpusHeader);
  /**
   * @private
   * Call OpusHeader.getHeader(Array<Uint8>) to get instance
   */
  function OpusHeader(header) {
    var _this;
    _classCallCheck(this, OpusHeader);
    _this = _super.call(this, header);
    _this[_constants.data] = header[_constants.data];
    _this[_constants.bandwidth] = header[_constants.bandwidth];
    _this[_constants.channelMappingFamily] = header[_constants.channelMappingFamily];
    _this[_constants.channelMappingTable] = header[_constants.channelMappingTable];
    _this[_constants.coupledStreamCount] = header[_constants.coupledStreamCount];
    _this[_constants.frameCount] = header[_constants.frameCount];
    _this[_constants.frameSize] = header[_constants.frameSize];
    _this[_constants.hasOpusPadding] = header[_constants.hasOpusPadding];
    _this[_constants.inputSampleRate] = header[_constants.inputSampleRate];
    _this[_constants.isVbr] = header[_constants.isVbr];
    _this[_constants.mode] = header[_constants.mode];
    _this[_constants.outputGain] = header[_constants.outputGain];
    _this[_constants.preSkip] = header[_constants.preSkip];
    _this[_constants.streamCount] = header[_constants.streamCount];
    return _this;
  }
  _createClass(OpusHeader, null, [{
    key: _constants.getHeaderFromUint8Array,
    value: function value(dataValue, packetData, headerCache) {
      var header = {};

      // get length of header
      // Byte (10 of 19)
      // * `CCCCCCCC`: Channel Count
      header[_constants.channels] = dataValue[9];
      // Byte (19 of 19)
      // * `GGGGGGGG`: Channel Mapping Family
      header[_constants.channelMappingFamily] = dataValue[18];
      header[_constants.length] = header[_constants.channelMappingFamily] !== 0 ? 21 + header[_constants.channels] : 19;
      if (dataValue[_constants.length] < header[_constants.length]) throw new Error("Out of data while inside an Ogg Page");

      // Page Segment Bytes (1-2)
      // * `AAAAA...`: Packet config
      // * `.....B..`:
      // * `......CC`: Packet code
      var packetMode = packetData[0] & 3;
      var packetLength = packetMode === 3 ? 2 : 1;

      // Check header cache
      var key = (0, _utilities.bytesToString)(dataValue[_constants.subarray](0, header[_constants.length])) + (0, _utilities.bytesToString)(packetData[_constants.subarray](0, packetLength));
      var cachedHeader = headerCache[_constants.getHeader](key);
      if (cachedHeader) return new OpusHeader(cachedHeader);

      // Bytes (1-8 of 19): OpusHead - Magic Signature
      if (key.substr(0, 8) !== "OpusHead") {
        return null;
      }

      // Byte (9 of 19)
      // * `00000001`: Version number
      if (dataValue[8] !== 1) return null;
      header[_constants.data] = _constants.uint8Array.from(dataValue[_constants.subarray](0, header[_constants.length]));
      var view = new _constants.dataView(header[_constants.data][_constants.buffer]);
      header[_constants.bitDepth] = 16;

      // Byte (10 of 19)
      // * `CCCCCCCC`: Channel Count
      // set earlier to determine length

      // Byte (11-12 of 19)
      // * `DDDDDDDD|DDDDDDDD`: Pre skip
      header[_constants.preSkip] = view.getUint16(10, true);

      // Byte (13-16 of 19)
      // * `EEEEEEEE|EEEEEEEE|EEEEEEEE|EEEEEEEE`: Sample Rate
      header[_constants.inputSampleRate] = view.getUint32(12, true);
      // Opus is always decoded at 48kHz
      header[_constants.sampleRate] = _constants.rate48000;

      // Byte (17-18 of 19)
      // * `FFFFFFFF|FFFFFFFF`: Output Gain
      header[_constants.outputGain] = view.getInt16(16, true);

      // Byte (19 of 19)
      // * `GGGGGGGG`: Channel Mapping Family
      // set earlier to determine length
      if (header[_constants.channelMappingFamily] in channelMappingFamilies) {
        header[_constants.channelMode] = channelMappingFamilies[header[_constants.channelMappingFamily]][header[_constants.channels] - 1];
        if (!header[_constants.channelMode]) return null;
      }
      if (header[_constants.channelMappingFamily] !== 0) {
        // * `HHHHHHHH`: Stream count
        header[_constants.streamCount] = dataValue[19];

        // * `IIIIIIII`: Coupled Stream count
        header[_constants.coupledStreamCount] = dataValue[20];

        // * `JJJJJJJJ|...` Channel Mapping table
        header[_constants.channelMappingTable] = _toConsumableArray(dataValue[_constants.subarray](21, header[_constants.channels] + 21));
      }
      var packetConfig = configTable[248 & packetData[0]];
      header[_constants.mode] = packetConfig[_constants.mode];
      header[_constants.bandwidth] = packetConfig[_constants.bandwidth];
      header[_constants.frameSize] = packetConfig[_constants.frameSize];

      // https://tools.ietf.org/html/rfc6716#appendix-B
      switch (packetMode) {
        case 0:
          // 0: 1 frame in the packet
          header[_constants.frameCount] = 1;
          break;
        case 1:
        // 1: 2 frames in the packet, each with equal compressed size
        case 2:
          // 2: 2 frames in the packet, with different compressed sizes
          header[_constants.frameCount] = 2;
          break;
        case 3:
          // 3: an arbitrary number of frames in the packet
          header[_constants.isVbr] = !!(128 & packetData[1]);
          header[_constants.hasOpusPadding] = !!(64 & packetData[1]);
          header[_constants.frameCount] = 63 & packetData[1];
          break;
        default:
          return null;
      }

      // set header cache
      {
        var _length = header.length,
          headerData = header.data,
          _channelMappingFamily = header.channelMappingFamily,
          codecUpdateFields = _objectWithoutProperties(header, _excluded);
        headerCache[_constants.setHeader](key, header, codecUpdateFields);
      }
      return new OpusHeader(header);
    }
  }]);
  return OpusHeader;
}(_CodecHeader2["default"]);
exports["default"] = OpusHeader;