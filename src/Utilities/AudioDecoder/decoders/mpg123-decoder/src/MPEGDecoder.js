"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = MPEGDecoder;
var _common = require("../../wasm-decoders-common/index.js");
var _EmscriptenWasm = _interopRequireDefault(require("./EmscriptenWasm.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function MPEGDecoder() {
  var _this = this;
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  // injects dependencies when running as a web worker
  // async
  this._init = function () {
    return new _this._WASMAudioDecoderCommon().instantiate(_this._EmscriptenWASM, _this._module).then(function (common) {
      _this._common = common;
      _this._sampleRate = 0;
      _this._inputBytes = 0;
      _this._outputSamples = 0;
      _this._frameNumber = 0;
      _this._input = _this._common.allocateTypedArray(_this._inputSize, Uint8Array);
      _this._output = _this._common.allocateTypedArray(_this._outputChannels * _this._outputChannelSize, Float32Array);
      _this._inputPosition = _this._common.allocateTypedArray(1, Uint32Array);
      _this._samplesDecoded = _this._common.allocateTypedArray(1, Uint32Array);
      _this._sampleRateBytes = _this._common.allocateTypedArray(1, Uint32Array);
      _this._errorStringPtr = _this._common.allocateTypedArray(1, Uint32Array);
      _this._decoder = _this._common.wasm.mpeg_frame_decoder_create();
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
    _this._common.wasm.mpeg_frame_decoder_destroy(_this._decoder);
    _this._common.wasm.free(_this._decoder);
    _this._common.free();
  };
  this._decode = function (data, decodeInterval) {
    if (!(data instanceof Uint8Array)) throw Error("Data to decode must be Uint8Array. Instead got " + _typeof(data));
    _this._input.buf.set(data);
    _this._inputPosition.buf[0] = 0;
    _this._samplesDecoded.buf[0] = 0;
    var error = _this._common.wasm.mpeg_decode_interleaved(_this._decoder, _this._input.ptr, data.length, _this._inputPosition.ptr, decodeInterval, _this._output.ptr, _this._outputChannelSize, _this._samplesDecoded.ptr, _this._sampleRateBytes.ptr, _this._errorStringPtr.ptr);
    var errors = [];
    if (error) {
      var message = error + " " + _this._common.codeToString(_this._errorStringPtr.buf[0]);
      console.error("mpg123-decoder: " + message);
      _this._common.addError(errors, message, _this._inputPosition.buf[0], _this._frameNumber, _this._inputBytes, _this._outputSamples);
    }
    var samplesDecoded = _this._samplesDecoded.buf[0];
    _this._sampleRate = _this._sampleRateBytes.buf[0];
    _this._inputBytes += _this._inputPosition.buf[0];
    _this._outputSamples += samplesDecoded;
    return _this._WASMAudioDecoderCommon.getDecodedAudio(errors, [_this._output.buf.slice(0, samplesDecoded), _this._output.buf.slice(_this._outputChannelSize, _this._outputChannelSize + samplesDecoded)], samplesDecoded, _this._sampleRate);
  };
  this.decode = function (data) {
    var output = [],
      errors = [],
      samples = 0,
      offset = 0;
    for (; offset < data.length; offset += _this._inputPosition.buf[0]) {
      var decoded = _this._decode(data.subarray(offset, offset + _this._input.len), 48);
      output.push(decoded.channelData);
      errors = errors.concat(decoded.errors);
      samples += decoded.samplesDecoded;
    }
    return _this._WASMAudioDecoderCommon.getDecodedAudioMultiChannel(errors, output, 2, samples, _this._sampleRate);
  };
  this.decodeFrame = function (mpegFrame) {
    var decoded = _this._decode(mpegFrame, mpegFrame.length);
    _this._frameNumber++;
    return decoded;
  };
  this.decodeFrames = function (mpegFrames) {
    var output = [],
      errors = [],
      samples = 0,
      i = 0;
    while (i < mpegFrames.length) {
      var decoded = _this.decodeFrame(mpegFrames[i++]);
      output.push(decoded.channelData);
      errors = errors.concat(decoded.errors);
      samples += decoded.samplesDecoded;
    }
    return _this._WASMAudioDecoderCommon.getDecodedAudioMultiChannel(errors, output, 2, samples, _this._sampleRate);
  };

  // constructor

  // injects dependencies when running as a web worker
  this._isWebWorker = MPEGDecoder.isWebWorker;
  this._WASMAudioDecoderCommon = MPEGDecoder.WASMAudioDecoderCommon || _common.WASMAudioDecoderCommon;
  this._EmscriptenWASM = MPEGDecoder.EmscriptenWASM || _EmscriptenWasm["default"];
  this._module = MPEGDecoder.module;
  this._inputSize = Math.pow(2, 18);
  this._outputChannelSize = 1152 * 512;
  this._outputChannels = 2;
  this._ready = this._init();
  return this;
}