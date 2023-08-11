"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _globals = require("../../globals.js");
var _utilities = require("../../utilities.js");
var _constants = require("../../constants.js");
var _CodecHeader2 = _interopRequireDefault(require("../CodecHeader.js"));
var _excluded = ["length", "channelModeBits", "profileBits", "sampleRateBits", "frameLength", "samples", "numberAACFrames"];
var _, _2, _3, _4, _5, _6, _7, _8;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return { value: void 0, done: !0 }; } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable || "" === iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } throw new TypeError(_typeof(iterable) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
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
                                                                                                                                                                                                                                                                                                                                                                                                 https://wiki.multimedia.cx/index.php/ADTS
                                                                                                                                                                                                                                                                                                                                                                                                 
                                                                                                                                                                                                                                                                                                                                                                                                 AAAAAAAA AAAABCCD EEFFFFGH HHIJKLMM MMMMMMMM MMMOOOOO OOOOOOPP (QQQQQQQQ QQQQQQQQ)
                                                                                                                                                                                                                                                                                                                                                                                                 
                                                                                                                                                                                                                                                                                                                                                                                                 AACHeader consists of 7 or 9 bytes (without or with CRC).
                                                                                                                                                                                                                                                                                                                                                                                                 Letter  Length (bits)  Description
                                                                                                                                                                                                                                                                                                                                                                                                 A  12  syncword 0xFFF, all bits must be 1
                                                                                                                                                                                                                                                                                                                                                                                                 B  1   MPEG Version: 0 for MPEG-4, 1 for MPEG-2
                                                                                                                                                                                                                                                                                                                                                                                                 C  2   Layer: always 0
                                                                                                                                                                                                                                                                                                                                                                                                 D  1   protection absent, Warning, set to 1 if there is no CRC and 0 if there is CRC
                                                                                                                                                                                                                                                                                                                                                                                                 E  2   profile, the MPEG-4 Audio Object Type minus 1
                                                                                                                                                                                                                                                                                                                                                                                                 F  4   MPEG-4 Sampling Frequency Index (15 is forbidden)
                                                                                                                                                                                                                                                                                                                                                                                                 G  1   private bit, guaranteed never to be used by MPEG, set to 0 when encoding, ignore when decoding
                                                                                                                                                                                                                                                                                                                                                                                                 H  3   MPEG-4 Channel Configuration (in the case of 0, the channel configuration is sent via an inband PCE)
                                                                                                                                                                                                                                                                                                                                                                                                 I  1   originality, set to 0 when encoding, ignore when decoding
                                                                                                                                                                                                                                                                                                                                                                                                 J  1   home, set to 0 when encoding, ignore when decoding
                                                                                                                                                                                                                                                                                                                                                                                                 K  1   copyrighted id bit, the next bit of a centrally registered copyright identifier, set to 0 when encoding, ignore when decoding
                                                                                                                                                                                                                                                                                                                                                                                                 L  1   copyright id start, signals that this frame's copyright id bit is the first bit of the copyright id, set to 0 when encoding, ignore when decoding
                                                                                                                                                                                                                                                                                                                                                                                                 M  13  frame length, this value must include 7 or 9 bytes of header length: FrameLength = (ProtectionAbsent == 1 ? 7 : 9) + size(AACFrame)
                                                                                                                                                                                                                                                                                                                                                                                                 O  11  Buffer fullness // 0x7FF for VBR
                                                                                                                                                                                                                                                                                                                                                                                                 P  2   Number of AAC frames (RDBs) in ADTS frame minus 1, for maximum compatibility always use 1 AAC frame per ADTS frame
                                                                                                                                                                                                                                                                                                                                                                                                 Q  16  CRC if protection absent is 0 
                                                                                                                                                                                                                                                                                                                                                                                                 */
var mpegVersionValues = {
  0: "MPEG-4",
  8: "MPEG-2"
};
var layerValues = {
  0: "valid",
  2: _constants.bad,
  4: _constants.bad,
  6: _constants.bad
};
var protectionValues = {
  0: _constants.sixteenBitCRC,
  1: _constants.none
};
var profileValues = {
  0: "AAC Main",
  64: "AAC LC (Low Complexity)",
  128: "AAC SSR (Scalable Sample Rate)",
  192: "AAC LTP (Long Term Prediction)"
};
var sampleRates = {
  0: _constants.rate96000,
  4: _constants.rate88200,
  8: _constants.rate64000,
  12: _constants.rate48000,
  16: _constants.rate44100,
  20: _constants.rate32000,
  24: _constants.rate24000,
  28: _constants.rate22050,
  32: _constants.rate16000,
  36: _constants.rate12000,
  40: _constants.rate11025,
  44: _constants.rate8000,
  48: _constants.rate7350,
  52: _constants.reserved,
  56: _constants.reserved,
  60: "frequency is written explicitly"
};

// prettier-ignore
var channelModeValues = {
  0: (_ = {}, _defineProperty(_, _constants.channels, 0), _defineProperty(_, _constants.description, "Defined in AOT Specific Config"), _),
  /*
  'monophonic (mono)'
  'stereo (left, right)'
  'linear surround (front center, front left, front right)'
  'quadraphonic (front center, front left, front right, rear center)'
  '5.0 surround (front center, front left, front right, rear left, rear right)'
  '5.1 surround (front center, front left, front right, rear left, rear right, LFE)'
  '7.1 surround (front center, front left, front right, side left, side right, rear left, rear right, LFE)'
  */
  64: (_2 = {}, _defineProperty(_2, _constants.channels, 1), _defineProperty(_2, _constants.description, _constants.monophonic), _2),
  128: (_3 = {}, _defineProperty(_3, _constants.channels, 2), _defineProperty(_3, _constants.description, (0, _constants.getChannelMapping)(2, _constants.channelMappings[0][0])), _3),
  192: (_4 = {}, _defineProperty(_4, _constants.channels, 3), _defineProperty(_4, _constants.description, (0, _constants.getChannelMapping)(3, _constants.channelMappings[1][3])), _4),
  256: (_5 = {}, _defineProperty(_5, _constants.channels, 4), _defineProperty(_5, _constants.description, (0, _constants.getChannelMapping)(4, _constants.channelMappings[1][3], _constants.channelMappings[3][4])), _5),
  320: (_6 = {}, _defineProperty(_6, _constants.channels, 5), _defineProperty(_6, _constants.description, (0, _constants.getChannelMapping)(5, _constants.channelMappings[1][3], _constants.channelMappings[3][0])), _6),
  384: (_7 = {}, _defineProperty(_7, _constants.channels, 6), _defineProperty(_7, _constants.description, (0, _constants.getChannelMapping)(6, _constants.channelMappings[1][3], _constants.channelMappings[3][0], _constants.lfe)), _7),
  448: (_8 = {}, _defineProperty(_8, _constants.channels, 8), _defineProperty(_8, _constants.description, (0, _constants.getChannelMapping)(8, _constants.channelMappings[1][3], _constants.channelMappings[2][0], _constants.channelMappings[3][0], _constants.lfe)), _8)
};
var AACHeader = /*#__PURE__*/function (_CodecHeader) {
  _inherits(AACHeader, _CodecHeader);
  var _super = _createSuper(AACHeader);
  /**
   * @private
   * Call AACHeader.getHeader(Array<Uint8>) to get instance
   */
  function AACHeader(header) {
    var _this;
    _classCallCheck(this, AACHeader);
    _this = _super.call(this, header);
    _this[_constants.copyrightId] = header[_constants.copyrightId];
    _this[_constants.copyrightIdStart] = header[_constants.copyrightIdStart];
    _this[_constants.bufferFullness] = header[_constants.bufferFullness];
    _this[_constants.isHome] = header[_constants.isHome];
    _this[_constants.isOriginal] = header[_constants.isOriginal];
    _this[_constants.isPrivate] = header[_constants.isPrivate];
    _this[_constants.layer] = header[_constants.layer];
    _this[_constants.length] = header[_constants.length];
    _this[_constants.mpegVersion] = header[_constants.mpegVersion];
    _this[_constants.numberAACFrames] = header[_constants.numberAACFrames];
    _this[_constants.profile] = header[_constants.profile];
    _this[_constants.protection] = header[_constants.protection];
    return _this;
  }
  _createClass(AACHeader, [{
    key: "audioSpecificConfig",
    get: function get() {
      // Audio Specific Configuration
      // * `000EEFFF|F0HHH000`:
      // * `000EE...|........`: Object Type (profileBit + 1)
      // * `.....FFF|F.......`: Sample Rate
      // * `........|.0HHH...`: Channel Configuration
      // * `........|.....0..`: Frame Length (1024)
      // * `........|......0.`: does not depend on core coder
      // * `........|.......0`: Not Extension
      var header = _globals.headerStore.get(this);
      var audioSpecificConfig = header[_constants.profileBits] + 0x40 << 5 | header[_constants.sampleRateBits] << 5 | header[_constants.channelModeBits] >> 3;
      var bytes = new _constants.uint8Array(2);
      new _constants.dataView(bytes[_constants.buffer]).setUint16(0, audioSpecificConfig, false);
      return bytes;
    }
  }], [{
    key: _constants.getHeader,
    value: /*#__PURE__*/_regeneratorRuntime().mark(function value(codecParser, headerCache, readOffset) {
      var header, data, key, cachedHeader, protectionBit, privateBit, _length, _channelModeBits, _profileBits, _sampleRateBits, _frameLength, _samples, _numberAACFrames, codecUpdateFields, bufferFullnessBits;
      return _regeneratorRuntime().wrap(function value$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            header = {}; // Must be at least seven bytes. Out of data
            return _context.delegateYield(codecParser[_constants.readRawData](7, readOffset), "t0", 2);
          case 2:
            data = _context.t0;
            // Check header cache
            key = (0, _utilities.bytesToString)([data[0], data[1], data[2], data[3] & 252 | data[6] & 3 // frame length, buffer fullness varies so don't cache it
            ]);
            cachedHeader = headerCache[_constants.getHeader](key);
            if (cachedHeader) {
              _context.next = 37;
              break;
            }
            if (!(data[0] !== 0xff || data[1] < 0xf0)) {
              _context.next = 8;
              break;
            }
            return _context.abrupt("return", null);
          case 8:
            // Byte (2 of 7)
            // * `1111BCCD`
            // * `....B...`: MPEG Version: 0 for MPEG-4, 1 for MPEG-2
            // * `.....CC.`: Layer: always 0
            // * `.......D`: protection absent, Warning, set to 1 if there is no CRC and 0 if there is CRC
            header[_constants.mpegVersion] = mpegVersionValues[data[1] & 8];
            header[_constants.layer] = layerValues[data[1] & 6];
            if (!(header[_constants.layer] === _constants.bad)) {
              _context.next = 12;
              break;
            }
            return _context.abrupt("return", null);
          case 12:
            protectionBit = data[1] & 1;
            header[_constants.protection] = protectionValues[protectionBit];
            header[_constants.length] = protectionBit ? 7 : 9;

            // Byte (3 of 7)
            // * `EEFFFFGH`
            // * `EE......`: profile, the MPEG-4 Audio Object Type minus 1
            // * `..FFFF..`: MPEG-4 Sampling Frequency Index (15 is forbidden)
            // * `......G.`: private bit, guaranteed never to be used by MPEG, set to 0 when encoding, ignore when decoding
            header[_constants.profileBits] = data[2] & 192;
            header[_constants.sampleRateBits] = data[2] & 60;
            privateBit = data[2] & 2;
            header[_constants.profile] = profileValues[header[_constants.profileBits]];
            header[_constants.sampleRate] = sampleRates[header[_constants.sampleRateBits]];
            if (!(header[_constants.sampleRate] === _constants.reserved)) {
              _context.next = 22;
              break;
            }
            return _context.abrupt("return", null);
          case 22:
            header[_constants.isPrivate] = !!privateBit;

            // Byte (3,4 of 7)
            // * `.......H|HH......`: MPEG-4 Channel Configuration (in the case of 0, the channel configuration is sent via an inband PCE)
            header[_constants.channelModeBits] = (data[2] << 8 | data[3]) & 448;
            header[_constants.channelMode] = channelModeValues[header[_constants.channelModeBits]][_constants.description];
            header[_constants.channels] = channelModeValues[header[_constants.channelModeBits]][_constants.channels];

            // Byte (4 of 7)
            // * `HHIJKLMM`
            // * `..I.....`: originality, set to 0 when encoding, ignore when decoding
            // * `...J....`: home, set to 0 when encoding, ignore when decoding
            // * `....K...`: copyrighted id bit, the next bit of a centrally registered copyright identifier, set to 0 when encoding, ignore when decoding
            // * `.....L..`: copyright id start, signals that this frame's copyright id bit is the first bit of the copyright id, set to 0 when encoding, ignore when decoding
            header[_constants.isOriginal] = !!(data[3] & 32);
            header[_constants.isHome] = !!(data[3] & 8);
            header[_constants.copyrightId] = !!(data[3] & 8);
            header[_constants.copyrightIdStart] = !!(data[3] & 4);
            header[_constants.bitDepth] = 16;
            header[_constants.samples] = 1024;

            // Byte (7 of 7)
            // * `......PP` Number of AAC frames (RDBs) in ADTS frame minus 1, for maximum compatibility always use 1 AAC frame per ADTS frame
            header[_constants.numberAACFrames] = data[6] & 3;
            _length = header.length, _channelModeBits = header.channelModeBits, _profileBits = header.profileBits, _sampleRateBits = header.sampleRateBits, _frameLength = header.frameLength, _samples = header.samples, _numberAACFrames = header.numberAACFrames, codecUpdateFields = _objectWithoutProperties(header, _excluded);
            headerCache[_constants.setHeader](key, header, codecUpdateFields);
            _context.next = 38;
            break;
          case 37:
            Object.assign(header, cachedHeader);
          case 38:
            // Byte (4,5,6 of 7)
            // * `.......MM|MMMMMMMM|MMM.....`: frame length, this value must include 7 or 9 bytes of header length: FrameLength = (ProtectionAbsent == 1 ? 7 : 9) + size(AACFrame)
            header[_constants.frameLength] = (data[3] << 11 | data[4] << 3 | data[5] >> 5) & 0x1fff;
            if (header[_constants.frameLength]) {
              _context.next = 41;
              break;
            }
            return _context.abrupt("return", null);
          case 41:
            // Byte (6,7 of 7)
            // * `...OOOOO|OOOOOO..`: Buffer fullness
            bufferFullnessBits = (data[5] << 6 | data[6] >> 2) & 0x7ff;
            header[_constants.bufferFullness] = bufferFullnessBits === 0x7ff ? "VBR" : bufferFullnessBits;
            return _context.abrupt("return", new AACHeader(header));
          case 44:
          case "end":
            return _context.stop();
        }
      }, value);
    })
  }]);
  return AACHeader;
}(_CodecHeader2["default"]);
exports["default"] = AACHeader;