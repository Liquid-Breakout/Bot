"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _constants = require("../../constants.js");
var _utilities = require("../../utilities.js");
var _ID3v = _interopRequireDefault(require("../../metadata/ID3v2.js"));
var _CodecHeader2 = _interopRequireDefault(require("../CodecHeader.js"));
var _excluded = ["length", "frameLength", "samples"];
var _v, _v2, _2, _3, _4, _5, _7, _8, _9, _10, _11, _12;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return { value: void 0, done: !0 }; } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable || "" === iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } throw new TypeError(_typeof(iterable) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
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
                                                                                                                                                                                                                                                                                                                                                                                              */
// http://www.mp3-tech.org/programmer/frame_header.html

var bitrateMatrix = {
  // bits | V1,L1 | V1,L2 | V1,L3 | V2,L1 | V2,L2 & L3
  0: [_constants.free, _constants.free, _constants.free, _constants.free, _constants.free],
  16: [32, 32, 32, 32, 8],
  // 0b00100000: [64,   48,  40,  48,  16,],
  // 0b00110000: [96,   56,  48,  56,  24,],
  // 0b01000000: [128,  64,  56,  64,  32,],
  // 0b01010000: [160,  80,  64,  80,  40,],
  // 0b01100000: [192,  96,  80,  96,  48,],
  // 0b01110000: [224, 112,  96, 112,  56,],
  // 0b10000000: [256, 128, 112, 128,  64,],
  // 0b10010000: [288, 160, 128, 144,  80,],
  // 0b10100000: [320, 192, 160, 160,  96,],
  // 0b10110000: [352, 224, 192, 176, 112,],
  // 0b11000000: [384, 256, 224, 192, 128,],
  // 0b11010000: [416, 320, 256, 224, 144,],
  // 0b11100000: [448, 384, 320, 256, 160,],
  240: [_constants.bad, _constants.bad, _constants.bad, _constants.bad, _constants.bad]
};
var calcBitrate = function calcBitrate(idx, interval, intervalOffset) {
  return 8 * ((idx + intervalOffset) % interval + interval) * (1 << (idx + intervalOffset) / interval) - 8 * interval * (interval / 8 | 0);
};

// generate bitrate matrix
for (var i = 2; i < 15; i++) bitrateMatrix[i << 4] = [i * 32,
//                V1,L1
calcBitrate(i, 4, 0),
//  V1,L2
calcBitrate(i, 4, -1),
// V1,L3
calcBitrate(i, 8, 4),
//  V2,L1
calcBitrate(i, 8, 0) //  V2,L2 & L3
];

var v1Layer1 = 0;
var v1Layer2 = 1;
var v1Layer3 = 2;
var v2Layer1 = 3;
var v2Layer23 = 4;
var bands = "bands ";
var to31 = " to 31";
var layer12ModeExtensions = {
  0: bands + 4 + to31,
  16: bands + 8 + to31,
  32: bands + 12 + to31,
  48: bands + 16 + to31
};
var bitrateIndex = "bitrateIndex";
var v2 = "v2";
var v1 = "v1";
var intensityStereo = "Intensity stereo ";
var msStereo = ", MS stereo ";
var on = "on";
var off = "off";
var layer3ModeExtensions = {
  0: intensityStereo + off + msStereo + off,
  16: intensityStereo + on + msStereo + off,
  32: intensityStereo + off + msStereo + on,
  48: intensityStereo + on + msStereo + on
};
var layersValues = {
  0: _defineProperty({}, _constants.description, _constants.reserved),
  2: (_2 = {}, _defineProperty(_2, _constants.description, "Layer III"), _defineProperty(_2, _constants.framePadding, 1), _defineProperty(_2, _constants.modeExtension, layer3ModeExtensions), _defineProperty(_2, v1, (_v = {}, _defineProperty(_v, bitrateIndex, v1Layer3), _defineProperty(_v, _constants.samples, 1152), _v)), _defineProperty(_2, v2, (_v2 = {}, _defineProperty(_v2, bitrateIndex, v2Layer23), _defineProperty(_v2, _constants.samples, 576), _v2)), _2),
  4: (_3 = {}, _defineProperty(_3, _constants.description, "Layer II"), _defineProperty(_3, _constants.framePadding, 1), _defineProperty(_3, _constants.modeExtension, layer12ModeExtensions), _defineProperty(_3, _constants.samples, 1152), _defineProperty(_3, v1, _defineProperty({}, bitrateIndex, v1Layer2)), _defineProperty(_3, v2, _defineProperty({}, bitrateIndex, v2Layer23)), _3),
  6: (_4 = {}, _defineProperty(_4, _constants.description, "Layer I"), _defineProperty(_4, _constants.framePadding, 4), _defineProperty(_4, _constants.modeExtension, layer12ModeExtensions), _defineProperty(_4, _constants.samples, 384), _defineProperty(_4, v1, _defineProperty({}, bitrateIndex, v1Layer1)), _defineProperty(_4, v2, _defineProperty({}, bitrateIndex, v2Layer1)), _4)
};
var mpegVersionDescription = "MPEG Version ";
var isoIec = "ISO/IEC ";
var mpegVersions = {
  0: (_5 = {}, _defineProperty(_5, _constants.description, "".concat(mpegVersionDescription, "2.5 (later extension of MPEG 2)")), _defineProperty(_5, _constants.layer, v2), _defineProperty(_5, _constants.sampleRate, {
    0: _constants.rate11025,
    4: _constants.rate12000,
    8: _constants.rate8000,
    12: _constants.reserved
  }), _5),
  8: _defineProperty({}, _constants.description, _constants.reserved),
  16: (_7 = {}, _defineProperty(_7, _constants.description, "".concat(mpegVersionDescription, "2 (").concat(isoIec, "13818-3)")), _defineProperty(_7, _constants.layer, v2), _defineProperty(_7, _constants.sampleRate, {
    0: _constants.rate22050,
    4: _constants.rate24000,
    8: _constants.rate16000,
    12: _constants.reserved
  }), _7),
  24: (_8 = {}, _defineProperty(_8, _constants.description, "".concat(mpegVersionDescription, "1 (").concat(isoIec, "11172-3)")), _defineProperty(_8, _constants.layer, v1), _defineProperty(_8, _constants.sampleRate, {
    0: _constants.rate44100,
    4: _constants.rate48000,
    8: _constants.rate32000,
    12: _constants.reserved
  }), _8),
  length: _constants.length
};
var protectionValues = {
  0: _constants.sixteenBitCRC,
  1: _constants.none
};
var emphasisValues = {
  0: _constants.none,
  1: "50/15 ms",
  2: _constants.reserved,
  3: "CCIT J.17"
};
var channelModes = {
  0: (_9 = {}, _defineProperty(_9, _constants.channels, 2), _defineProperty(_9, _constants.description, _constants.stereo), _9),
  64: (_10 = {}, _defineProperty(_10, _constants.channels, 2), _defineProperty(_10, _constants.description, "joint " + _constants.stereo), _10),
  128: (_11 = {}, _defineProperty(_11, _constants.channels, 2), _defineProperty(_11, _constants.description, "dual channel"), _11),
  192: (_12 = {}, _defineProperty(_12, _constants.channels, 1), _defineProperty(_12, _constants.description, _constants.monophonic), _12)
};
var MPEGHeader = /*#__PURE__*/function (_CodecHeader) {
  _inherits(MPEGHeader, _CodecHeader);
  var _super = _createSuper(MPEGHeader);
  /**
   * @private
   * Call MPEGHeader.getHeader(Array<Uint8>) to get instance
   */
  function MPEGHeader(header) {
    var _this;
    _classCallCheck(this, MPEGHeader);
    _this = _super.call(this, header);
    _this[_constants.bitrate] = header[_constants.bitrate];
    _this[_constants.emphasis] = header[_constants.emphasis];
    _this[_constants.framePadding] = header[_constants.framePadding];
    _this[_constants.isCopyrighted] = header[_constants.isCopyrighted];
    _this[_constants.isOriginal] = header[_constants.isOriginal];
    _this[_constants.isPrivate] = header[_constants.isPrivate];
    _this[_constants.layer] = header[_constants.layer];
    _this[_constants.modeExtension] = header[_constants.modeExtension];
    _this[_constants.mpegVersion] = header[_constants.mpegVersion];
    _this[_constants.protection] = header[_constants.protection];
    return _this;
  }
  _createClass(MPEGHeader, null, [{
    key: _constants.getHeader,
    value: /*#__PURE__*/_regeneratorRuntime().mark(function value(codecParser, headerCache, readOffset) {
      var header, id3v2Header, data, key, cachedHeader, mpegVersionValues, layerBits, layerValues, channelModeBits, _length, _frameLength, _samples, codecUpdateFields;
      return _regeneratorRuntime().wrap(function value$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            header = {}; // check for id3 header
            return _context.delegateYield(_ID3v["default"].getID3v2Header(codecParser, headerCache, readOffset), "t0", 2);
          case 2:
            id3v2Header = _context.t0;
            if (!id3v2Header) {
              _context.next = 6;
              break;
            }
            return _context.delegateYield(codecParser[_constants.readRawData](id3v2Header[_constants.length], readOffset), "t1", 5);
          case 5:
            codecParser[_constants.incrementRawData](id3v2Header[_constants.length]);
          case 6:
            return _context.delegateYield(codecParser[_constants.readRawData](4, readOffset), "t2", 7);
          case 7:
            data = _context.t2;
            // Check header cache
            key = (0, _utilities.bytesToString)(data[_constants.subarray](0, 4));
            cachedHeader = headerCache[_constants.getHeader](key);
            if (!cachedHeader) {
              _context.next = 12;
              break;
            }
            return _context.abrupt("return", new MPEGHeader(cachedHeader));
          case 12:
            if (!(data[0] !== 0xff || data[1] < 0xe0)) {
              _context.next = 14;
              break;
            }
            return _context.abrupt("return", null);
          case 14:
            // Byte (2 of 4)
            // * `111BBCCD`
            // * `...BB...`: MPEG Audio version ID
            // * `.....CC.`: Layer description
            // * `.......D`: Protection bit (0 - Protected by CRC (16bit CRC follows header), 1 = Not protected)
            // Mpeg version (1, 2, 2.5)
            mpegVersionValues = mpegVersions[data[1] & 24];
            if (!(mpegVersionValues[_constants.description] === _constants.reserved)) {
              _context.next = 17;
              break;
            }
            return _context.abrupt("return", null);
          case 17:
            // Layer (I, II, III)
            layerBits = data[1] & 6;
            if (!(layersValues[layerBits][_constants.description] === _constants.reserved)) {
              _context.next = 20;
              break;
            }
            return _context.abrupt("return", null);
          case 20:
            layerValues = _objectSpread(_objectSpread({}, layersValues[layerBits]), layersValues[layerBits][mpegVersionValues[_constants.layer]]);
            header[_constants.mpegVersion] = mpegVersionValues[_constants.description];
            header[_constants.layer] = layerValues[_constants.description];
            header[_constants.samples] = layerValues[_constants.samples];
            header[_constants.protection] = protectionValues[data[1] & 1];
            header[_constants.length] = 4;

            // Byte (3 of 4)
            // * `EEEEFFGH`
            // * `EEEE....`: Bitrate index. 1111 is invalid, everything else is accepted
            // * `....FF..`: Sample rate
            // * `......G.`: Padding bit, 0=frame not padded, 1=frame padded
            // * `.......H`: Private bit.
            header[_constants.bitrate] = bitrateMatrix[data[2] & 240][layerValues[bitrateIndex]];
            if (!(header[_constants.bitrate] === _constants.bad)) {
              _context.next = 29;
              break;
            }
            return _context.abrupt("return", null);
          case 29:
            header[_constants.sampleRate] = mpegVersionValues[_constants.sampleRate][data[2] & 12];
            if (!(header[_constants.sampleRate] === _constants.reserved)) {
              _context.next = 32;
              break;
            }
            return _context.abrupt("return", null);
          case 32:
            header[_constants.framePadding] = data[2] & 2 && layerValues[_constants.framePadding];
            header[_constants.isPrivate] = !!(data[2] & 1);
            header[_constants.frameLength] = Math.floor(125 * header[_constants.bitrate] * header[_constants.samples] / header[_constants.sampleRate] + header[_constants.framePadding]);
            if (header[_constants.frameLength]) {
              _context.next = 37;
              break;
            }
            return _context.abrupt("return", null);
          case 37:
            // Byte (4 of 4)
            // * `IIJJKLMM`
            // * `II......`: Channel mode
            // * `..JJ....`: Mode extension (only if joint stereo)
            // * `....K...`: Copyright
            // * `.....L..`: Original
            // * `......MM`: Emphasis
            channelModeBits = data[3] & 192;
            header[_constants.channelMode] = channelModes[channelModeBits][_constants.description];
            header[_constants.channels] = channelModes[channelModeBits][_constants.channels];
            header[_constants.modeExtension] = layerValues[_constants.modeExtension][data[3] & 48];
            header[_constants.isCopyrighted] = !!(data[3] & 8);
            header[_constants.isOriginal] = !!(data[3] & 4);
            header[_constants.emphasis] = emphasisValues[data[3] & 3];
            if (!(header[_constants.emphasis] === _constants.reserved)) {
              _context.next = 46;
              break;
            }
            return _context.abrupt("return", null);
          case 46:
            header[_constants.bitDepth] = 16;

            // set header cache
            _length = header.length, _frameLength = header.frameLength, _samples = header.samples, codecUpdateFields = _objectWithoutProperties(header, _excluded);
            headerCache[_constants.setHeader](key, header, codecUpdateFields);
            return _context.abrupt("return", new MPEGHeader(header));
          case 50:
          case "end":
            return _context.stop();
        }
      }, value);
    })
  }]);
  return MPEGHeader;
}(_CodecHeader2["default"]);
exports["default"] = MPEGHeader;