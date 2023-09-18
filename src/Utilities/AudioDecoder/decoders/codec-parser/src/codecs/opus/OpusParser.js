"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _globals = require("../../globals.js");
var _constants = require("../../constants.js");
var _Parser2 = _interopRequireDefault(require("../Parser.js"));
var _OpusFrame = _interopRequireDefault(require("./OpusFrame.js"));
var _OpusHeader = _interopRequireDefault(require("./OpusHeader.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
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
var OpusParser = /*#__PURE__*/function (_Parser) {
  _inherits(OpusParser, _Parser);
  var _super = _createSuper(OpusParser);
  function OpusParser(codecParser, headerCache, onCodec) {
    var _this;
    _classCallCheck(this, OpusParser);
    _this = _super.call(this, codecParser, headerCache);
    _this.Frame = _OpusFrame["default"];
    _this.Header = _OpusHeader["default"];
    onCodec(_this[_constants.codec]);
    _this._identificationHeader = null;
    return _this;
  }
  _createClass(OpusParser, [{
    key: _constants.codec,
    get: function get() {
      return "opus";
    }

    /**
     * @todo implement continued page support
     */
  }, {
    key: _constants.parseOggPage,
    value: function value(oggPage) {
      var _this2 = this;
      if (oggPage[_constants.pageSequenceNumber] === 0) {
        // Identification header

        this._headerCache[_constants.enable]();
        this._identificationHeader = oggPage[_constants.data];
      } else if (oggPage[_constants.pageSequenceNumber] === 1) {
        // OpusTags
      } else {
        oggPage[_constants.codecFrames] = _globals.frameStore.get(oggPage)[_constants.segments].map(function (segment) {
          var header = _OpusHeader["default"][_constants.getHeaderFromUint8Array](_this2._identificationHeader, segment, _this2._headerCache);
          if (header) return new _OpusFrame["default"](segment, header);
          _this2._codecParser[_constants.logError]("Failed to parse Ogg Opus Header", "Not a valid Ogg Opus file");
        });
      }
      return oggPage;
    }
  }]);
  return OpusParser;
}(_Parser2["default"]);
exports["default"] = OpusParser;