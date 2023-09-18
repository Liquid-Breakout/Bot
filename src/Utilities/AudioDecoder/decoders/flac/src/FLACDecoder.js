"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Decoder = Decoder;
exports.setDecoderClass = exports["default"] = void 0;
var _common = require("../../wasm-decoders-common/index.js");
var _codecParser = _interopRequireWildcard(require("codec-parser"));
var _EmscriptenWasm = _interopRequireDefault(require("./EmscriptenWasm.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function Decoder() {
  var _this = this;
  // injects dependencies when running as a web worker
  // async
  this._init = function () {
    return new _this._WASMAudioDecoderCommon().instantiate(_this._EmscriptenWASM, _this._module).then(function (common) {
      _this._common = common;
      _this._inputBytes = 0;
      _this._outputSamples = 0;
      _this._frameNumber = 0;
      _this._channels = _this._common.allocateTypedArray(1, Uint32Array);
      _this._sampleRate = _this._common.allocateTypedArray(1, Uint32Array);
      _this._bitsPerSample = _this._common.allocateTypedArray(1, Uint32Array);
      _this._samplesDecoded = _this._common.allocateTypedArray(1, Uint32Array);
      _this._outputBufferPtr = _this._common.allocateTypedArray(1, Uint32Array);
      _this._outputBufferLen = _this._common.allocateTypedArray(1, Uint32Array);
      _this._errorStringPtr = _this._common.allocateTypedArray(1, Uint32Array);
      _this._stateStringPtr = _this._common.allocateTypedArray(1, Uint32Array);
      _this._decoder = _this._common.wasm.create_decoder(_this._channels.ptr, _this._sampleRate.ptr, _this._bitsPerSample.ptr, _this._samplesDecoded.ptr, _this._outputBufferPtr.ptr, _this._outputBufferLen.ptr, _this._errorStringPtr.ptr, _this._stateStringPtr.ptr);
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
  this._decode = function (data) {
    if (!(data instanceof Uint8Array)) throw Error("Data to decode must be Uint8Array. Instead got " + _typeof(data));
    var input = _this._common.allocateTypedArray(data.length, Uint8Array, false);
    input.buf.set(data);
    _this._common.wasm.decode_frame(_this._decoder, input.ptr, input.len);
    var errorMessage = [],
      error;
    if (_this._errorStringPtr.buf[0]) errorMessage.push("Error: " + _this._common.codeToString(_this._errorStringPtr.buf[0]));
    if (_this._stateStringPtr.buf[0]) errorMessage.push("State: " + _this._common.codeToString(_this._stateStringPtr.buf[0]));
    if (errorMessage.length) {
      error = errorMessage.join("; ");
      console.error("@wasm-audio-decoders/flac: \n\t" + errorMessage.join("\n\t"));
    }
    var output = new Float32Array(_this._common.wasm.HEAP, _this._outputBufferPtr.buf[0], _this._outputBufferLen.buf[0]);
    var decoded = {
      error: error,
      outputBuffer: _this._common.getOutputChannels(output, _this._channels.buf[0], _this._samplesDecoded.buf[0]),
      samplesDecoded: _this._samplesDecoded.buf[0]
    };
    _this._common.wasm.free(_this._outputBufferPtr.buf[0]);
    _this._outputBufferLen.buf[0] = 0;
    _this._samplesDecoded.buf[0] = 0;
    return decoded;
  };
  this.decodeFrames = function (frames) {
    var outputBuffers = [],
      errors = [],
      outputSamples = 0;
    for (var i = 0; i < frames.length; i++) {
      var offset = 0;
      var _data = frames[i];
      while (offset < _data.length) {
        var chunk = _data.subarray(offset, offset + _this._MAX_INPUT_SIZE);
        offset += chunk.length;
        var decoded = _this._decode(chunk);
        outputBuffers.push(decoded.outputBuffer);
        outputSamples += decoded.samplesDecoded;
        if (decoded.error) _this._common.addError(errors, decoded.error, _data.length, _this._frameNumber, _this._inputBytes, _this._outputSamples);
        _this._inputBytes += _data.length;
        _this._outputSamples += decoded.samplesDecoded;
      }
      _this._frameNumber++;
    }
    return _this._WASMAudioDecoderCommon.getDecodedAudioMultiChannel(errors, outputBuffers, _this._channels.buf[0], outputSamples, _this._sampleRate.buf[0], _this._bitsPerSample.buf[0]);
  };

  // injects dependencies when running as a web worker
  this._isWebWorker = Decoder.isWebWorker;
  this._WASMAudioDecoderCommon = Decoder.WASMAudioDecoderCommon || _common.WASMAudioDecoderCommon;
  this._EmscriptenWASM = Decoder.EmscriptenWASM || _EmscriptenWasm["default"];
  this._module = Decoder.module;
  this._MAX_INPUT_SIZE = 65535 * 8;
  this._ready = this._init();
  return this;
}
var setDecoderClass = Symbol();
exports.setDecoderClass = setDecoderClass;
var FLACDecoder = /*#__PURE__*/function () {
  function FLACDecoder() {
    _classCallCheck(this, FLACDecoder);
    this._onCodec = function (codec) {
      if (codec !== "flac") throw new Error("@wasm-audio-decoders/flac does not support this codec " + codec);
    };

    // instantiate to create static properties
    new _common.WASMAudioDecoderCommon();
    this._init();
    this[setDecoderClass](Decoder);
  }
  _createClass(FLACDecoder, [{
    key: "_init",
    value: function _init() {
      this._codecParser = new _codecParser["default"]("audio/flac", {
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
    key: "decode",
    value: function () {
      var _decode = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(flacData) {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", this._decoder.decodeFrames(_toConsumableArray(this._codecParser.parseChunk(flacData)).map(function (f) {
                return f[_codecParser.data];
              })));
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function decode(_x) {
        return _decode.apply(this, arguments);
      }
      return decode;
    }()
  }, {
    key: "flush",
    value: function () {
      var _flush = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var decoded;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              decoded = this._decoder.decodeFrames(_toConsumableArray(this._codecParser.flush()).map(function (f) {
                return f[_codecParser.data];
              }));
              _context3.next = 3;
              return this.reset();
            case 3:
              return _context3.abrupt("return", decoded);
            case 4:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function flush() {
        return _flush.apply(this, arguments);
      }
      return flush;
    }()
  }, {
    key: "decodeFile",
    value: function () {
      var _decodeFile = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(flacData) {
        var decoded;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              decoded = this._decoder.decodeFrames(_toConsumableArray(this._codecParser.parseAll(flacData)).map(function (f) {
                return f[_codecParser.data];
              }));
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
      function decodeFile(_x2) {
        return _decodeFile.apply(this, arguments);
      }
      return decodeFile;
    }()
  }, {
    key: "decodeFrames",
    value: function () {
      var _decodeFrames = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(flacFrames) {
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              return _context5.abrupt("return", this._decoder.decodeFrames(flacFrames));
            case 1:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function decodeFrames(_x3) {
        return _decodeFrames.apply(this, arguments);
      }
      return decodeFrames;
    }()
  }]);
  return FLACDecoder;
}();
exports["default"] = FLACDecoder;