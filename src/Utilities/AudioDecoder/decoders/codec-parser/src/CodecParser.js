"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _utilities = require("./utilities.js");
var _constants = require("./constants.js");
var _HeaderCache = _interopRequireDefault(require("./codecs/HeaderCache.js"));
var _MPEGParser = _interopRequireDefault(require("./codecs/mpeg/MPEGParser.js"));
var _AACParser = _interopRequireDefault(require("./codecs/aac/AACParser.js"));
var _FLACParser = _interopRequireDefault(require("./codecs/flac/FLACParser.js"));
var _OggParser = _interopRequireDefault(require("./containers/ogg/OggParser.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return { value: void 0, done: !0 }; } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable || "" === iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } throw new TypeError(_typeof(iterable) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
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
var noOp = function noOp() {};
var CodecParser = /*#__PURE__*/function () {
  function CodecParser(mimeType) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      onCodec = _ref.onCodec,
      onCodecHeader = _ref.onCodecHeader,
      onCodecUpdate = _ref.onCodecUpdate,
      _ref$enableLogging = _ref.enableLogging,
      enableLogging = _ref$enableLogging === void 0 ? false : _ref$enableLogging,
      _ref$enableFrameCRC = _ref.enableFrameCRC32,
      enableFrameCRC32 = _ref$enableFrameCRC === void 0 ? true : _ref$enableFrameCRC;
    _classCallCheck(this, CodecParser);
    this._inputMimeType = mimeType;
    this._onCodec = onCodec || noOp;
    this._onCodecHeader = onCodecHeader || noOp;
    this._onCodecUpdate = onCodecUpdate;
    this._enableLogging = enableLogging;
    this._crc32 = enableFrameCRC32 ? _utilities.crc32Function : noOp;
    this[_constants.reset]();
  }

  /**
   * @public
   * @returns The detected codec
   */
  _createClass(CodecParser, [{
    key: _constants.codec,
    get: function get() {
      return this._parser ? this._parser[_constants.codec] : "";
    }
  }, {
    key: _constants.reset,
    value: function value() {
      this._headerCache = new _HeaderCache["default"](this._onCodecHeader, this._onCodecUpdate);
      this._generator = this._getGenerator();
      this._generator.next();
    }

    /**
     * @public
     * @description Generator function that yields any buffered CodecFrames and resets the CodecParser
     * @returns {Iterable<CodecFrame|OggPage>} Iterator that operates over the codec data.
     * @yields {CodecFrame|OggPage} Parsed codec or ogg page data
     */
  }, {
    key: "flush",
    value:
    /*#__PURE__*/
    _regeneratorRuntime().mark(function flush() {
      var i;
      return _regeneratorRuntime().wrap(function flush$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            this._flushing = true;
            i = this._generator.next();
          case 2:
            if (!i.value) {
              _context.next = 8;
              break;
            }
            _context.next = 5;
            return i.value;
          case 5:
            i = this._generator.next();
            _context.next = 2;
            break;
          case 8:
            this._flushing = false;
            this[_constants.reset]();
          case 10:
          case "end":
            return _context.stop();
        }
      }, flush, this);
    })
    /**
     * @public
     * @description Generator function takes in a Uint8Array of data and returns a CodecFrame from the data for each iteration
     * @param {Uint8Array} chunk Next chunk of codec data to read
     * @returns {Iterable<CodecFrame|OggPage>} Iterator that operates over the codec data.
     * @yields {CodecFrame|OggPage} Parsed codec or ogg page data
     */
  }, {
    key: "parseChunk",
    value:
    /*#__PURE__*/
    _regeneratorRuntime().mark(function parseChunk(chunk) {
      var i;
      return _regeneratorRuntime().wrap(function parseChunk$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            i = this._generator.next(chunk);
          case 1:
            if (!i.value) {
              _context2.next = 7;
              break;
            }
            _context2.next = 4;
            return i.value;
          case 4:
            i = this._generator.next();
            _context2.next = 1;
            break;
          case 7:
          case "end":
            return _context2.stop();
        }
      }, parseChunk, this);
    })
    /**
     * @public
     * @description Parses an entire file and returns all of the contained frames.
     * @param {Uint8Array} fileData Coded data to read
     * @returns {Array<CodecFrame|OggPage>} CodecFrames
     */
  }, {
    key: "parseAll",
    value: function parseAll(fileData) {
      return [].concat(_toConsumableArray(this.parseChunk(fileData)), _toConsumableArray(this.flush()));
    }

    /**
     * @private
     */
  }, {
    key: "_getGenerator",
    value:
    /*#__PURE__*/
    _regeneratorRuntime().mark(function _getGenerator() {
      var frame;
      return _regeneratorRuntime().wrap(function _getGenerator$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            if (!this._inputMimeType.match(/aac/)) {
              _context3.next = 4;
              break;
            }
            this._parser = new _AACParser["default"](this, this._headerCache, this._onCodec);
            _context3.next = 17;
            break;
          case 4:
            if (!this._inputMimeType.match(/mpeg/)) {
              _context3.next = 8;
              break;
            }
            this._parser = new _MPEGParser["default"](this, this._headerCache, this._onCodec);
            _context3.next = 17;
            break;
          case 8:
            if (!this._inputMimeType.match(/flac/)) {
              _context3.next = 12;
              break;
            }
            this._parser = new _FLACParser["default"](this, this._headerCache, this._onCodec);
            _context3.next = 17;
            break;
          case 12:
            if (!this._inputMimeType.match(/ogg/)) {
              _context3.next = 16;
              break;
            }
            this._parser = new _OggParser["default"](this, this._headerCache, this._onCodec);
            _context3.next = 17;
            break;
          case 16:
            throw new Error("Unsupported Codec ".concat(mimeType));
          case 17:
            this._frameNumber = 0;
            this._currentReadPosition = 0;
            this._totalBytesIn = 0;
            this._totalBytesOut = 0;
            this._totalSamples = 0;
            this._sampleRate = undefined;
            this._rawData = new Uint8Array(0);

            // start parsing out frames
          case 24:
            if (!true) {
              _context3.next = 32;
              break;
            }
            return _context3.delegateYield(this._parser[_constants.parseFrame](), "t0", 26);
          case 26:
            frame = _context3.t0;
            if (!frame) {
              _context3.next = 30;
              break;
            }
            _context3.next = 30;
            return frame;
          case 30:
            _context3.next = 24;
            break;
          case 32:
          case "end":
            return _context3.stop();
        }
      }, _getGenerator, this);
    })
    /**
     * @protected
     * @param {number} minSize Minimum bytes to have present in buffer
     * @returns {Uint8Array} rawData
     */
  }, {
    key: _constants.readRawData,
    value: function value() {
      var _this = this;
      var minSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var readOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var rawData;
        return _regeneratorRuntime().wrap(function _callee$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              if (!(_this._rawData[_constants.length] <= minSize + readOffset)) {
                _context4.next = 9;
                break;
              }
              _context4.next = 3;
              return;
            case 3:
              rawData = _context4.sent;
              if (!_this._flushing) {
                _context4.next = 6;
                break;
              }
              return _context4.abrupt("return", _this._rawData[_constants.subarray](readOffset));
            case 6:
              if (rawData) {
                _this._totalBytesIn += rawData[_constants.length];
                _this._rawData = (0, _utilities.concatBuffers)(_this._rawData, rawData);
              }
              _context4.next = 0;
              break;
            case 9:
              return _context4.abrupt("return", _this._rawData[_constants.subarray](readOffset));
            case 10:
            case "end":
              return _context4.stop();
          }
        }, _callee);
      })();
    }

    /**
     * @protected
     * @param {number} increment Bytes to increment codec data
     */
  }, {
    key: _constants.incrementRawData,
    value: function value(increment) {
      this._currentReadPosition += increment;
      this._rawData = this._rawData[_constants.subarray](increment);
    }

    /**
     * @protected
     */
  }, {
    key: _constants.mapCodecFrameStats,
    value: function value(frame) {
      this._sampleRate = frame[_constants.header][_constants.sampleRate];
      frame[_constants.header][_constants.bitrate] = frame[_constants.duration] > 0 ? Math.round(frame[_constants.data][_constants.length] / frame[_constants.duration]) * 8 : 0;
      frame[_constants.frameNumber] = this._frameNumber++;
      frame[_constants.totalBytesOut] = this._totalBytesOut;
      frame[_constants.totalSamples] = this._totalSamples;
      frame[_constants.totalDuration] = this._totalSamples / this._sampleRate * 1000;
      frame[_constants.crc32] = this._crc32(frame[_constants.data]);
      this._headerCache[_constants.checkCodecUpdate](frame[_constants.header][_constants.bitrate], frame[_constants.totalDuration]);
      this._totalBytesOut += frame[_constants.data][_constants.length];
      this._totalSamples += frame[_constants.samples];
    }

    /**
     * @protected
     */
  }, {
    key: _constants.mapFrameStats,
    value: function value(frame) {
      var _this2 = this;
      if (frame[_constants.codecFrames]) {
        // Ogg container
        frame[_constants.codecFrames].forEach(function (codecFrame) {
          frame[_constants.duration] += codecFrame[_constants.duration];
          frame[_constants.samples] += codecFrame[_constants.samples];
          _this2[_constants.mapCodecFrameStats](codecFrame);
        });
        frame[_constants.totalSamples] = this._totalSamples;
        frame[_constants.totalDuration] = this._totalSamples / this._sampleRate * 1000 || 0;
        frame[_constants.totalBytesOut] = this._totalBytesOut;
      } else {
        this[_constants.mapCodecFrameStats](frame);
      }
    }

    /**
     * @private
     */
  }, {
    key: "_log",
    value: function _log(logger, messages) {
      if (this._enableLogging) {
        var stats = ["".concat(_constants.codec, ":         ").concat(this[_constants.codec]), "inputMimeType: ".concat(this._inputMimeType), "readPosition:  ".concat(this._currentReadPosition), "totalBytesIn:  ".concat(this._totalBytesIn), "".concat(_constants.totalBytesOut, ": ").concat(this._totalBytesOut)];
        var width = Math.max.apply(Math, _toConsumableArray(stats.map(function (s) {
          return s[_constants.length];
        })));
        messages.push.apply(messages, ["--stats--".concat("-".repeat(width - 9))].concat(stats, ["-".repeat(width)]));
        logger("codec-parser", messages.reduce(function (acc, message) {
          return acc + "\n  " + message;
        }, ""));
      }
    }

    /**
     * @protected
     */
  }, {
    key: _constants.logWarning,
    value: function value() {
      for (var _len = arguments.length, messages = new Array(_len), _key = 0; _key < _len; _key++) {
        messages[_key] = arguments[_key];
      }
      this._log(console.warn, messages);
    }

    /**
     * @protected
     */
  }, {
    key: _constants.logError,
    value: function value() {
      for (var _len2 = arguments.length, messages = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        messages[_key2] = arguments[_key2];
      }
      this._log(console.error, messages);
    }
  }]);
  return CodecParser;
}();
exports["default"] = CodecParser;