"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rate8000 = exports.rate7350 = exports.rate64000 = exports.rate48000 = exports.rate44100 = exports.rate32000 = exports.rate24000 = exports.rate22050 = exports.rate192000 = exports.rate176400 = exports.rate16000 = exports.rate12000 = exports.rate11025 = exports.protection = exports.profileBits = exports.profile = exports.preSkip = exports.parseOggPage = exports.parseFrame = exports.pageSequenceNumber = exports.pageSegmentTable = exports.pageSegmentBytes = exports.pageChecksum = exports.outputGain = exports.numberAACFrames = exports.none = exports.mpegVersion = exports.mpeg = exports.monophonic = exports.modeExtension = exports.mode = exports.mapFrameStats = exports.mapCodecFrameStats = exports.logWarning = exports.logError = exports.lfe = exports.length = exports.layer = exports.isVbr = exports.isPrivate = exports.isOriginal = exports.isLastPage = exports.isHome = exports.isFirstPage = exports.isCopyrighted = exports.isContinuedPacket = exports.inputSampleRate = exports.incrementRawData = exports.header = exports.hasOpusPadding = exports.getHeaderFromUint8Array = exports.getHeader = exports.getFrame = exports.getChannelMapping = exports.free = exports.frameSize = exports.framePadding = exports.frameNumber = exports.frameLength = exports.frameCount = exports.frame = exports.fixedLengthFrameSync = exports.enable = exports.emphasis = exports.duration = exports.description = exports.dataView = exports.data = exports.crc32 = exports.crc16 = exports.crc = exports.coupledStreamCount = exports.copyrightIdStart = exports.copyrightId = exports.codecFrames = exports.codec = exports.checkFrameFooterCrc16 = exports.checkCodecUpdate = exports.channels = exports.channelModeBits = exports.channelMode = exports.channelMappings = exports.channelMappingTable = exports.channelMappingFamily = exports.bufferFullness = exports.buffer = exports.blocksize1 = exports.blocksize0 = exports.blockingStrategyBits = exports.blockingStrategy = exports.blockSizeBits = exports.blockSize = exports.bitrateNominal = exports.bitrateMinimum = exports.bitrateMaximum = exports.bitrate = exports.bitDepth = exports.bandwidth = exports.bad = exports.absoluteGranulePosition = void 0;
exports.vorbisSetup = exports.vorbisOpusChannelMapping = exports.vorbisComments = exports.vorbis = exports.version = exports.uint8Array = exports.totalSamples = exports.totalDuration = exports.totalBytesOut = exports.syncFrame = exports.subarray = exports.streamStructureVersion = exports.streamSerialNumber = exports.streamInfo = exports.streamCount = exports.stereo = exports.sixteenBitCRC = exports.setHeader = exports.segments = exports.samples = exports.sampleRateBits = exports.sampleRate = exports.sampleNumber = exports.reset = exports.reserved = exports.readRawData = exports.rawData = exports.rate96000 = exports.rate88200 = void 0;
var symbol = Symbol;

// prettier-ignore
/*
[
  [
    "left, right",
    "left, right, center",
    "left, center, right",
    "center, left, right",
    "center"
  ],
  [
    "front left, front right",
    "front left, front right, front center",
    "front left, front center, front right",
    "front center, front left, front right",
    "front center"
  ],
  [
    "side left, side right",
    "side left, side right, side center",
    "side left, side center, side right",
    "side center, side left, side right",
    "side center"
  ],
  [
    "rear left, rear right",
    "rear left, rear right, rear center",
    "rear left, rear center, rear right",
    "rear center, rear left, rear right",
    "rear center"
  ]
]
*/

var mappingJoin = ", ";
var channelMappings = function () {
  var front = "front";
  var side = "side";
  var rear = "rear";
  var left = "left";
  var center = "center";
  var right = "right";
  return ["", front + " ", side + " ", rear + " "].map(function (x) {
    return [[left, right], [left, right, center], [left, center, right], [center, left, right], [center]].flatMap(function (y) {
      return y.map(function (z) {
        return x + z;
      }).join(mappingJoin);
    });
  });
}();
exports.channelMappings = channelMappings;
var lfe = "LFE";
exports.lfe = lfe;
var monophonic = "monophonic (mono)";
exports.monophonic = monophonic;
var stereo = "stereo";
exports.stereo = stereo;
var surround = "surround";
var getChannelMapping = function getChannelMapping(channelCount) {
  for (var _len = arguments.length, mappings = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    mappings[_key - 1] = arguments[_key];
  }
  return "".concat([monophonic, stereo, "linear ".concat(surround), "quadraphonic", "5.0 ".concat(surround), "5.1 ".concat(surround), "6.1 ".concat(surround), "7.1 ".concat(surround)][channelCount - 1], " (").concat(mappings.join(mappingJoin), ")");
};

