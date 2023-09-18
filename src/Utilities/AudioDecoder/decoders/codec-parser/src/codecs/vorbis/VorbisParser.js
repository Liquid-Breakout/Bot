"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _globals = require("../../globals.js");
var _utilities = require("../../utilities.js");
var _constants = require("../../constants.js");
var _Parser2 = _interopRequireDefault(require("../Parser.js"));
var _VorbisFrame = _interopRequireDefault(require("./VorbisFrame.js"));
var _VorbisHeader = _interopRequireDefault(require("./VorbisHeader.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
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
                                                                                                                                                                                                                     */
var VorbisParser = /*#__PURE__*/function (_Parser) {
  _inherits(VorbisParser, _Parser);
  var _super = _createSuper(VorbisParser);
  function VorbisParser(codecParser, headerCache, onCodec) {
    var _this;
    _classCallCheck(this, VorbisParser);
    _this = _super.call(this, codecParser, headerCache);
    _this.Frame = _VorbisFrame["default"];
    onCodec(_this[_constants.codec]);
    _this._identificationHeader = null;
    _this._setupComplete = false;
    _this._prevBlockSize = null;
    return _this;
  }
  _createClass(VorbisParser, [{
    key: _constants.codec,
    get: function get() {
      return _constants.vorbis;
    }
  }, {
    key: _constants.parseOggPage,
    value: function value(oggPage) {
      oggPage[_constants.codecFrames] = [];
      var _iterator = _createForOfIteratorHelper(_globals.frameStore.get(oggPage)[_constants.segments]),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var oggPageSegment = _step.value;
          if (oggPageSegment[0] === 1) {
            // Identification header

            this._headerCache[_constants.enable]();
            this._identificationHeader = oggPage[_constants.data];
            this._setupComplete = false;
          } else if (oggPageSegment[0] === 3) {
            // comment header

            this._vorbisComments = oggPageSegment;
          } else if (oggPageSegment[0] === 5) {
            // setup header

            this._vorbisSetup = oggPageSegment;
            this._mode = this._parseSetupHeader(oggPageSegment);
            this._setupComplete = true;
          } else if (this._setupComplete) {
            var header = _VorbisHeader["default"][_constants.getHeaderFromUint8Array](this._identificationHeader, this._headerCache, this._vorbisComments, this._vorbisSetup);
            if (header) {
              oggPage[_constants.codecFrames].push(new _VorbisFrame["default"](oggPageSegment, header, this._getSamples(oggPageSegment, header)));
            } else {
              this._codecParser[logError]("Failed to parse Ogg Vorbis Header", "Not a valid Ogg Vorbis file");
            }
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return oggPage;
    }
  }, {
    key: "_getSamples",
    value: function _getSamples(segment, header) {
      var blockFlag = this._mode.blockFlags[segment[0] >> 1 & this._mode.mask];
      var currentBlockSize = blockFlag ? header[_constants.blocksize1] : header[_constants.blocksize0];

      // data is not returned on the first frame, but is used to prime the decoder
      // https://xiph.org/vorbis/doc/Vorbis_I_spec.html#x1-590004
      var samplesValue = this._prevBlockSize === null ? 0 : (this._prevBlockSize + currentBlockSize) / 4;
      this._prevBlockSize = currentBlockSize;
      return samplesValue;
    }

    // https://gitlab.xiph.org/xiph/liboggz/-/blob/master/src/liboggz/oggz_auto.c#L911
    // https://github.com/FFmpeg/FFmpeg/blob/master/libavcodec/vorbis_parser.c
    /*
     * This is the format of the mode data at the end of the packet for all
     * Vorbis Version 1 :
     *
     * [ 6:number_of_modes ]
     * [ 1:size | 16:window_type(0) | 16:transform_type(0) | 8:mapping ]
     * [ 1:size | 16:window_type(0) | 16:transform_type(0) | 8:mapping ]
     * [ 1:size | 16:window_type(0) | 16:transform_type(0) | 8:mapping ]
     * [ 1:framing(1) ]
     *
     * e.g.:
     *
     * MsB         LsB
     *              <-
     * 0 0 0 0 0 1 0 0
     * 0 0 1 0 0 0 0 0
     * 0 0 1 0 0 0 0 0
     * 0 0 1|0 0 0 0 0
     * 0 0 0 0|0|0 0 0
     * 0 0 0 0 0 0 0 0
     * 0 0 0 0|0 0 0 0
     * 0 0 0 0 0 0 0 0
     * 0 0 0 0|0 0 0 0
     * 0 0 0|1|0 0 0 0 |
     * 0 0 0 0 0 0 0 0 V
     * 0 0 0|0 0 0 0 0
     * 0 0 0 0 0 0 0 0
     * 0 0|1 0 0 0 0 0
     *
     * The simplest way to approach this is to start at the end
     * and read backwards to determine the mode configuration.
     *
     * liboggz and ffmpeg both use this method.
     */
  }, {
    key: "_parseSetupHeader",
    value: function _parseSetupHeader(setup) {
      var bitReader = new _utilities.BitReader(setup);
      var mode = {
        count: 0,
        blockFlags: []
      };

      // sync with the framing bit
      while ((bitReader.read(1) & 0x01) !== 1) {}
      var modeBits;
      // search in reverse to parse out the mode entries
      // limit mode count to 63 so previous block flag will be in first packet byte
      while (mode.count < 64 && bitReader.position > 0) {
        (0, _utilities.reverse)(bitReader.read(8)); // read mapping

        // 16 bits transform type, 16 bits window type, all values must be zero
        var currentByte = 0;
        while (bitReader.read(8) === 0x00 && currentByte++ < 3) {} // a non-zero value may indicate the end of the mode entries, or invalid data

        if (currentByte === 4) {
          // transform type and window type were all zeros
          modeBits = bitReader.read(7); // modeBits may need to be used in the next iteration if this is the last mode entry
          mode.blockFlags.unshift(modeBits & 0x01); // read and store mode number -> block flag
          bitReader.position += 6; // go back 6 bits so next iteration starts right after the block flag
          mode.count++;
        } else {
          // transform type and window type were not all zeros
          // check for mode count using previous iteration modeBits
          if ((((0, _utilities.reverse)(modeBits) & 126) >> 1) + 1 !== mode.count) {
            this._codecParser[_constants.logWarning]("vorbis derived mode count did not match actual mode count");
          }
          break;
        }
      }

      // xxxxxxxa packet type
      // xxxxxxbx mode count (number of mode count bits)
      // xxxxxcxx previous window flag
      // xxxxdxxx next window flag
      mode.mask = (1 << Math.log2(mode.count)) - 1;
      return mode;
    }
  }]);
  return VorbisParser;
}(_Parser2["default"]);
exports["default"] = VorbisParser;