"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cleanupHotDownloadDir = cleanupHotDownloadDir;
exports.computeLocalChecksums = computeLocalChecksums;
exports.downloadDatabases = downloadDatabases;
exports.fetchChecksums = fetchChecksums;
exports.verifyChecksums = verifyChecksums;
var _nodeUtil = require("node:util");
var _nodeUrl = require("node:url");
var _nodePath = _interopRequireDefault(require("node:path"));
var _nodeFs = _interopRequireDefault(require("node:fs"));
var _nodeStream = _interopRequireDefault(require("node:stream"));
var _nodeCrypto = _interopRequireDefault(require("node:crypto"));
var _rimraf = _interopRequireDefault(require("rimraf"));
var _tar = _interopRequireDefault(require("tar"));
var _tsHelpers = require("./ts-helpers.js");
var _primitives = require("./primitives.js");
var _gotCjs = require("got-cjs");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return { value: void 0, done: !0 }; } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable || "" === iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } throw new TypeError(_typeof(iterable) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var REDIST_MIRROR_URL = 'https://raw.githubusercontent.com/GitSquared/node-geolite2-redist/master/redist/';
var pRimraf = (0, _nodeUtil.promisify)(_rimraf["default"]);
var mirrorUrls = {
  checksum: (0, _tsHelpers.buildObjectFromEntries)(Object.values(_primitives.GeoIpDbName).map(function (dbName) {
    return [dbName, "".concat(REDIST_MIRROR_URL).concat(dbName, ".mmdb.sha384")];
  })),
  download: (0, _tsHelpers.buildObjectFromEntries)(Object.values(_primitives.GeoIpDbName).map(function (dbName) {
    return [dbName, "".concat(REDIST_MIRROR_URL).concat(dbName, ".tar.gz")];
  }))
};
var defaultTargetDownloadDir = _nodePath["default"].resolve(__dirname, '..', 'dbs');
function cleanupHotDownloadDir(_x) {
  return _cleanupHotDownloadDir.apply(this, arguments);
}
function _cleanupHotDownloadDir() {
  _cleanupHotDownloadDir = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(dirPath) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", pRimraf(dirPath !== null && dirPath !== void 0 ? dirPath : defaultTargetDownloadDir + '.geodownload', {
            disableGlob: true
          }));
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _cleanupHotDownloadDir.apply(this, arguments);
}
function fetchChecksums(_x2) {
  return _fetchChecksums.apply(this, arguments);
}
function _fetchChecksums() {
  _fetchChecksums = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(dbList) {
    var dbListToFetch, checksums;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          dbListToFetch = dbList !== null && dbList !== void 0 ? dbList : Object.values(_primitives.GeoIpDbName);
          _context3.next = 3;
          return Promise.all(dbListToFetch.map( /*#__PURE__*/function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(dbName) {
              return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.t0 = dbName;
                    _context2.next = 3;
                    return (0, _gotCjs.got)(mirrorUrls.checksum[dbName]).text();
                  case 3:
                    _context2.next = 5;
                    return _context2.sent.trim();
                  case 5:
                    _context2.t1 = _context2.sent;
                    return _context2.abrupt("return", [_context2.t0, _context2.t1]);
                  case 7:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            }));
            return function (_x9) {
              return _ref.apply(this, arguments);
            };
          }()));
        case 3:
          checksums = _context3.sent;
          return _context3.abrupt("return", (0, _tsHelpers.buildObjectFromEntries)(checksums));
        case 5:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _fetchChecksums.apply(this, arguments);
}
function computeLocalChecksums(_x3, _x4) {
  return _computeLocalChecksums.apply(this, arguments);
}
function _computeLocalChecksums() {
  _computeLocalChecksums = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(dbList, customStorageDir) {
    var dbListToCheck, storageDir, checksums;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          dbListToCheck = dbList !== null && dbList !== void 0 ? dbList : Object.values(_primitives.GeoIpDbName);
          storageDir = customStorageDir !== null && customStorageDir !== void 0 ? customStorageDir : defaultTargetDownloadDir;
          _context5.next = 4;
          return Promise.all(dbListToCheck.map( /*#__PURE__*/function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(dbName) {
              return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                while (1) switch (_context4.prev = _context4.next) {
                  case 0:
                    _context4.t0 = dbName;
                    _context4.next = 3;
                    return (0, _nodeUtil.promisify)(_nodeFs["default"].readFile)(_nodePath["default"].join(storageDir, "".concat(dbName, ".mmdb"))).then(function (buffer) {
                      return _nodeCrypto["default"].createHash('sha384').update(buffer).digest('hex');
                    });
                  case 3:
                    _context4.t1 = _context4.sent;
                    return _context4.abrupt("return", [_context4.t0, _context4.t1]);
                  case 5:
                  case "end":
                    return _context4.stop();
                }
              }, _callee4);
            }));
            return function (_x10) {
              return _ref2.apply(this, arguments);
            };
          }()));
        case 4:
          checksums = _context5.sent;
          return _context5.abrupt("return", (0, _tsHelpers.buildObjectFromEntries)(checksums));
        case 6:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return _computeLocalChecksums.apply(this, arguments);
}
function verifyChecksums(_x5, _x6) {
  return _verifyChecksums.apply(this, arguments);
}
function _verifyChecksums() {
  _verifyChecksums = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(dbList, customStorageDir) {
    var _yield$Promise$all, _yield$Promise$all2, remote, local, db, dbListToMap;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return Promise.all([fetchChecksums(dbList), computeLocalChecksums(dbList, customStorageDir)]);
        case 2:
          _yield$Promise$all = _context6.sent;
          _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
          remote = _yield$Promise$all2[0];
          local = _yield$Promise$all2[1];
          _context6.t0 = _regeneratorRuntime().keys(local);
        case 7:
          if ((_context6.t1 = _context6.t0()).done) {
            _context6.next = 13;
            break;
          }
          db = _context6.t1.value;
          if (!(remote[db] !== local[db])) {
            _context6.next = 11;
            break;
          }
          throw new Error("Checksum mismatch for ".concat(db));
        case 11:
          _context6.next = 7;
          break;
        case 13:
          dbListToMap = dbList !== null && dbList !== void 0 ? dbList : Object.values(_primitives.GeoIpDbName);
          return _context6.abrupt("return", (0, _tsHelpers.buildObjectFromEntries)(dbListToMap.map(function (dbName) {
            return [dbName, _nodePath["default"].join(customStorageDir !== null && customStorageDir !== void 0 ? customStorageDir : defaultTargetDownloadDir, "".concat(dbName, ".mmdb"))];
          })));
        case 15:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return _verifyChecksums.apply(this, arguments);
}
function downloadDatabases(_x7, _x8) {
  return _downloadDatabases.apply(this, arguments);
}
function _downloadDatabases() {
  _downloadDatabases = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(dbList, customStorageDir) {
    var dbListToFetch, targetDownloadDir, hotDownloadDir, pipeline, downloadedPaths;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          dbListToFetch = dbList !== null && dbList !== void 0 ? dbList : Object.values(_primitives.GeoIpDbName);
          targetDownloadDir = customStorageDir !== null && customStorageDir !== void 0 ? customStorageDir : defaultTargetDownloadDir;
          hotDownloadDir = targetDownloadDir + '.geodownload';
          _context9.next = 5;
          return cleanupHotDownloadDir(hotDownloadDir);
        case 5:
          _context9.prev = 5;
          _nodeFs["default"].mkdirSync(targetDownloadDir);
          _context9.next = 13;
          break;
        case 9:
          _context9.prev = 9;
          _context9.t0 = _context9["catch"](5);
          if (!(_context9.t0.code !== 'EEXIST')) {
            _context9.next = 13;
            break;
          }
          throw _context9.t0;
        case 13:
          _context9.prev = 13;
          _nodeFs["default"].mkdirSync(hotDownloadDir);
          _context9.next = 21;
          break;
        case 17:
          _context9.prev = 17;
          _context9.t1 = _context9["catch"](13);
          if (!(_context9.t1.code !== 'EEXIST')) {
            _context9.next = 21;
            break;
          }
          throw _context9.t1;
        case 21:
          pipeline = (0, _nodeUtil.promisify)(_nodeStream["default"].pipeline);
          _context9.next = 24;
          return Promise.all(dbListToFetch.map( /*#__PURE__*/function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(dbName) {
              return _regeneratorRuntime().wrap(function _callee8$(_context8) {
                while (1) switch (_context8.prev = _context8.next) {
                  case 0:
                    _context8.t0 = dbName;
                    _context8.next = 3;
                    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
                      var hotDownloadPath, coldCachePath;
                      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
                        while (1) switch (_context7.prev = _context7.next) {
                          case 0:
                            hotDownloadPath = _nodePath["default"].join(hotDownloadDir, "".concat(dbName, ".mmdb"));
                            coldCachePath = _nodePath["default"].join(targetDownloadDir, "".concat(dbName, ".mmdb"));
                            _context7.next = 4;
                            return pipeline(_gotCjs.got.stream(mirrorUrls.download[dbName]), _tar["default"].x({
                              cwd: hotDownloadDir,
                              filter: function filter(entryPath) {
                                return _nodePath["default"].basename(entryPath) === "".concat(dbName, ".mmdb");
                              },
                              strip: 1
                            }));
                          case 4:
                            _nodeFs["default"].renameSync(hotDownloadPath, coldCachePath);
                            return _context7.abrupt("return", coldCachePath);
                          case 6:
                          case "end":
                            return _context7.stop();
                        }
                      }, _callee7);
                    }))();
                  case 3:
                    _context8.t1 = _context8.sent;
                    return _context8.abrupt("return", [_context8.t0, _context8.t1]);
                  case 5:
                  case "end":
                    return _context8.stop();
                }
              }, _callee8);
            }));
            return function (_x11) {
              return _ref3.apply(this, arguments);
            };
          }()));
        case 24:
          downloadedPaths = _context9.sent;
          _context9.next = 27;
          return cleanupHotDownloadDir(hotDownloadDir);
        case 27:
          return _context9.abrupt("return", (0, _tsHelpers.buildObjectFromEntries)(downloadedPaths));
        case 28:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[5, 9], [13, 17]]);
  }));
  return _downloadDatabases.apply(this, arguments);
}