"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _globals = require("../../globals.js");
var _constants = require("../../constants.js");
var _Parser2 = _interopRequireDefault(require("../Parser.js"));
var _FLACFrame = _interopRequireDefault(require("./FLACFrame.js"));
var _FLACHeader = _interopRequireDefault(require("./FLACHeader.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return { value: void 0, done: !0 }; } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable || "" === iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } throw new TypeError(_typeof(iterable) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
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
var MIN_FLAC_FRAME_SIZE = 2;
var MAX_FLAC_FRAME_SIZE = 512 * 1024;
var FLACParser = /*#__PURE__*/function (_Parser) {
  _inherits(FLACParser, _Parser);
  var _super = _createSuper(FLACParser);
  function FLACParser(codecParser, headerCache, onCodec) {
    var _this;
    _classCallCheck(this, FLACParser);
    _this = _super.call(this, codecParser, headerCache);
    _this.Frame = _FLACFrame["default"];
    _this.Header = _FLACHeader["default"];
    onCodec(_this[_constants.codec]);
    return _this;
  }
  _createClass(FLACParser, [{
    key: _constants.codec,
    get: function get() {
      return "flac";
    }
  }, {
    key: "_getNextFrameSyncOffset",
    value: /*#__PURE__*/_regeneratorRuntime().mark(function _getNextFrameSyncOffset(offset) {
      var data, dataLength, firstByte, secondByte;
      return _regeneratorRuntime().wrap(function _getNextFrameSyncOffset$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            return _context.delegateYield(this._codecParser[_constants.readRawData](2, 0), "t0", 1);
          case 1:
            data = _context.t0;
            dataLength = data[_constants.length] - 2;
          case 3:
            if (!(offset < dataLength)) {
              _context.next = 13;
              break;
            }
            // * `11111111|111110..`: Frame sync
            // * `........|......0.`: Reserved 0 - mandatory, 1 - reserved
            firstByte = data[offset];
            if (!(firstByte === 0xff)) {
              _context.next = 10;
              break;
            }
            secondByte = data[offset + 1];
            if (!(secondByte === 0xf8 || secondByte === 0xf9)) {
              _context.next = 9;
              break;
            }
            return _context.abrupt("break", 13);
          case 9:
            if (secondByte !== 0xff) offset++; // might as well check for the next sync byte
          case 10:
            offset++;
            _context.next = 3;
            break;
          case 13:
            return _context.abrupt("return", offset);
          case 14:
          case "end":
            return _context.stop();
        }
      }, _getNextFrameSyncOffset, this);
    })
  }, {
    key: _constants.parseFrame,
    value: /*#__PURE__*/_regeneratorRuntime().mark(function value() {
      var header, nextHeaderOffset, frameData, frame;
      return _regeneratorRuntime().wrap(function value$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.delegateYield(_FLACHeader["default"][_constants.getHeader](this._codecParser, this._headerCache, 0), "t0", 1);
          case 1:
            header = _context2.t0;
            if (!header) {
              _context2.next = 27;
              break;
            }
            // found a valid frame header
            // find the next valid frame header
            nextHeaderOffset = _globals.headerStore.get(header)[_constants.length] + MIN_FLAC_FRAME_SIZE;
          case 4:
            if (!(nextHeaderOffset <= MAX_FLAC_FRAME_SIZE)) {
              _context2.next = 23;
              break;
            }
            _context2.t1 = this._codecParser._flushing;
            if (_context2.t1) {
              _context2.next = 9;
              break;
            }
            return _context2.delegateYield(_FLACHeader["default"][_constants.getHeader](this._codecParser, this._headerCache, nextHeaderOffset), "t2", 8);
          case 8:
            _context2.t1 = _context2.t2;
          case 9:
            if (!_context2.t1) {
              _context2.next = 19;
              break;
            }
            return _context2.delegateYield(this._codecParser[_constants.readRawData](nextHeaderOffset), "t3", 11);
          case 11:
            frameData = _context2.t3;
            if (!this._codecParser._flushing) frameData = frameData[_constants.subarray](0, nextHeaderOffset);

            // check that this is actually the next header by validating the frame footer crc16
            if (!_FLACFrame["default"][_constants.checkFrameFooterCrc16](frameData)) {
              _context2.next = 19;
              break;
            }
            // both frame headers, and frame footer crc16 are valid, we are synced (odds are pretty low of a false positive)
            frame = new _FLACFrame["default"](frameData, header);
            this._headerCache[_constants.enable](); // start caching when synced
            this._codecParser[_constants.incrementRawData](nextHeaderOffset); // increment to the next frame
            this._codecParser[_constants.mapFrameStats](frame);
            return _context2.abrupt("return", frame);
          case 19:
            return _context2.delegateYield(this._getNextFrameSyncOffset(nextHeaderOffset + 1), "t4", 20);
          case 20:
            nextHeaderOffset = _context2.t4;
            _context2.next = 4;
            break;
          case 23:
            this._codecParser[_constants.logWarning]("Unable to sync FLAC frame after searching ".concat(nextHeaderOffset, " bytes."));
            this._codecParser[_constants.incrementRawData](nextHeaderOffset);
            _context2.next = 32;
            break;
          case 27:
            _context2.t5 = this._codecParser;
            _context2.t6 = _constants.incrementRawData;
            return _context2.delegateYield(this._getNextFrameSyncOffset(1), "t7", 30);
          case 30:
            _context2.t8 = _context2.t7;
            _context2.t5[_context2.t6].call(_context2.t5, _context2.t8);
          case 32:
            if (true) {
              _context2.next = 0;
              break;
            }
          case 33:
          case "end":
            return _context2.stop();
        }
      }, value, this);
    })
  }, {
    key: _constants.parseOggPage,
    value: function value(oggPage) {
      var _this2 = this;
      if (oggPage[_constants.pageSequenceNumber] === 0) {
        // Identification header

        this._headerCache[_constants.enable]();
        this._streamInfo = oggPage[_constants.data][_constants.subarray](13);
      } else if (oggPage[_constants.pageSequenceNumber] === 1) {
        // Vorbis comments
      } else {
        oggPage[_constants.codecFrames] = _globals.frameStore.get(oggPage)[_constants.segments].map(function (segment) {
          var header = _FLACHeader["default"][_constants.getHeaderFromUint8Array](segment, _this2._headerCache);
          if (header) {
            return new _FLACFrame["default"](segment, header, _this2._streamInfo);
          } else {
            _this2._codecParser[_constants.logWarning]("Failed to parse Ogg FLAC frame", "Skipping invalid FLAC frame");
          }
        }).filter(function (frame) {
          return !!frame;
        });
      }
      return oggPage;
    }
  }]);
  return FLACParser;
}(_Parser2["default"]);
exports["default"] = FLACParser;