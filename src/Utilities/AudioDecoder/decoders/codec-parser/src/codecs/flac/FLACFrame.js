"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _globals = require("../../globals.js");
var _utilities = require("../../utilities.js");
var _constants = require("../../constants.js");
var _CodecFrame2 = _interopRequireDefault(require("../CodecFrame.js"));
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
var FLACFrame = /*#__PURE__*/function (_CodecFrame) {
  _inherits(FLACFrame, _CodecFrame);
  var _super = _createSuper(FLACFrame);
  function FLACFrame(data, header, streamInfoValue) {
    _classCallCheck(this, FLACFrame);
    header[_constants.streamInfo] = streamInfoValue;
    header[_constants.crc16] = FLACFrame._getFrameFooterCrc16(data);
    return _super.call(this, header, data, _globals.headerStore.get(header)[_constants.samples]);
  }
  _createClass(FLACFrame, null, [{
    key: "_getFrameFooterCrc16",
    value: function _getFrameFooterCrc16(data) {
      return (data[data[_constants.length] - 2] << 8) + data[data[_constants.length] - 1];
    }

    // check frame footer crc
    // https://xiph.org/flac/format.html#frame_footer
  }, {
    key: _constants.checkFrameFooterCrc16,
    value: function value(data) {
      var expectedCrc16 = FLACFrame._getFrameFooterCrc16(data);
      var actualCrc16 = (0, _utilities.flacCrc16)(data[_constants.subarray](0, -2));
      return expectedCrc16 === actualCrc16;
    }
  }]);
  return FLACFrame;
}(_CodecFrame2["default"]);
exports["default"] = FLACFrame;