"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Decoder = Decoder;
exports.setDecoderClass = exports["default"] = void 0;
var _common = require("../../wasm-decoders-common/index.js");
var _codecParser = _interopRequireWildcard(require("../../codec-parser/index.js"));
var _EmscriptenWasm = _interopRequireDefault(require("./EmscriptenWasm.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return { value: void 0, done: !0 }; } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable || "" === iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } throw new TypeError(_typeof(iterable) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function Decoder() {
  var _this = this;
  // injects dependencies when running as a web worker
  // async
  this._init = function () {
    return new _this._WASMAudioDecoderCommon().instantiate(_this._EmscriptenWASM, _this._module).then(function (common) {
      _this._common = common;
      _this._input = _this._common.allocateTypedArray(_this._inputSize, Uint8Array);
      _this._firstPage = true;
      _this._inputLen = _this._common.allocateTypedArray(1, Uint32Array);
      _this._outputBufferPtr = _this._common.allocateTypedArray(1, Uint32Array);
      _this._channels = _this._common.allocateTypedArray(1, Uint32Array);
      _this._sampleRate = _this._common.allocateTypedArray(1, Uint32Array);
      _this._samplesDecoded = _this._common.allocateTypedArray(1, Uint32Array);
      var maxErrors = 128 * 2;
      _this._errors = _this._common.allocateTypedArray(maxErrors, Uint32Array);
      _this._errorsLength = _this._common.allocateTypedArray(1, Int32Array);
      _this._frameNumber = 0;
      _this._inputBytes = 0;
      _this._outputSamples = 0;
      _this._decoder = _this._common.wasm.create_decoder(_this._input.ptr, _this._inputLen.ptr, _this._outputBufferPtr.ptr, _this._channels.ptr, _this._sampleRate.ptr, _this._samplesDecoded.ptr, _this._errors.ptr, _this._errorsLength.ptr, maxErrors);
    });
  };
  Object.defineProperty(this, "ready", {
    enumerable: true,
    get: function get() {
      return _this._ready;
    }
  });

  // async
  this.reset = function () {
    _this.free();
    return _this._init();
  };
  this.free = function () {
    _this._common.wasm.destroy_decoder(_this._decoder);
    _this._common.free();
  };
  this.sendSetupHeader = function (data) {
    _this._input.buf.set(data);
    _this._inputLen.buf[0] = data.length;
    _this._common.wasm.send_setup(_this._decoder, _this._firstPage);
    _this._firstPage = false;
  };
  this.initDsp = function () {
    _this._common.wasm.init_dsp(_this._decoder);
  };
  this.decodePackets = function (packets) {
    var outputBuffers = [],
      outputSamples = 0,
      errors = [];
    for (var packetIdx = 0; packetIdx < packets.length; packetIdx++) {
      var packet = packets[packetIdx];
      _this._input.buf.set(packet);
      _this._inputLen.buf[0] = packet.length;
      _this._common.wasm.decode_packets(_this._decoder);
      var samplesDecoded = _this._samplesDecoded.buf[0];
      var channels = [];
      var outputBufferChannels = new Uint32Array(_this._common.wasm.HEAP, _this._outputBufferPtr.buf[0], _this._channels.buf[0]);
      for (var channel = 0; channel < _this._channels.buf[0]; channel++) {
        var output = new Float32Array(samplesDecoded);
        output.set(new Float32Array(_this._common.wasm.HEAP, outputBufferChannels[channel], samplesDecoded));
        channels.push(output);
      }
      outputBuffers.push(channels);
      outputSamples += samplesDecoded;
      _this._frameNumber++;
      _this._inputBytes += packet.length;
      _this._outputSamples += samplesDecoded;

      // handle any errors that may have occurred
      for (var i = 0; i < _this._errorsLength.buf; i += 2) errors.push({
        message: _this._common.codeToString(_this._errors.buf[i]) + " " + _this._common.codeToString(_this._errors.buf[i + 1]),
        frameLength: packet.length,
        frameNumber: _this._frameNumber,
        inputBytes: _this._inputBytes,
        outputSamples: _this._outputSamples
      });

      // clear the error buffer
      _this._errorsLength.buf[0] = 0;
    }
    return _this._WASMAudioDecoderCommon.getDecodedAudioMultiChannel(errors, outputBuffers, _this._channels.buf[0], outputSamples, _this._sampleRate.buf[0], 16);
  };

  // injects dependencies when running as a web worker
  this._isWebWorker = Decoder.isWebWorker;
  this._WASMAudioDecoderCommon = Decoder.WASMAudioDecoderCommon || _common.WASMAudioDecoderCommon;
  this._EmscriptenWASM = Decoder.EmscriptenWASM || _EmscriptenWasm["default"];
  this._module = Decoder.module;
  this._inputSize = 128 * 1024;
  this._ready = this._init();
  return this;
}
var setDecoderClass = Symbol();
exports.setDecoderClass = setDecoderClass;
var OggVorbisDecoder = /*#__PURE__*/function () {
  function OggVorbisDecoder() {
    _classCallCheck(this, OggVorbisDecoder);
    this._onCodec = function (codec) {
      if (codec !== "vorbis") throw new Error("@wasm-audio-decoders/ogg-vorbis does not support this codec " + codec);
    };

    // instantiate to create static properties
    new _common.WASMAudioDecoderCommon();
    this._init();
    this[setDecoderClass](Decoder);
  }
  _createClass(OggVorbisDecoder, [{
    key: "_init",
    value: function _init() {
      this._vorbisSetupInProgress = true;
      this._codecParser = new _codecParser["default"]("audio/ogg", {
        onCodec: this._onCodec,
        enableFrameCRC32: false
      });
    }
  }, {
    key: setDecoderClass,
    value: function value(decoderClass) {
      if (this._decoder) {
        var oldDecoder = this._decoder;
        oldDecoder.ready.then(function () {
          return oldDecoder.free();
        });
      }
      this._decoder = new decoderClass();
      this._ready = this._decoder.ready;
    }
  }, {
    key: "ready",
    get: function get() {
      return this._ready;
    }
  }, {
    key: "reset",
    value: function () {
      var _reset = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              this._init();
              return _context.abrupt("return", this._decoder.reset());
            case 2:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function reset() {
        return _reset.apply(this, arguments);
      }
      return reset;
    }()
  }, {
    key: "free",
    value: function free() {
      this._decoder.free();
    }
  }, {
    key: "decodeOggPages",
    value: function () {
      var _decodeOggPages = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(oggPages) {
        var packets, i, _oggPage, headerData, decoded, oggPage, samplesToTrim, _i;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              packets = [];
              for (i = 0; i < oggPages.length; i++) {
                _oggPage = oggPages[i];
                if (this._vorbisSetupInProgress) {
                  if (_oggPage[_codecParser.data][0] === 1) {
                    this._decoder.sendSetupHeader(_oggPage[_codecParser.data]);
                  }
                  if (_oggPage[_codecParser.codecFrames].length) {
                    headerData = _oggPage[_codecParser.codecFrames][0][_codecParser.header];
                    this._decoder.sendSetupHeader(headerData[_codecParser.vorbisComments]);
                    this._decoder.sendSetupHeader(headerData[_codecParser.vorbisSetup]);
                    this._decoder.initDsp();
                    this._vorbisSetupInProgress = false;
                  }
                }
                packets.push.apply(packets, _toConsumableArray(_oggPage[_codecParser.codecFrames].map(function (f) {
                  return f[_codecParser.data];
                })));
              }
              _context2.next = 4;
              return this._decoder.decodePackets(packets);
            case 4:
              decoded = _context2.sent;
              // in cases where BigInt isn't supported, don't do any absoluteGranulePosition logic (i.e. old iOS versions)
              oggPage = oggPages[oggPages.length - 1];
              if (oggPages.length && Number(oggPage[_codecParser.absoluteGranulePosition]) > -1) {
                if (this._beginningSampleOffset === undefined) {
                  this._beginningSampleOffset = oggPage[_codecParser.absoluteGranulePosition] - BigInt(oggPage[_codecParser.samples]);
                }
                if (oggPage[_codecParser.isLastPage]) {
                  // trim any extra samples that are decoded beyond the absoluteGranulePosition, relative to where we started in the stream
                  samplesToTrim = decoded.samplesDecoded - Number(oggPage[_codecParser.absoluteGranulePosition]);
                  if (samplesToTrim > 0) {
                    for (_i = 0; _i < decoded.channelData.length; _i++) decoded.channelData[_i] = decoded.channelData[_i].subarray(0, decoded.samplesDecoded - samplesToTrim);
                    decoded.samplesDecoded -= samplesToTrim;
                  }
                }
              }
              return _context2.abrupt("return", decoded);
            case 8:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function decodeOggPages(_x) {
        return _decodeOggPages.apply(this, arguments);
      }
      return decodeOggPages;
    }()
  }, {
    key: "decode",
    value: function () {
      var _decode = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(vorbisData) {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", this.decodeOggPages(_toConsumableArray(this._codecParser.parseChunk(vorbisData))));
            case 1:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function decode(_x2) {
        return _decode.apply(this, arguments);
      }
      return decode;
    }()
  }, {
    key: "flush",
    value: function () {
      var _flush = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var decoded;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              decoded = this.decodeOggPages(_toConsumableArray(this._codecParser.flush()));
              _context4.next = 3;
              return this.reset();
            case 3:
              return _context4.abrupt("return", decoded);
            case 4:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function flush() {
        return _flush.apply(this, arguments);
      }
      return flush;
    }()
  }, {
    key: "decodeFile",
    value: function () {
      var _decodeFile = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(vorbisData) {
        var decoded;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              decoded = this.decodeOggPages(_toConsumableArray(this._codecParser.parseAll(vorbisData)));
              _context5.next = 3;
              return this.reset();
            case 3:
              return _context5.abrupt("return", decoded);
            case 4:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function decodeFile(_x3) {
        return _decodeFile.apply(this, arguments);
      }
      return decodeFile;
    }()
  }]);
  return OggVorbisDecoder;
}();
exports["default"] = OggVorbisDecoder;