// prettier-ignore
exports.getChannelMapping = getChannelMapping;
var vorbisOpusChannelMapping = [monophonic, getChannelMapping(2, channelMappings[0][0]), getChannelMapping(3, channelMappings[0][2]), getChannelMapping(4, channelMappings[1][0], channelMappings[3][0]), getChannelMapping(5, channelMappings[1][2], channelMappings[3][0]), getChannelMapping(6, channelMappings[1][2], channelMappings[3][0], lfe), getChannelMapping(7, channelMappings[1][2], channelMappings[2][0], channelMappings[3][4], lfe), getChannelMapping(8, channelMappings[1][2], channelMappings[2][0], channelMappings[3][0], lfe)];

// sampleRates
exports.vorbisOpusChannelMapping = vorbisOpusChannelMapping;
var rate192000 = 192000;
exports.rate192000 = rate192000;
var rate176400 = 176400;
exports.rate176400 = rate176400;
var rate96000 = 96000;
exports.rate96000 = rate96000;
var rate88200 = 88200;
exports.rate88200 = rate88200;
var rate64000 = 64000;
exports.rate64000 = rate64000;
var rate48000 = 48000;
exports.rate48000 = rate48000;
var rate44100 = 44100;
exports.rate44100 = rate44100;
var rate32000 = 32000;
exports.rate32000 = rate32000;
var rate24000 = 24000;
exports.rate24000 = rate24000;
var rate22050 = 22050;
exports.rate22050 = rate22050;
var rate16000 = 16000;
exports.rate16000 = rate16000;
var rate12000 = 12000;
exports.rate12000 = rate12000;
var rate11025 = 11025;
exports.rate11025 = rate11025;
var rate8000 = 8000;
exports.rate8000 = rate8000;
var rate7350 = 7350;

// header key constants
exports.rate7350 = rate7350;
var absoluteGranulePosition = "absoluteGranulePosition";
exports.absoluteGranulePosition = absoluteGranulePosition;
var bandwidth = "bandwidth";
exports.bandwidth = bandwidth;
var bitDepth = "bitDepth";
exports.bitDepth = bitDepth;
var bitrate = "bitrate";
exports.bitrate = bitrate;
var bitrateMaximum = bitrate + "Maximum";
exports.bitrateMaximum = bitrateMaximum;
var bitrateMinimum = bitrate + "Minimum";
exports.bitrateMinimum = bitrateMinimum;
var bitrateNominal = bitrate + "Nominal";
exports.bitrateNominal = bitrateNominal;
var buffer = "buffer";
exports.buffer = buffer;
var bufferFullness = buffer + "Fullness";
exports.bufferFullness = bufferFullness;
var codec = "codec";
exports.codec = codec;
var codecFrames = codec + "Frames";
exports.codecFrames = codecFrames;
var coupledStreamCount = "coupledStreamCount";
exports.coupledStreamCount = coupledStreamCount;
var crc = "crc";
exports.crc = crc;
var crc16 = crc + "16";
exports.crc16 = crc16;
var crc32 = crc + "32";
exports.crc32 = crc32;
var data = "data";
exports.data = data;
var description = "description";
exports.description = description;
var duration = "duration";
exports.duration = duration;
var emphasis = "emphasis";
exports.emphasis = emphasis;
var hasOpusPadding = "hasOpusPadding";
exports.hasOpusPadding = hasOpusPadding;
var header = "header";
exports.header = header;
var isContinuedPacket = "isContinuedPacket";
exports.isContinuedPacket = isContinuedPacket;
var isCopyrighted = "isCopyrighted";
exports.isCopyrighted = isCopyrighted;
var isFirstPage = "isFirstPage";
exports.isFirstPage = isFirstPage;
var isHome = "isHome";
exports.isHome = isHome;
var isLastPage = "isLastPage";
exports.isLastPage = isLastPage;
var isOriginal = "isOriginal";
exports.isOriginal = isOriginal;
var isPrivate = "isPrivate";
exports.isPrivate = isPrivate;
var isVbr = "isVbr";
exports.isVbr = isVbr;
var layer = "layer";
exports.layer = layer;
var length = "length";
exports.length = length;
var mode = "mode";
exports.mode = mode;
var modeExtension = mode + "Extension";
exports.modeExtension = modeExtension;
var mpeg = "mpeg";
exports.mpeg = mpeg;
var mpegVersion = mpeg + "Version";
exports.mpegVersion = mpegVersion;
var numberAACFrames = "numberAAC" + "Frames";
exports.numberAACFrames = numberAACFrames;
var outputGain = "outputGain";
exports.outputGain = outputGain;
var preSkip = "preSkip";
exports.preSkip = preSkip;
var profile = "profile";
exports.profile = profile;
var profileBits = symbol();
exports.profileBits = profileBits;
var protection = "protection";
exports.protection = protection;
var rawData = "rawData";
exports.rawData = rawData;
var segments = "segments";
exports.segments = segments;
var subarray = "subarray";
exports.subarray = subarray;
var version = "version";
exports.version = version;
var vorbis = "vorbis";
exports.vorbis = vorbis;
var vorbisComments = vorbis + "Comments";
exports.vorbisComments = vorbisComments;
var vorbisSetup = vorbis + "Setup";
exports.vorbisSetup = vorbisSetup;
var block = "block";
var blockingStrategy = block + "ingStrategy";
exports.blockingStrategy = blockingStrategy;
var blockingStrategyBits = symbol();
exports.blockingStrategyBits = blockingStrategyBits;
var blockSize = block + "Size";
exports.blockSize = blockSize;
var blocksize0 = block + "size0";
exports.blocksize0 = blocksize0;
var blocksize1 = block + "size1";
exports.blocksize1 = blocksize1;
var blockSizeBits = symbol();
exports.blockSizeBits = blockSizeBits;
var channel = "channel";
var channelMappingFamily = channel + "MappingFamily";
exports.channelMappingFamily = channelMappingFamily;
var channelMappingTable = channel + "MappingTable";
exports.channelMappingTable = channelMappingTable;
var channelMode = channel + "Mode";
exports.channelMode = channelMode;
var channelModeBits = symbol();
exports.channelModeBits = channelModeBits;
var channels = channel + "s";
exports.channels = channels;
var copyright = "copyright";
var copyrightId = copyright + "Id";
exports.copyrightId = copyrightId;
var copyrightIdStart = copyright + "IdStart";
exports.copyrightIdStart = copyrightIdStart;
var frame = "frame";
exports.frame = frame;
var frameCount = frame + "Count";
exports.frameCount = frameCount;
var frameLength = frame + "Length";
exports.frameLength = frameLength;
var Number = "Number";
var frameNumber = frame + Number;
exports.frameNumber = frameNumber;
var framePadding = frame + "Padding";
exports.framePadding = framePadding;
var frameSize = frame + "Size";
exports.frameSize = frameSize;
var Rate = "Rate";
var inputSampleRate = "inputSample" + Rate;
exports.inputSampleRate = inputSampleRate;
var page = "page";
var pageChecksum = page + "Checksum";
exports.pageChecksum = pageChecksum;
var pageSegmentBytes = symbol();
exports.pageSegmentBytes = pageSegmentBytes;
var pageSegmentTable = page + "SegmentTable";
exports.pageSegmentTable = pageSegmentTable;
var pageSequenceNumber = page + "Sequence" + Number;
exports.pageSequenceNumber = pageSequenceNumber;
var sample = "sample";
var sampleNumber = sample + Number;
exports.sampleNumber = sampleNumber;
var sampleRate = sample + Rate;
exports.sampleRate = sampleRate;
var sampleRateBits = symbol();
exports.sampleRateBits = sampleRateBits;
var samples = sample + "s";
exports.samples = samples;
var stream = "stream";
var streamCount = stream + "Count";
exports.streamCount = streamCount;
var streamInfo = stream + "Info";
exports.streamInfo = streamInfo;
var streamSerialNumber = stream + "Serial" + Number;
exports.streamSerialNumber = streamSerialNumber;
var streamStructureVersion = stream + "StructureVersion";
exports.streamStructureVersion = streamStructureVersion;
var total = "total";
var totalBytesOut = total + "BytesOut";
exports.totalBytesOut = totalBytesOut;
var totalDuration = total + "Duration";
exports.totalDuration = totalDuration;
var totalSamples = total + "Samples";

