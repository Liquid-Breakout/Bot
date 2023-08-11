"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _constants = require("../../constants.js");
var _utilities = require("../../utilities.js");
var _CodecHeader2 = _interopRequireDefault(require("../CodecHeader.js"));
var _excluded = ["blockingStrategyBits", "frameNumber", "sampleNumber", "samples", "sampleRateBits", "blockSizeBits", "crc", "length"];
var _, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return { value: void 0, done: !0 }; } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable || "" === iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } throw new TypeError(_typeof(iterable) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
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
                                                                                                                                                                                                                                                                                                                                                                                                 https://xiph.org/flac/format.html
                                                                                                                                                                                                                                                                                                                                                                                                 
                                                                                                                                                                                                                                                                                                                                                                                                 AAAAAAAA AAAAAABC DDDDEEEE FFFFGGGH 
                                                                                                                                                                                                                                                                                                                                                                                                 (IIIIIIII...)
                                                                                                                                                                                                                                                                                                                                                                                                 (JJJJJJJJ|JJJJJJJJ)
                                                                                                                                                                                                                                                                                                                                                                                                 (KKKKKKKK|KKKKKKKK)
                                                                                                                                                                                                                                                                                                                                                                                                 LLLLLLLLL
                                                                                                                                                                                                                                                                                                                                                                                                 
                                                                                                                                                                                                                                                                                                                                                                                                 FLAC Frame Header
                                                                                                                                                                                                                                                                                                                                                                                                 Letter  Length (bits)  Description
                                                                                                                                                                                                                                                                                                                                                                                                 A   13  11111111|11111
                                                                                                                                                                                                                                                                                                                                                                                                 B   1   Reserved 0 - mandatory, 1 - reserved
                                                                                                                                                                                                                                                                                                                                                                                                 C   1   Blocking strategy, 0 - fixed, 1 - variable
                                                                                                                                                                                                                                                                                                                                                                                                 D   4   Block size in inter-channel samples
                                                                                                                                                                                                                                                                                                                                                                                                 E   4   Sample rate
                                                                                                                                                                                                                                                                                                                                                                                                 F   4   Channel assignment
                                                                                                                                                                                                                                                                                                                                                                                                 G   3   Sample size in bits
                                                                                                                                                                                                                                                                                                                                                                                                 H   1   Reserved 0 - mandatory, 1 - reserved
                                                                                                                                                                                                                                                                                                                                                                                                 I   ?   if(variable blocksize)
                                                                                                                                                                                                                                                                                                                                                                                                            <8-56>:"UTF-8" coded sample number (decoded number is 36 bits) [4]
                                                                                                                                                                                                                                                                                                                                                                                                         else
                                                                                                                                                                                                                                                                                                                                                                                                            <8-48>:"UTF-8" coded frame number (decoded number is 31 bits) [4]
                                                                                                                                                                                                                                                                                                                                                                                                 J   ?   if(blocksize bits == 011x)
                                                                                                                                                                                                                                                                                                                                                                                                             8/16 bit (blocksize-1)
                                                                                                                                                                                                                                                                                                                                                                                                 K   ?   if(sample rate bits == 11xx)
                                                                                                                                                                                                                                                                                                                                                                                                             8/16 bit sample rate
                                                                                                                                                                                                                                                                                                                                                                                                 L   8   CRC-8 (polynomial = x^8 + x^2 + x^1 + x^0, initialized with 0) of everything before the crc, including the sync code
                                                                                                                                                                                                                                                                                                                                                                                                         
                                                                                                                                                                                                                                                                                                                                                                                                 */
var getFromStreamInfo = "get from STREAMINFO metadata block";
var blockingStrategyValues = {
  0: "Fixed",
  1: "Variable"
};
var blockSizeValues = {
  0: _constants.reserved,
  16: 192
  // 0b00100000: 576,
  // 0b00110000: 1152,
  // 0b01000000: 2304,
  // 0b01010000: 4608,
  // 0b01100000: "8-bit (blocksize-1) from end of header",
  // 0b01110000: "16-bit (blocksize-1) from end of header",
  // 0b10000000: 256,
  // 0b10010000: 512,
  // 0b10100000: 1024,
  // 0b10110000: 2048,
  // 0b11000000: 4096,
  // 0b11010000: 8192,
  // 0b11100000: 16384,
  // 0b11110000: 32768,
};

for (var i = 2; i < 16; i++) blockSizeValues[i << 4] = i < 6 ? 576 * Math.pow(2, i - 2) : Math.pow(2, i);
var sampleRateValues = {
  0: getFromStreamInfo,
  1: _constants.rate88200,
  2: _constants.rate176400,
  3: _constants.rate192000,
  4: _constants.rate8000,
  5: _constants.rate16000,
  6: _constants.rate22050,
  7: _constants.rate24000,
  8: _constants.rate32000,
  9: _constants.rate44100,
  10: _constants.rate48000,
  11: _constants.rate96000,
  // 0b00001100: "8-bit sample rate (in kHz) from end of header",
  // 0b00001101: "16-bit sample rate (in Hz) from end of header",
  // 0b00001110: "16-bit sample rate (in tens of Hz) from end of header",
  15: _constants.bad
};

/* prettier-ignore */
var channelAssignments = {
  /*'
  'monophonic (mono)'
  'stereo (left, right)'
  'linear surround (left, right, center)'
  'quadraphonic (front left, front right, rear left, rear right)'
  '5.0 surround (front left, front right, front center, rear left, rear right)'
  '5.1 surround (front left, front right, front center, LFE, rear left, rear right)'
  '6.1 surround (front left, front right, front center, LFE, rear center, side left, side right)'
  '7.1 surround (front left, front right, front center, LFE, rear left, rear right, side left, side right)'
  */
  0: (_ = {}, _defineProperty(_, _constants.channels, 1), _defineProperty(_, _constants.description, _constants.monophonic), _),
  16: (_2 = {}, _defineProperty(_2, _constants.channels, 2), _defineProperty(_2, _constants.description, (0, _constants.getChannelMapping)(2, _constants.channelMappings[0][0])), _2),
  32: (_3 = {}, _defineProperty(_3, _constants.channels, 3), _defineProperty(_3, _constants.description, (0, _constants.getChannelMapping)(3, _constants.channelMappings[0][1])), _3),
  48: (_4 = {}, _defineProperty(_4, _constants.channels, 4), _defineProperty(_4, _constants.description, (0, _constants.getChannelMapping)(4, _constants.channelMappings[1][0], _constants.channelMappings[3][0])), _4),
  64: (_5 = {}, _defineProperty(_5, _constants.channels, 5), _defineProperty(_5, _constants.description, (0, _constants.getChannelMapping)(5, _constants.channelMappings[1][1], _constants.channelMappings[3][0])), _5),
  80: (_6 = {}, _defineProperty(_6, _constants.channels, 6), _defineProperty(_6, _constants.description, (0, _constants.getChannelMapping)(6, _constants.channelMappings[1][1], _constants.lfe, _constants.channelMappings[3][0])), _6),
  96: (_7 = {}, _defineProperty(_7, _constants.channels, 7), _defineProperty(_7, _constants.description, (0, _constants.getChannelMapping)(7, _constants.channelMappings[1][1], _constants.lfe, _constants.channelMappings[3][4], _constants.channelMappings[2][0])), _7),
  112: (_8 = {}, _defineProperty(_8, _constants.channels, 8), _defineProperty(_8, _constants.description, (0, _constants.getChannelMapping)(8, _constants.channelMappings[1][1], _constants.lfe, _constants.channelMappings[3][0], _constants.channelMappings[2][0])), _8),
  128: (_9 = {}, _defineProperty(_9, _constants.channels, 2), _defineProperty(_9, _constants.description, "".concat(_constants.stereo, " (left, diff)")), _9),
  144: (_10 = {}, _defineProperty(_10, _constants.channels, 2), _defineProperty(_10, _constants.description, "".concat(_constants.stereo, " (diff, right)")), _10),
  160: (_11 = {}, _defineProperty(_11, _constants.channels, 2), _defineProperty(_11, _constants.description, "".concat(_constants.stereo, " (avg, diff)")), _11),
  176: _constants.reserved,
  192: _constants.reserved,
  208: _constants.reserved,
  224: _constants.reserved,
  240: _constants.reserved
};
var bitDepthValues = {
  0: getFromStreamInfo,
  2: 8,
  4: 12,
  6: _constants.reserved,
  8: 16,
  10: 20,
  12: 24,
  14: _constants.reserved
};
var FLACHeader = /*#__PURE__*/function (_CodecHeader) {
  _inherits(FLACHeader, _CodecHeader);
  var _super = _createSuper(FLACHeader);
  /**
   * @private
   * Call FLACHeader.getHeader(Array<Uint8>) to get instance
   */
  function FLACHeader(header) {
    var _this;
    _classCallCheck(this, FLACHeader);
    _this = _super.call(this, header);
    _this[_constants.crc16] = null; // set in FLACFrame
    _this[_constants.blockingStrategy] = header[_constants.blockingStrategy];
    _this[_constants.blockSize] = header[_constants.blockSize];
    _this[_constants.frameNumber] = header[_constants.frameNumber];
    _this[_constants.sampleNumber] = header[_constants.sampleNumber];
    _this[_constants.streamInfo] = null; // set during ogg parsing
    return _this;
  }
  _createClass(FLACHeader, null, [{
    key: "_decodeUTF8Int",
    value:
    // https://datatracker.ietf.org/doc/html/rfc3629#section-3
    //    Char. number range  |        UTF-8 octet sequence
    //    (hexadecimal)    |              (binary)
    // --------------------+---------------------------------------------
    // 0000 0000-0000 007F | 0xxxxxxx
    // 0000 0080-0000 07FF | 110xxxxx 10xxxxxx
    // 0000 0800-0000 FFFF | 1110xxxx 10xxxxxx 10xxxxxx
    // 0001 0000-0010 FFFF | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
    function _decodeUTF8Int(data) {
      if (data[0] > 0xfe) {
        return null; // length byte must have at least one zero as the lsb
      }

      if (data[0] < 0x80) return {
        value: data[0],
        length: 1
      };

      // get length by counting the number of msb that are set to 1
      var length = 1;
      for (var zeroMask = 0x40; zeroMask & data[0]; zeroMask >>= 1) length++;
      var idx = length - 1,
        value = 0,
        shift = 0;

      // sum together the encoded bits in bytes 2 to length
      // 1110xxxx 10[cccccc] 10[bbbbbb] 10[aaaaaa]
      //
      //    value = [cccccc] | [bbbbbb] | [aaaaaa]
      for (; idx > 0; shift += 6, idx--) {
        if ((data[idx] & 0xc0) !== 0x80) {
          return null; // each byte should have leading 10xxxxxx
        }

        value |= (data[idx] & 0x3f) << shift; // add the encoded bits
      }

      // read the final encoded bits in byte 1
      //     1110[dddd] 10[cccccc] 10[bbbbbb] 10[aaaaaa]
      //
      // value = [dddd] | [cccccc] | [bbbbbb] | [aaaaaa]
      value |= (data[idx] & 0x7f >> length) << shift;
      return {
        value: value,
        length: length
      };
    }
  }, {
    key: _constants.getHeaderFromUint8Array,
    value: function value(data, headerCache) {
      var codecParserStub = _defineProperty({}, _constants.readRawData, /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", data);
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return FLACHeader[_constants.getHeader](codecParserStub, headerCache, 0).next().value;
    }
  }, {
    key: _constants.getHeader,
    value: /*#__PURE__*/_regeneratorRuntime().mark(function value(codecParser, headerCache, readOffset) {
      var data, header, key, cachedHeader, channelAssignment, decodedUtf8, _blockingStrategyBits, _frameNumber, _sampleNumber, _samples, _sampleRateBits, _blockSizeBits, _crc, _length, codecUpdateFields;
      return _regeneratorRuntime().wrap(function value$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.delegateYield(codecParser[_constants.readRawData](6, readOffset), "t0", 1);
          case 1:
            data = _context2.t0;
            if (!(data[0] !== 0xff || !(data[1] === 0xf8 || data[1] === 0xf9))) {
              _context2.next = 4;
              break;
            }
            return _context2.abrupt("return", null);
          case 4:
            header = {}; // Check header cache
            key = (0, _utilities.bytesToString)(data[_constants.subarray](0, 4));
            cachedHeader = headerCache[_constants.getHeader](key);
            if (cachedHeader) {
              _context2.next = 30;
              break;
            }
            // Byte (2 of 6)
            // * `.......C`: Blocking strategy, 0 - fixed, 1 - variable
            header[_constants.blockingStrategyBits] = data[1] & 1;
            header[_constants.blockingStrategy] = blockingStrategyValues[header[_constants.blockingStrategyBits]];

            // Byte (3 of 6)
            // * `DDDD....`: Block size in inter-channel samples
            // * `....EEEE`: Sample rate
            header[_constants.blockSizeBits] = data[2] & 240;
            header[_constants.sampleRateBits] = data[2] & 15;
            header[_constants.blockSize] = blockSizeValues[header[_constants.blockSizeBits]];
            if (!(header[_constants.blockSize] === _constants.reserved)) {
              _context2.next = 15;
              break;
            }
            return _context2.abrupt("return", null);
          case 15:
            header[_constants.sampleRate] = sampleRateValues[header[_constants.sampleRateBits]];
            if (!(header[_constants.sampleRate] === _constants.bad)) {
              _context2.next = 18;
              break;
            }
            return _context2.abrupt("return", null);
          case 18:
            if (!(data[3] & 1)) {
              _context2.next = 20;
              break;
            }
            return _context2.abrupt("return", null);
          case 20:
            channelAssignment = channelAssignments[data[3] & 240];
            if (!(channelAssignment === _constants.reserved)) {
              _context2.next = 23;
              break;
            }
            return _context2.abrupt("return", null);
          case 23:
            header[_constants.channels] = channelAssignment[_constants.channels];
            header[_constants.channelMode] = channelAssignment[_constants.description];
            header[_constants.bitDepth] = bitDepthValues[data[3] & 14];
            if (!(header[_constants.bitDepth] === _constants.reserved)) {
              _context2.next = 28;
              break;
            }
            return _context2.abrupt("return", null);
          case 28:
            _context2.next = 31;
            break;
          case 30:
            Object.assign(header, cachedHeader);
          case 31:
            // Byte (5...)
            // * `IIIIIIII|...`: VBR block size ? sample number : frame number
            header[_constants.length] = 5;

            // check if there is enough data to parse UTF8
            return _context2.delegateYield(codecParser[_constants.readRawData](header[_constants.length] + 8, readOffset), "t1", 33);
          case 33:
            data = _context2.t1;
            decodedUtf8 = FLACHeader._decodeUTF8Int(data[_constants.subarray](4));
            if (decodedUtf8) {
              _context2.next = 37;
              break;
            }
            return _context2.abrupt("return", null);
          case 37:
            if (header[_constants.blockingStrategyBits]) {
              header[_constants.sampleNumber] = decodedUtf8.value;
            } else {
              header[_constants.frameNumber] = decodedUtf8.value;
            }
            header[_constants.length] += decodedUtf8[_constants.length];

            // Byte (...)
            // * `JJJJJJJJ|(JJJJJJJJ)`: Blocksize (8/16bit custom value)
            if (!(header[_constants.blockSizeBits] === 96)) {
              _context2.next = 47;
              break;
            }
            if (!(data[_constants.length] < header[_constants.length])) {
              _context2.next = 43;
              break;
            }
            return _context2.delegateYield(codecParser[_constants.readRawData](header[_constants.length], readOffset), "t2", 42);
          case 42:
            data = _context2.t2;
          case 43:
            header[_constants.blockSize] = data[header[_constants.length] - 1] + 1;
            header[_constants.length] += 1;
            _context2.next = 53;
            break;
          case 47:
            if (!(header[_constants.blockSizeBits] === 112)) {
              _context2.next = 53;
              break;
            }
            if (!(data[_constants.length] < header[_constants.length])) {
              _context2.next = 51;
              break;
            }
            return _context2.delegateYield(codecParser[_constants.readRawData](header[_constants.length], readOffset), "t3", 50);
          case 50:
            data = _context2.t3;
          case 51:
            header[_constants.blockSize] = (data[header[_constants.length] - 1] << 8) + data[header[_constants.length]] + 1;
            header[_constants.length] += 2;
          case 53:
            header[_constants.samples] = header[_constants.blockSize];

            // Byte (...)
            // * `KKKKKKKK|(KKKKKKKK)`: Sample rate (8/16bit custom value)
            if (!(header[_constants.sampleRateBits] === 12)) {
              _context2.next = 62;
              break;
            }
            if (!(data[_constants.length] < header[_constants.length])) {
              _context2.next = 58;
              break;
            }
            return _context2.delegateYield(codecParser[_constants.readRawData](header[_constants.length], readOffset), "t4", 57);
          case 57:
            data = _context2.t4;
          case 58:
            header[_constants.sampleRate] = data[header[_constants.length] - 1] * 1000;
            header[_constants.length] += 1;
            _context2.next = 76;
            break;
          case 62:
            if (!(header[_constants.sampleRateBits] === 13)) {
              _context2.next = 70;
              break;
            }
            if (!(data[_constants.length] < header[_constants.length])) {
              _context2.next = 66;
              break;
            }
            return _context2.delegateYield(codecParser[_constants.readRawData](header[_constants.length], readOffset), "t5", 65);
          case 65:
            data = _context2.t5;
          case 66:
            header[_constants.sampleRate] = (data[header[_constants.length] - 1] << 8) + data[header[_constants.length]];
            header[_constants.length] += 2;
            _context2.next = 76;
            break;
          case 70:
            if (!(header[_constants.sampleRateBits] === 14)) {
              _context2.next = 76;
              break;
            }
            if (!(data[_constants.length] < header[_constants.length])) {
              _context2.next = 74;
              break;
            }
            return _context2.delegateYield(codecParser[_constants.readRawData](header[_constants.length], readOffset), "t6", 73);
          case 73:
            data = _context2.t6;
          case 74:
            header[_constants.sampleRate] = ((data[header[_constants.length] - 1] << 8) + data[header[_constants.length]]) * 10;
            header[_constants.length] += 2;
          case 76:
            if (!(data[_constants.length] < header[_constants.length])) {
              _context2.next = 79;
              break;
            }
            return _context2.delegateYield(codecParser[_constants.readRawData](header[_constants.length], readOffset), "t7", 78);
          case 78:
            data = _context2.t7;
          case 79:
            header[_constants.crc] = data[header[_constants.length] - 1];
            if (!(header[_constants.crc] !== (0, _utilities.crc8)(data[_constants.subarray](0, header[_constants.length] - 1)))) {
              _context2.next = 82;
              break;
            }
            return _context2.abrupt("return", null);
          case 82:
            if (!cachedHeader) {
              _blockingStrategyBits = header.blockingStrategyBits, _frameNumber = header.frameNumber, _sampleNumber = header.sampleNumber, _samples = header.samples, _sampleRateBits = header.sampleRateBits, _blockSizeBits = header.blockSizeBits, _crc = header.crc, _length = header.length, codecUpdateFields = _objectWithoutProperties(header, _excluded);
              headerCache[_constants.setHeader](key, header, codecUpdateFields);
            }
            return _context2.abrupt("return", new FLACHeader(header));
          case 84:
          case "end":
            return _context2.stop();
        }
      }, value);
    })
  }]);
  return FLACHeader;
}(_CodecHeader2["default"]);
exports["default"] = FLACHeader;