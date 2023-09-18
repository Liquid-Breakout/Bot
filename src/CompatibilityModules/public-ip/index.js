"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "CancelError", {
  enumerable: true,
  get: function get() {
    return _got.CancelError;
  }
});
Object.defineProperty(exports, "IpNotFoundError", {
  enumerable: true,
  get: function get() {
    return _core.IpNotFoundError;
  }
});
exports.publicIp = void 0;
exports.publicIpv4 = publicIpv4;
exports.publicIpv6 = publicIpv6;
var _nodeUtil = require("node:util");
var _nodeDgram = _interopRequireDefault(require("node:dgram"));
var _dnsSocket = _interopRequireDefault(require("dns-socket"));
var _got = _interopRequireWildcard(require("got-cjs"));
var _isIp = require("./is-ip.js");
var _core = require("./core.js");
var _excluded = ["servers"],
  _excluded2 = ["servers"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return { value: void 0, done: !0 }; } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable || "" === iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } throw new TypeError(_typeof(iterable) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var defaults = {
  timeout: 5000,
  onlyHttps: false
};
var dnsServers = [{
  v4: {
    servers: ['208.67.222.222', '208.67.220.220', '208.67.222.220', '208.67.220.222'],
    name: 'myip.opendns.com',
    type: 'A'
  },
  v6: {
    servers: ['2620:0:ccc::2', '2620:0:ccd::2'],
    name: 'myip.opendns.com',
    type: 'AAAA'
  }
}, {
  v4: {
    servers: ['216.239.32.10', '216.239.34.10', '216.239.36.10', '216.239.38.10'],
    name: 'o-o.myaddr.l.google.com',
    type: 'TXT',
    transform: function transform(ip) {
      return ip.replace(/"/g, '');
    }
  },
  v6: {
    servers: ['2001:4860:4802:32::a', '2001:4860:4802:34::a', '2001:4860:4802:36::a', '2001:4860:4802:38::a'],
    name: 'o-o.myaddr.l.google.com',
    type: 'TXT',
    transform: function transform(ip) {
      return ip.replace(/"/g, '');
    }
  }
}];
var type = {
  v4: {
    dnsServers: dnsServers.map(function (_ref) {
      var _ref$v = _ref.v4,
        servers = _ref$v.servers,
        question = _objectWithoutProperties(_ref$v, _excluded);
      return {
        servers: servers,
        question: question
      };
    }),
    httpsUrls: ['https://icanhazip.com/', 'https://api.ipify.org/']
  },
  v6: {
    dnsServers: dnsServers.map(function (_ref2) {
      var _ref2$v = _ref2.v6,
        servers = _ref2$v.servers,
        question = _objectWithoutProperties(_ref2$v, _excluded2);
      return {
        servers: servers,
        question: question
      };
    }),
    httpsUrls: ['https://icanhazip.com/', 'https://api6.ipify.org/']
  }
};
var queryDns = function queryDns(version, options) {
  var data = type[version];
  var socket = (0, _dnsSocket["default"])({
    retries: 0,
    maxQueries: 1,
    socket: _nodeDgram["default"].createSocket(version === 'v6' ? 'udp6' : 'udp4'),
    timeout: options.timeout
  });
  var socketQuery = (0, _nodeUtil.promisify)(socket.query.bind(socket));
  var promise = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var lastError, _iterator, _step, dnsServerInfo, servers, question, _iterator2, _step2, server, name, _type, transform, dnsResponse, _data, response, ip, method;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _iterator = _createForOfIteratorHelper(data.dnsServers);
          _context.prev = 1;
          _iterator.s();
        case 3:
          if ((_step = _iterator.n()).done) {
            _context.next = 42;
            break;
          }
          dnsServerInfo = _step.value;
          servers = dnsServerInfo.servers, question = dnsServerInfo.question;
          _iterator2 = _createForOfIteratorHelper(servers);
          _context.prev = 7;
          _iterator2.s();
        case 9:
          if ((_step2 = _iterator2.n()).done) {
            _context.next = 32;
            break;
          }
          server = _step2.value;
          if (!socket.destroyed) {
            _context.next = 13;
            break;
          }
          return _context.abrupt("return");
        case 13:
          _context.prev = 13;
          name = question.name, _type = question.type, transform = question.transform; // eslint-disable-next-line no-await-in-loop
          _context.next = 17;
          return socketQuery({
            questions: [{
              name: name,
              type: _type
            }]
          }, 53, server);
        case 17:
          dnsResponse = _context.sent;
          _data = dnsResponse.answers[0].data;
          response = (typeof _data === 'string' ? _data : _data.toString()).trim();
          ip = transform ? transform(response) : response;
          method = version === 'v6' ? _isIp.isIPv6 : _isIp.isIPv4;
          if (!(ip && method(ip))) {
            _context.next = 25;
            break;
          }
          socket.destroy();
          return _context.abrupt("return", ip);
        case 25:
          _context.next = 30;
          break;
        case 27:
          _context.prev = 27;
          _context.t0 = _context["catch"](13);
          lastError = _context.t0;
        case 30:
          _context.next = 9;
          break;
        case 32:
          _context.next = 37;
          break;
        case 34:
          _context.prev = 34;
          _context.t1 = _context["catch"](7);
          _iterator2.e(_context.t1);
        case 37:
          _context.prev = 37;
          _iterator2.f();
          return _context.finish(37);
        case 40:
          _context.next = 3;
          break;
        case 42:
          _context.next = 47;
          break;
        case 44:
          _context.prev = 44;
          _context.t2 = _context["catch"](1);
          _iterator.e(_context.t2);
        case 47:
          _context.prev = 47;
          _iterator.f();
          return _context.finish(47);
        case 50:
          socket.destroy();
          throw new _core.IpNotFoundError({
            cause: lastError
          });
        case 52:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 44, 47, 50], [7, 34, 37, 40], [13, 27]]);
  }))();
  promise.cancel = function () {
    socket.destroy();
  };
  return promise;
};
var queryHttps = function queryHttps(version, options) {
  var cancel;
  var promise = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var _options$fallbackUrls, requestOptions, urls, lastError, _iterator3, _step3, url, gotPromise, response, ip, method;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          requestOptions = {
            dnsLookupIpVersion: version === 'v6' ? 6 : 4,
            retry: {
              limit: 0
            },
            timeout: {
              request: options.timeout
            }
          };
          urls = [].concat(_toConsumableArray(type[version].httpsUrls), _toConsumableArray((_options$fallbackUrls = options.fallbackUrls) !== null && _options$fallbackUrls !== void 0 ? _options$fallbackUrls : []));
          _iterator3 = _createForOfIteratorHelper(urls);
          _context2.prev = 4;
          _iterator3.s();
        case 6:
          if ((_step3 = _iterator3.n()).done) {
            _context2.next = 27;
            break;
          }
          url = _step3.value;
          _context2.prev = 8;
          // Note: We use `.get` to allow for mocking.
          gotPromise = _got["default"].get(url, requestOptions);
          cancel = gotPromise.cancel;

          // eslint-disable-next-line no-await-in-loop
          _context2.next = 13;
          return gotPromise;
        case 13:
          response = _context2.sent;
          ip = (response.body || '').trim();
          method = version === 'v6' ? _isIp.isIPv6 : _isIp.isIPv4;
          if (!(ip && method(ip))) {
            _context2.next = 18;
            break;
          }
          return _context2.abrupt("return", ip);
        case 18:
          _context2.next = 25;
          break;
        case 20:
          _context2.prev = 20;
          _context2.t0 = _context2["catch"](8);
          lastError = _context2.t0;
          if (!(_context2.t0 instanceof _got.CancelError)) {
            _context2.next = 25;
            break;
          }
          throw _context2.t0;
        case 25:
          _context2.next = 6;
          break;
        case 27:
          _context2.next = 32;
          break;
        case 29:
          _context2.prev = 29;
          _context2.t1 = _context2["catch"](4);
          _iterator3.e(_context2.t1);
        case 32:
          _context2.prev = 32;
          _iterator3.f();
          return _context2.finish(32);
        case 35:
          throw new _core.IpNotFoundError({
            cause: lastError
          });
        case 38:
          _context2.prev = 38;
          _context2.t2 = _context2["catch"](0);
          if (_context2.t2 instanceof _got.CancelError) {
            _context2.next = 42;
            break;
          }
          throw _context2.t2;
        case 42:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 38], [4, 29, 32, 35], [8, 20]]);
  }))();
  promise.cancel = function () {
    return cancel.apply(this);
  };
  return promise;
};
var queryAll = function queryAll(version, options) {
  var cancel;
  var promise = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    var response, dnsPromise, httpsPromise;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          dnsPromise = queryDns(version, options);
          cancel = dnsPromise.cancel;
          _context3.prev = 2;
          _context3.next = 5;
          return dnsPromise;
        case 5:
          response = _context3.sent;
          _context3.next = 15;
          break;
        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](2);
          httpsPromise = queryHttps(version, options);
          cancel = httpsPromise.cancel;
          _context3.next = 14;
          return httpsPromise;
        case 14:
          response = _context3.sent;
        case 15:
          return _context3.abrupt("return", response);
        case 16:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[2, 8]]);
  }))();
  promise.cancel = cancel;
  return promise;
};
var publicIp = (0, _core.createPublicIp)(publicIpv4, publicIpv6);
exports.publicIp = publicIp;
function publicIpv4(options) {
  options = _objectSpread(_objectSpread({}, defaults), options);
  if (!options.onlyHttps) {
    return queryAll('v4', options);
  }
  if (options.onlyHttps) {
    return queryHttps('v4', options);
  }
  return queryDns('v4', options);
}
function publicIpv6(options) {
  options = _objectSpread(_objectSpread({}, defaults), options);
  if (!options.onlyHttps) {
    return queryAll('v6', options);
  }
  if (options.onlyHttps) {
    return queryHttps('v6', options);
  }
  return queryDns('v6', options);
}