// private methods
exports.totalSamples = totalSamples;
var readRawData = symbol();
exports.readRawData = readRawData;
var incrementRawData = symbol();
exports.incrementRawData = incrementRawData;
var mapCodecFrameStats = symbol();
exports.mapCodecFrameStats = mapCodecFrameStats;
var mapFrameStats = symbol();
exports.mapFrameStats = mapFrameStats;
var logWarning = symbol();
exports.logWarning = logWarning;
var logError = symbol();
exports.logError = logError;
var syncFrame = symbol();
exports.syncFrame = syncFrame;
var fixedLengthFrameSync = symbol();
exports.fixedLengthFrameSync = fixedLengthFrameSync;
var getHeader = symbol();
exports.getHeader = getHeader;
var setHeader = symbol();
exports.setHeader = setHeader;
var getFrame = symbol();
exports.getFrame = getFrame;
var parseFrame = symbol();
exports.parseFrame = parseFrame;
var parseOggPage = symbol();
exports.parseOggPage = parseOggPage;
var checkCodecUpdate = symbol();
exports.checkCodecUpdate = checkCodecUpdate;
var reset = symbol();
exports.reset = reset;
var enable = symbol();
exports.enable = enable;
var getHeaderFromUint8Array = symbol();
exports.getHeaderFromUint8Array = getHeaderFromUint8Array;
var checkFrameFooterCrc16 = symbol();
exports.checkFrameFooterCrc16 = checkFrameFooterCrc16;
var uint8Array = Uint8Array;
exports.uint8Array = uint8Array;
var dataView = DataView;
exports.dataView = dataView;
var reserved = "reserved";
exports.reserved = reserved;
var bad = "bad";
exports.bad = bad;
var free = "free";
exports.free = free;
var none = "none";
exports.none = none;
var sixteenBitCRC = "16bit CRC";
exports.sixteenBitCRC = sixteenBitCRC;