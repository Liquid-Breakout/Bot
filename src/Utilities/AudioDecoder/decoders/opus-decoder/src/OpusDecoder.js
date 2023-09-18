"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = OpusDecoder;
var _common = require("../../wasm-decoders-common/index.js");
var _EmscriptenWasm = _interopRequireDefault(require("./EmscriptenWasm.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function OpusDecoder() {
  var _this = this;
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  // static properties
  if (!OpusDecoder.errors) {
    // prettier-ignore
    Object.defineProperties(OpusDecoder, {
      errors: {
        value: new Map([[-1, "OPUS_BAD_ARG: One or more invalid/out of range arguments"], [-2, "OPUS_BUFFER_TOO_SMALL: Not enough bytes allocated in the buffer"], [-3, "OPUS_INTERNAL_ERROR: An internal error was detected"], [-4, "OPUS_INVALID_PACKET: The compressed data passed is corrupted"], [-5, "OPUS_UNIMPLEMENTED: Invalid/unsupported request number"], [-6, "OPUS_INVALID_STATE: An encoder or decoder structure is invalid or already freed"], [-7, "OPUS_ALLOC_FAIL: Memory allocation has failed"]])
      }
    });
  }

  // injects dependencies when running as a web worker
  // async
  this._init = function () {
    return new _this._WASMAudioDecoderCommon(_this).instantiate(_this._EmscriptenWASM, _this._module).then(function (common) {
      _this._common = common;
      _this._inputBytes = 0;
      _this._outputSamples = 0;
      _this._frameNumber = 0;
      _this._input = _this._common.allocateTypedArray(_this._inputSize, Uint8Array);
      _this._output = _this._common.allocateTypedArray(_this._outputChannels * _this._outputChannelSize, Float32Array);
      var mapping = _this._common.allocateTypedArray(_this._channels, Uint8Array);
      mapping.buf.set(_this._channelMappingTable);
      _this._decoder = _this._common.wasm.opus_frame_decoder_create(_this._sampleRate, _this._channels, _this._streamCount, _this._coupledStreamCount, mapping.ptr, _this._preSkip, _this._forceStereo);
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
    _this._common.free();
    _this._common.wasm.opus_frame_decoder_destroy(_this._decoder);
    _this._common.wasm.free(_this._decoder);
  };
  this._decode = function (opusFrame) {
    if (!(opusFrame instanceof Uint8Array)) throw Error("Data to decode must be Uint8Array. Instead got " + _typeof(opusFrame));
    _this._input.buf.set(opusFrame);
    var samplesDecoded = _this._common.wasm.opus_frame_decode_float_deinterleaved(_this._decoder, _this._input.ptr, opusFrame.length, _this._output.ptr);
    var error;
    if (samplesDecoded < 0) {
      error = "libopus " + samplesDecoded + " " + (OpusDecoder.errors.get(samplesDecoded) || "Unknown Error");
      console.error(error);
      samplesDecoded = 0;
    }
    return {
      outputBuffer: _this._common.getOutputChannels(_this._output.buf, _this._outputChannels, samplesDecoded),
      samplesDecoded: samplesDecoded,
      error: error
    };
  };
  this.decodeFrame = function (opusFrame) {
    var errors = [];
    var decoded = _this._decode(opusFrame);
    if (decoded.error) _this._common.addError(errors, decoded.error, opusFrame.length, _this._frameNumber, _this._inputBytes, _this._outputSamples);
    _this._frameNumber++;
    _this._inputBytes += opusFrame.length;
    _this._outputSamples += decoded.samplesDecoded;
    return _this._WASMAudioDecoderCommon.getDecodedAudioMultiChannel(errors, [decoded.outputBuffer], _this._outputChannels, decoded.samplesDecoded, _this._sampleRate);
  };
  this.decodeFrames = function (opusFrames) {
    var outputBuffers = [],
      errors = [],
      samplesDecoded = 0,
      i = 0;
    while (i < opusFrames.length) {
      var opusFrame = opusFrames[i++];
      var decoded = _this._decode(opusFrame);
      outputBuffers.push(decoded.outputBuffer);
      samplesDecoded += decoded.samplesDecoded;
      if (decoded.error) _this._common.addError(errors, decoded.error, opusFrame.length, _this._frameNumber, _this._inputBytes, _this._outputSamples);
      _this._frameNumber++;
      _this._inputBytes += opusFrame.length;
      _this._outputSamples += decoded.samplesDecoded;
    }
    return _this._WASMAudioDecoderCommon.getDecodedAudioMultiChannel(errors, outputBuffers, _this._outputChannels, samplesDecoded, _this._sampleRate);
  };

  // injects dependencies when running as a web worker
  this._isWebWorker = OpusDecoder.isWebWorker;
  this._WASMAudioDecoderCommon = OpusDecoder.WASMAudioDecoderCommon || _common.WASMAudioDecoderCommon;
  this._EmscriptenWASM = OpusDecoder.EmscriptenWASM || _EmscriptenWasm["default"];
  this._module = OpusDecoder.module;
  var MAX_FORCE_STEREO_CHANNELS = 8;
  var isNumber = function isNumber(param) {
    return typeof param === "number";
  };
  var sampleRate = options.sampleRate;
  var channels = options.channels;
  var streamCount = options.streamCount;
  var coupledStreamCount = options.coupledStreamCount;
  var channelMappingTable = options.channelMappingTable;
  var preSkip = options.preSkip;
  var forceStereo = options.forceStereo ? 1 : 0;

  // channel mapping family >= 1
  if (channels > 2 && (!isNumber(streamCount) || !isNumber(coupledStreamCount) || !Array.isArray(channelMappingTable))) {
    throw new Error("Invalid Opus Decoder Options for multichannel decoding.");
  }

  // libopus sample rate
  this._sampleRate = [8e3, 12e3, 16e3, 24e3, 48e3].includes(sampleRate) ? sampleRate : 48000;

  // channel mapping family 0
  this._channels = isNumber(channels) ? channels : 2;
  this._streamCount = isNumber(streamCount) ? streamCount : 1;
  this._coupledStreamCount = isNumber(coupledStreamCount) ? coupledStreamCount : this._channels - 1;
  this._channelMappingTable = channelMappingTable || (this._channels === 2 ? [0, 1] : [0]);
  this._preSkip = preSkip || 0;
  this._forceStereo = channels <= MAX_FORCE_STEREO_CHANNELS && channels != 2 ? forceStereo : 0;
  this._inputSize = 32000 * 0.12 * this._channels; // 256kbs per channel
  this._outputChannelSize = 120 * 48;
  this._outputChannels = this._forceStereo ? 2 : this._channels;
  this._ready = this._init();
  return this;
}