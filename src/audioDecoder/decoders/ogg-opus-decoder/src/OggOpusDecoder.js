"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _common = require("../../wasm-decoders-common/index.js");
var _opusDecoder = require("../../opus-decoder/index.js");
var _codecParser = _interopRequireWildcard(require("../../codec-parser/index.js"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return { value: void 0, done: !0 }; } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable || "" === iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } throw new TypeError(_typeof(iterable) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var DecoderState = /*#__PURE__*/function () {
  function DecoderState(instance) {
    _classCallCheck(this, DecoderState);
    this._instance = instance;
    this._sampleRate = this._instance._sampleRate;
    this._decoderOperations = [];
    this._errors = [];
    this._decoded = [];
    this._channelsDecoded = 0;
    this._totalSamples = 0;
  }
  _createClass(DecoderState, [{
    key: "decoded",
    get: function get() {
      var _this = this;
      return this._instance.ready.then(function () {
        return Promise.all(_this._decoderOperations);
      }).then(function () {
        return [_this._errors, _this._decoded, _this._channelsDecoded, _this._totalSamples, _this._sampleRate];
      });
    }
  }, {
    key: "_instantiateDecoder",
    value: function () {
      var _instantiateDecoder2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(header) {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              this._preSkip = header[_codecParser.preSkip];
              this._instance._decoder = new this._instance._decoderClass({
                channels: header[_codecParser.channels],
                streamCount: header[_codecParser.streamCount],
                coupledStreamCount: header[_codecParser.coupledStreamCount],
                channelMappingTable: header[_codecParser.channelMappingTable],
                preSkip: Math.round(this._preSkip / 48000 * this._sampleRate),
                sampleRate: this._sampleRate,
                forceStereo: this._instance._forceStereo
              });
              this._instance._ready = this._instance._decoder.ready;
            case 3:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function _instantiateDecoder(_x) {
        return _instantiateDecoder2.apply(this, arguments);
      }
      return _instantiateDecoder;
    }()
  }, {
    key: "_sendToDecoder",
    value: function () {
      var _sendToDecoder2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(oggPage) {
        var dataFrames, _yield$this$_instance, channelData, samplesDecoded, errors, totalDecodedSamples, totalOggSamples, samplesToTrim, i;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              dataFrames = oggPage[_codecParser.codecFrames].map(function (f) {
                return f.data;
              });
              _context2.next = 3;
              return this._instance._decoder.decodeFrames(dataFrames);
            case 3:
              _yield$this$_instance = _context2.sent;
              channelData = _yield$this$_instance.channelData;
              samplesDecoded = _yield$this$_instance.samplesDecoded;
              errors = _yield$this$_instance.errors;
              this._totalSamples += samplesDecoded;
              if (this._beginningSampleOffset === undefined && Number(oggPage[_codecParser.absoluteGranulePosition]) > -1) {
                this._beginningSampleOffset = oggPage[_codecParser.absoluteGranulePosition] - BigInt(oggPage[_codecParser.samples]) + BigInt(this._preSkip);
              }

              // in cases where BigInt isn't supported, don't do any absoluteGranulePosition logic (i.e. old iOS versions)
              if (oggPage[_codecParser.isLastPage] && oggPage[_codecParser.absoluteGranulePosition] !== undefined) {
                totalDecodedSamples = this._totalSamples / this._sampleRate * 48000;
                totalOggSamples = Number(oggPage[_codecParser.absoluteGranulePosition] - this._beginningSampleOffset); // trim any extra samples that are decoded beyond the absoluteGranulePosition, relative to where we started in the stream
                samplesToTrim = Math.round((totalDecodedSamples - totalOggSamples) / 48000 * this._sampleRate);
                for (i = 0; i < channelData.length; i++) channelData[i] = channelData[i].subarray(0, samplesDecoded - samplesToTrim);
                this._totalSamples -= samplesToTrim;
              }
              this._decoded.push(channelData);
              this._errors = this._errors.concat(errors);
              this._channelsDecoded = channelData.length;
            case 13:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function _sendToDecoder(_x2) {
        return _sendToDecoder2.apply(this, arguments);
      }
      return _sendToDecoder;
    }()
  }, {
    key: "_decode",
    value: function () {
      var _decode2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(oggPage) {
        var frames;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              frames = oggPage[_codecParser.codecFrames];
              if (!frames.length) {
                _context3.next = 6;
                break;
              }
              if (!this._instance._decoder && frames[0][_codecParser.header]) this._instantiateDecoder(frames[0][_codecParser.header]);
              _context3.next = 5;
              return this._instance.ready;
            case 5:
              this._decoderOperations.push(this._sendToDecoder(oggPage));
            case 6:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function _decode(_x3) {
        return _decode2.apply(this, arguments);
      }
      return _decode;
    }()
  }]);
  return DecoderState;
}();
var OggOpusDecoder = /*#__PURE__*/function () {
  function OggOpusDecoder() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, OggOpusDecoder);
    this._sampleRate = options.sampleRate || 48000;
    this._forceStereo = options.forceStereo !== undefined ? options.forceStereo : false;
    this._onCodec = function (codec) {
      if (codec !== "opus") throw new Error("ogg-opus-decoder does not support this codec " + codec);
    };

    // instantiate to create static properties
    new _common.WASMAudioDecoderCommon();
    this._decoderClass = _opusDecoder.OpusDecoder;
    this._init();
  }
  _createClass(OggOpusDecoder, [{
    key: "_init",
    value: function _init() {
      if (this._decoder) this._decoder.free();
      this._decoder = null;
      this._ready = Promise.resolve();
      this._codecParser = new _codecParser["default"]("application/ogg", {
        onCodec: this._onCodec,
        enableFrameCRC32: false
      });
    }
  }, {
    key: "ready",
    get: function get() {
      return this._ready;
    }
  }, {
    key: "reset",
    value: function () {
      var _reset = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              this._init();
            case 1:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function reset() {
        return _reset.apply(this, arguments);
      }
      return reset;
    }()
  }, {
    key: "free",
    value: function free() {
      this._init();
    }
  }, {
    key: "_flush",
    value: function () {
      var _flush2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(decoderState) {
        var _iterator, _step, oggPage, decoded;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _iterator = _createForOfIteratorHelper(this._codecParser.flush());
              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  oggPage = _step.value;
                  decoderState._decode(oggPage);
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
              _context5.next = 4;
              return decoderState.decoded;
            case 4:
              decoded = _context5.sent;
              this._init();
              return _context5.abrupt("return", decoded);
            case 7:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function _flush(_x4) {
        return _flush2.apply(this, arguments);
      }
      return _flush;
    }()
  }, {
    key: "_decode",
    value: function () {
      var _decode3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(oggOpusData, decoderState) {
        var _iterator2, _step2, oggPage;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _iterator2 = _createForOfIteratorHelper(this._codecParser.parseChunk(oggOpusData));
              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  oggPage = _step2.value;
                  decoderState._decode(oggPage);
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }
              return _context6.abrupt("return", decoderState.decoded);
            case 3:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function _decode(_x5, _x6) {
        return _decode3.apply(this, arguments);
      }
      return _decode;
    }()
  }, {
    key: "decode",
    value: function () {
      var _decode4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(oggOpusData) {
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.t0 = _common.WASMAudioDecoderCommon.getDecodedAudioMultiChannel;
              _context7.t1 = _common.WASMAudioDecoderCommon;
              _context7.t2 = _toConsumableArray;
              _context7.next = 5;
              return this._decode(oggOpusData, new DecoderState(this));
            case 5:
              _context7.t3 = _context7.sent;
              _context7.t4 = (0, _context7.t2)(_context7.t3);
              return _context7.abrupt("return", _context7.t0.apply.call(_context7.t0, _context7.t1, _context7.t4));
            case 8:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this);
      }));
      function decode(_x7) {
        return _decode4.apply(this, arguments);
      }
      return decode;
    }()
  }, {
    key: "decodeFile",
    value: function () {
      var _decodeFile = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(oggOpusData) {
        var _this2 = this;
        var decoderState;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              decoderState = new DecoderState(this);
              _context8.t0 = _common.WASMAudioDecoderCommon.getDecodedAudioMultiChannel;
              _context8.t1 = _common.WASMAudioDecoderCommon;
              _context8.t2 = _toConsumableArray;
              _context8.next = 6;
              return this._decode(oggOpusData, decoderState).then(function () {
                return _this2._flush(decoderState);
              });
            case 6:
              _context8.t3 = _context8.sent;
              _context8.t4 = (0, _context8.t2)(_context8.t3);
              return _context8.abrupt("return", _context8.t0.apply.call(_context8.t0, _context8.t1, _context8.t4));
            case 9:
            case "end":
              return _context8.stop();
          }
        }, _callee8, this);
      }));
      function decodeFile(_x8) {
        return _decodeFile.apply(this, arguments);
      }
      return decodeFile;
    }()
  }, {
    key: "flush",
    value: function () {
      var _flush3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _context9.t0 = _common.WASMAudioDecoderCommon.getDecodedAudioMultiChannel;
              _context9.t1 = _common.WASMAudioDecoderCommon;
              _context9.t2 = _toConsumableArray;
              _context9.next = 5;
              return this._flush(new DecoderState(this));
            case 5:
              _context9.t3 = _context9.sent;
              _context9.t4 = (0, _context9.t2)(_context9.t3);
              return _context9.abrupt("return", _context9.t0.apply.call(_context9.t0, _context9.t1, _context9.t4));
            case 8:
            case "end":
              return _context9.stop();
          }
        }, _callee9, this);
      }));
      function flush() {
        return _flush3.apply(this, arguments);
      }
      return flush;
    }()
  }]);
  return OggOpusDecoder;
}();
exports["default"] = OggOpusDecoder;