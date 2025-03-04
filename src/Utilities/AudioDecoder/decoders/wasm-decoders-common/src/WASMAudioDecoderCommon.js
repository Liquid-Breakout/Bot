"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = WASMAudioDecoderCommon;
var _templateObject;
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
function WASMAudioDecoderCommon() {
  var _this = this;
  // setup static methods
  var uint8Array = Uint8Array;
  var float32Array = Float32Array;
  if (!WASMAudioDecoderCommon.modules) {
    Object.defineProperties(WASMAudioDecoderCommon, {
      modules: {
        value: new WeakMap()
      },
      setModule: {
        value: function value(Ref, module) {
          WASMAudioDecoderCommon.modules.set(Ref, Promise.resolve(module));
        }
      },
      getModule: {
        value: function value(Ref, wasmString) {
          var module = WASMAudioDecoderCommon.modules.get(Ref);
          if (!module) {
            if (!wasmString) {
              wasmString = Ref.wasm;
              module = WASMAudioDecoderCommon.inflateDynEncodeString(wasmString).then(function (data) {
                return WebAssembly.compile(data);
              });
            } else {
              module = WebAssembly.compile(WASMAudioDecoderCommon.decodeDynString(wasmString));
            }
            WASMAudioDecoderCommon.modules.set(Ref, module);
          }
          return module;
        }
      },
      concatFloat32: {
        value: function value(buffers, length) {
          var ret = new float32Array(length),
            i = 0,
            offset = 0;
          while (i < buffers.length) {
            ret.set(buffers[i], offset);
            offset += buffers[i++].length;
          }
          return ret;
        }
      },
      getDecodedAudio: {
        value: function value(errors, channelData, samplesDecoded, sampleRate, bitDepth) {
          return {
            errors: errors,
            channelData: channelData,
            samplesDecoded: samplesDecoded,
            sampleRate: sampleRate,
            bitDepth: bitDepth
          };
        }
      },
      getDecodedAudioMultiChannel: {
        value: function value(errors, input, channelsDecoded, samplesDecoded, sampleRate, bitDepth) {
          var channelData = [],
            i,
            j;
          for (i = 0; i < channelsDecoded; i++) {
            var channel = [];
            for (j = 0; j < input.length;) channel.push(input[j++][i] || []);
            channelData.push(WASMAudioDecoderCommon.concatFloat32(channel, samplesDecoded));
          }
          return WASMAudioDecoderCommon.getDecodedAudio(errors, channelData, samplesDecoded, sampleRate, bitDepth);
        }
      },
      /*
       ******************
       * Compression Code
       ******************
       */

      crc32Table: {
        value: function () {
          var crc32Table = new Int32Array(256),
            i,
            j,
            c;
          for (i = 0; i < 256; i++) {
            for (c = i << 24, j = 8; j > 0; --j) c = c & 0x80000000 ? c << 1 ^ 0x04c11db7 : c << 1;
            crc32Table[i] = c;
          }
          return crc32Table;
        }()
      },
      decodeDynString: {
        value: function value(source) {
          var output = new uint8Array(source.length);
          var offset = parseInt(source.substring(11, 13), 16);
          var offsetReverse = 256 - offset;
          var crcIdx,
            escaped = false,
            byteIndex = 0,
            _byte,
            i = 21,
            expectedCrc,
            resultCrc = 0xffffffff;
          while (i < source.length) {
            _byte = source.charCodeAt(i++);
            if (_byte === 61 && !escaped) {
              escaped = true;
              continue;
            }
            if (escaped) {
              escaped = false;
              _byte -= 64;
            }
            output[byteIndex] = _byte < offset && _byte > 0 ? _byte + offsetReverse : _byte - offset;
            resultCrc = resultCrc << 8 ^ WASMAudioDecoderCommon.crc32Table[(resultCrc >> 24 ^ output[byteIndex++]) & 255];
          }

          // expected crc
          for (crcIdx = 0; crcIdx <= 8; crcIdx += 2) expectedCrc |= parseInt(source.substring(13 + crcIdx, 15 + crcIdx), 16) << crcIdx * 4;
          if (expectedCrc !== resultCrc) throw new Error("WASM string decode failed crc32 validation");
          return output.subarray(0, byteIndex);
        }
      },
      inflateDynEncodeString: {
        value: function value(source) {
          source = WASMAudioDecoderCommon.decodeDynString(source);
          return new Promise(function (resolve) {
            // prettier-ignore
            var puffString = String.raw(_templateObject || (_templateObject = _taggedTemplateLiteral(["dynEncode0114db91da9b\x14u\x87\x81\x15\x14\x14\x14\x15*\x17t\x16\x93\x93\x15\x93t\x18\x93\x93\x93\x93\x15\x93t\x17\x93\x93\x93\x15\x93\x17\x1A\x19\x14\x15\x14\x16\x15\x19\x17\x15\x14$\x1A#\x16\x93\x15U\xA4\xA4\x18\x1F\x93\x14U\xA4\xA4\x18\x1F\x1B3\x17\x1A\x81y\x81\x83\x86\x8D\x16\x14\x18\x84\x89zz\x14\x18\x1Fss|yu\x84svu\x87y\x17\x15\x1E\xDA&\x19\x88\x15\x18\x934\x14<\x1605\x164\x14<\x16,5\x17\x17T4\x154\x16^\x18T4\x144\x14<\x16(6\x18U\x15~J\x16(4\x184\x14<\x16 ~A\x14\x145\x194\x144\x16U\x1C~6\x18J\x1604\x174\x194\x16\x88\x865\x174\x185\x16 \x15\x1F\x1F4\x144\x164\x15\x7FJ\x1604\x144\x174\x15\x89J\x16,4\x17U\x934\x15\x88U\x93\x87\x85\x1F\xD2\x16\x15\x1A\x937\x14U4\x7F5\x1B\x17\x934\x18U4Z\x18\x934\x17U\x144\x17U\x14^/6\x1C5\x184\x165\x19\x17T4\x18\x18T4\x144\x19B\x15\x14U\x15\x88~6\x1A4\x1AC\x15\x14U\x15~O\x15\x144\x18U\x15\x7F5\x184\x19U\x16~5\x19 \x15\x1F\x1FU\x145\x1A\x16T4\x14B\x15\x144\x17Z!\x144\x14U\x16~5\x19U\x145\x18U\x155\x1A\x17T4\x18U\x16~6\x17U4Z\x18TU\x145\x19U\x165\x18\x17T4\x184\x1B~4\x19O\x15\x144\x18U2Z\x18TU\x145\x18\x17T4\x184\x1CZ!\x194\x16B\x15\x146\x14\x18T4\x1B4\x14U\x15\x88~6\x144\x14B\x15\x146\x14U\x15~O\x15\x144\x154\x14U\x15\x88~4\x18O\x15\x14\x1F4\x16U\x16~5\x164\x18U\x15~5\x18 \x14\x1F\x14\x194\x144\x18~C\x15\x144\x19~5\x194\x18U\x16~5\x18 \x15\x1F\x14\x1F\x14\x1F4\x184\x19~5\x1D4\x175\x184\x1AU\x15\x884\x1DB\x15\x14\x7F6\x1AU\x14b!\x14\x1F\x1F4\x1A\x194\x144\x18~U\x14O\x15\x144\x18U\x16~5\x18 \x15\x1F\x1F\x1F\x7F\x15\x19\x93U\x165\x16\x17\x934\x16U4Z\x18TU\x8A#\x1F4\x184\x14U\x15$\x144\x17\x866\x174\x15<\x16\x144\x16~B\x15\x146\x19\x7F^\x18\x934\x15<\x16\x184\x1A4\x18\x7F4\x17~U\x15\x88~B\x15\x14\x194\x16U\x16~5\x164\x17U\x15\x885\x174\x194\x1A~5\x1A4\x184\x19~U\x15\x885\x18 \x15\x1F\x1F\x1F\xB5\x17\x15\x19\x93U\xE4#U\x14J\x16\x14U\xE8#5\x18\x16T\x17T4\x17U0Z\x18T\x16TUX5\x17U\x155\x18\x17T4\x17\x18T4\x17U\xE0#~4\x18O\x15\x14U\x154\x17U\xA0$~C\x15\x14\x884\x18~5\x184\x17U\x16~5\x17 \x15\x19\x17T4\x144\x15$\x166\x19U\x14!\x1A\x16T\x16T\x16T4\x19U\x13\x15a\x18T4\x14<\x16\x146\x17\x18T4\x14<\x16\x1C6\x184\x14<\x16\x18Z!\x1C4\x174\x18~4\x19N\x14\x14\x1F4\x14<\x16\x1CU\x15~5\x1A \x15\x1F4\x19U\x94\x16Z!\x164\x19U\xB1\x16_\x18TU\x8A#\x1F4\x144\x19U\x95\x16\x7FU\x15\x886\x18U\xD4\x1C~B\x15\x14$\x145\x1A4\x144\x16$\x166\x19U\x14!\x1D4\x19U\x15\x886\x17U\xA4#~B\x15\x144\x144\x17U\xE4#~B\x15\x14$\x14~6\x1B4\x14<\x16\x1C6\x17_\x18TU\x89#\x1F4\x174\x1A4\x18U\x94\x1C~B\x15\x14~6\x18~5\x1A4\x14<\x16\x14Y!\x144\x1A4\x14<\x16\x18_!\x1A\x17T4\x18Y!\x164\x14<\x16\x146\x1A4\x17~4\x1A4\x174\x1B\x7F~A\x14\x14N\x14\x144\x144\x14<\x16\x1CU\x15~6\x17J\x16\x1C4\x18U\x15\x7F5\x18 \x14\x1F\x14\x1F4\x144\x1AJ\x16\x1C\x1F4\x19U\x94\x16[!\x15\x1F\x1FU\x14#\x1F\x14\x1F\x14\x1F\x194\x184\x17U\x15\x8AO\x15\x144\x18U\x16~5\x184\x17U\x15~5\x17 \x15\x1F\x1FU\x155\x19\x1F4\x19\x1F\x13\x1E\x15 \x937\x14U\x04\x1E\x7F6\x188\x144\x184\x14J\x16\x144\x184\x16J\x16 4\x18U\x14J\x16\x1C4\x18U\x14J\x1604\x18V\x14K\x16(4\x184\x15<\x16\x14J\x16\x184\x184\x17<\x16\x14J\x16$4\x18U\xB4\x1E~5\x1F4\x18U\x04\x1D~5 4\x18U\xA4\x1C~5!\x16T\x16T\x17T4\x18U\x15$\x145\"U\x935\x14\x16T\x16T\x16T\x16T\x16T\x16T\x16T4\x18U\x16$\x14\"\x17\x14\x15\x18\x1C\x1F4\x18V\x14K\x17,U\x165\x194\x18<\x16(6\x14U\x18~6\x164\x18<\x16$6\x1D_!\x1C4\x18<\x16 6\x1C4\x14~6\x1AA\x14\x145\x1B4\x1AA\x14\x155\x1E4\x184\x14U\x17~6#J\x16(U\x925\x144\x1AA\x14\x164\x1BU\x13\x15\x87[!\x1B4\x184\x16J\x16(4\x1C4#~A\x14\x144\x1EU\x1C\x886\x1AU\x93\x87U\x1C\x8AU\x13\x15\x85[!\x1B4\x1A4\x1B\x866\x144\x16~6\x1B4\x1D_!\x1C4\x18<\x16\x1C6\x194\x14~5\x1A4\x18<\x16\x146\x1D\x18T4\x18<\x16\x184\x1A]\x18TU\x155\x19 \x1E\x1F\x17T4\x14Y!\x174\x194\x1D~4\x164\x1C~A\x14\x14N\x14\x144\x19U\x15~5\x194\x16U\x15~5\x164\x14U\x15\x7F5\x14 \x14\x1F\x14\x1F4\x184\x1BJ\x16(4\x184\x1AJ\x16\x1C \x16\x1FU\xC4\x1DA\x14\x14!\x17U\x145\x16U\x94#U\xF4\x1DJ\x16\x14U\x10\"U\xD4\x1DJ\x16\x14U\x9C#U\xD4\"J\x16\x14U\x98#U\xB4\"J\x16\x14\x17T4\x16U\xB4\x16Z\x18TU\x145\x16\x17T4\x16U\xF4\x15Z\x18TU\x145\x16\x17T4\x16UDZ\x18TU\x145\x16\x17T4\x16U$[\x18T4\x164\x1F~U\x1CO\x15\x144\x16U\x16~5\x16 \x15\x1F\x1FU\xD4\x1DU\xF4\x1D4\x18U\x04\x19~U\xB4\x16$\x15.U\x145\x16\x17T4\x16UP[\x18T4\x18U\x04\x19~4\x16~U\x19O\x15\x144\x16U\x16~5\x16 \x15\x1F\x1FU\x98#<\x16\x14U\x9C#<\x16\x144\x18U\x04\x19~U2$\x15.U\xC4\x1DU\x15N\x14\x14 \x1D\x194\x164 ~U\x1BO\x15\x144\x16U\x16~5\x16 \x15\x1F\x14\x1F\x14\x194\x164!~U\x1DO\x15\x144\x16U\x16~5\x16 \x15\x1F\x14\x1F\x14\x194\x18U\x04\x19~4\x16~U\x1CO\x15\x144\x16U\x16~5\x16 \x15\x1F\x14\x1F\x14\x1F4\x184\x19J\x16\x1C4\x184\x16J\x16(\x1FU\x145\x14 \x16\x1F4\x184\x18U\xA4\x15~J\x16@4\x184\x18U\xE4\x19~J\x16<4\x184\x18UD~J\x1684\x184\x18U\x04\x14~J\x1644\x18U\x19$\x145\x164\x18U\x19$\x145\x19U\x915\x144\x18U\x18$\x145\x1B4\x16U1^4\x19U1^\x86!\x154\x16U\x95\x16~5\x1C4\x19U\x15~5\x1AU\x94\x1D5\x144\x1BU\x18~6\x16U\x144\x16U\x14^/6\x195\x16\x17T4\x16\x18T4\x18U\x17$\x145\x1B4\x18U\x04\x19~4\x14B\x15\x14U\x15\x88~4\x1BO\x15\x144\x16U\x15\x7F5\x164\x14U\x16~5\x14 \x15\x19U\x14U'4\x19\x7F6\x144\x14U'_/5\x164\x19U\x15\x88U\x94\x1D~5\x14\x17T4\x16\x18T4\x18U\x04\x19~4\x14B\x15\x14U\x15\x88~U\x14O\x15\x144\x16U\x15\x7F5\x164\x14U\x16~5\x14 \x15\x1F\x1FU\x905\x144\x18U\xE4\x19~4\x18U\xA4\x15~4\x18U\x04\x19~U'$\x15!\x174\x1A4\x1C~5\x1BU\x145\x19\x17T4\x194\x1B\x18T4\x184\x18U<~$\x166\x14U\x14!\x194\x14U#a\x18T4\x18U\x04\x19~4\x19U\x15\x88~4\x14O\x15\x144\x19U\x15~5\x19 \x16\x1FU\x145\x1DU\x175\x1EU\x175\x16\x16T\x16T\x16T4\x14U$\x7F\"\x16\x14\x16\x15\x1F4\x19Y\x18TU\x8F5\x14 \x1C\x1F4\x19U\x15\x884\x18~C\x15\x02\x195\x1DU\x165\x16 \x15\x1FU\x1F5\x1EU\x1B5\x16\x1F4\x1B4\x184\x16$\x144\x1E~6\x164\x19~\x18TU\x8E5\x14 \x1A\x1F4\x18U\x04\x19~4\x19U\x15\x88~5\x14\x17T4\x16Y!\x164\x144\x1DO\x15\x144\x14U\x16~5\x144\x19U\x15~5\x194\x16U\x15\x7F5\x16 \x14\x1F\x14\x1F\x1F4\x18C\x15\x04\x1DY\x18TU\x8B5\x14 \x18\x1F4\x18U\xE4\x19~4\x18U\xA4\x15~4\x18U\x04\x19~4\x1C$\x156\x16\x18TU\x8D5\x144\x16U\x14!\x184\x1C4\x18B\x15\xE6\x194\x18B\x15\xE4\x19~[!\x18\x1F4\x18U\x04\x14~4\x18UD~4\x18U\x04\x19~4\x1CU\x15\x88~4\x1A$\x156\x16\x18TU\x8C5\x144\x16U\x14!\x184\x1A4\x18B\x15\x864\x18B\x15\x84~[!\x18\x1F4\x184\x18U<~4\x18U4~$\x175\x14 \x17\x1F\x14\x1F\x14\x1F4\x18U\x10\"U\x98#$\x175\x14\x1F4\x144\"\x86Y!\x14\x1F4\x145\x194\x14U\x14^!\x15\x1F4\x154\x18<\x16\x1CJ\x16\x144\x174\x18<\x16(J\x16\x144\x145\x19\x1F4\x18U\x04\x1E~8\x144\x19\x1F\x1F\xAD\x15\x17\x14U\x94\x1C\x1FN\x17\x14\x18\x14\x19\x14\x1A\x14\x1B\x14\x1C\x14\x1D\x14\x1E\x14\x1F\x14!\x14#\x14%\x14'\x14+\x14/\x143\x147\x14?\x14G\x14O\x14W\x14g\x14w\x14\x87\x14\x97\x14\xB7\x14\xD7\x14\xF7\x14\x16\x15\x14U\xE4\x1C\x1F;\x15\x14\x15\x14\x15\x14\x15\x14\x16\x14\x16\x14\x16\x14\x16\x14\x17\x14\x17\x14\x17\x14\x17\x14\x18\x14\x18\x14\x18\x14\x18\x14\x19\x14\x19\x14\x19\x14\x19\x14U\x94\x1D\x1F9$\x14%\x14&\x14\x14\x14\x1C\x14\x1B\x14\x1D\x14\x1A\x14\x1E\x14\x19\x14\x1F\x14\x18\x14 \x14\x17\x14!\x14\x16\x14\"\x14\x15\x14#"], ["dynEncode0114db91da9b\x14u\x87\x81\x15\x14\x14\x14\x15*\x17t\x16\x93\x93\x15\x93t\x18\x93\x93\x93\x93\x15\x93t\x17\x93\x93\x93\x15\x93\x17\x1A\x19\x14\x15\x14\x16\x15\x19\x17\x15\x14$\x1A#\x16\x93\x15U\xA4\xA4\x18\x1F\x93\x14U\xA4\xA4\x18\x1F\x1B3\x17\x1A\x81y\x81\x83\x86\x8D\x16\x14\x18\x84\x89zz\x14\x18\x1Fss|yu\x84svu\x87y\x17\x15\x1E\xDA&\x19\x88\x15\x18\x934\x14<\x1605\x164\x14<\x16,5\x17\x17T4\x154\x16^\x18T4\x144\x14<\x16(6\x18U\x15~J\x16(4\x184\x14<\x16 ~A\x14\x145\x194\x144\x16U\x1C~6\x18J\x1604\x174\x194\x16\x88\x865\x174\x185\x16 \x15\x1F\x1F4\x144\x164\x15\x7FJ\x1604\x144\x174\x15\x89J\x16,4\x17U\x934\x15\x88U\x93\x87\x85\x1F\xD2\x16\x15\x1A\x937\x14U4\x7F5\x1B\x17\x934\x18U4Z\x18\x934\x17U\x144\x17U\x14^/6\x1C5\x184\x165\x19\x17T4\x18\x18T4\x144\x19B\x15\x14U\x15\x88~6\x1A4\x1AC\x15\x14U\x15~O\x15\x144\x18U\x15\x7F5\x184\x19U\x16~5\x19 \x15\x1F\x1FU\x145\x1A\x16T4\x14B\x15\x144\x17Z!\x144\x14U\x16~5\x19U\x145\x18U\x155\x1A\x17T4\x18U\x16~6\x17U4Z\x18TU\x145\x19U\x165\x18\x17T4\x184\x1B~4\x19O\x15\x144\x18U2Z\x18TU\x145\x18\x17T4\x184\x1CZ!\x194\x16B\x15\x146\x14\x18T4\x1B4\x14U\x15\x88~6\x144\x14B\x15\x146\x14U\x15~O\x15\x144\x154\x14U\x15\x88~4\x18O\x15\x14\x1F4\x16U\x16~5\x164\x18U\x15~5\x18 \x14\x1F\x14\x194\x144\x18~C\x15\x144\x19~5\x194\x18U\x16~5\x18 \x15\x1F\x14\x1F\x14\x1F4\x184\x19~5\x1D4\x175\x184\x1AU\x15\x884\x1DB\x15\x14\x7F6\x1AU\x14b!\x14\x1F\x1F4\x1A\x194\x144\x18~U\x14O\x15\x144\x18U\x16~5\x18 \x15\x1F\x1F\x1F\x7F\x15\x19\x93U\x165\x16\x17\x934\x16U4Z\x18TU\x8A#\x1F4\x184\x14U\x15$\x144\x17\x866\x174\x15<\x16\x144\x16~B\x15\x146\x19\x7F^\x18\x934\x15<\x16\x184\x1A4\x18\x7F4\x17~U\x15\x88~B\x15\x14\x194\x16U\x16~5\x164\x17U\x15\x885\x174\x194\x1A~5\x1A4\x184\x19~U\x15\x885\x18 \x15\x1F\x1F\x1F\xB5\x17\x15\x19\x93U\xE4#U\x14J\x16\x14U\xE8#5\x18\x16T\x17T4\x17U0Z\x18T\x16TUX5\x17U\x155\x18\x17T4\x17\x18T4\x17U\xE0#~4\x18O\x15\x14U\x154\x17U\xA0$~C\x15\x14\x884\x18~5\x184\x17U\x16~5\x17 \x15\x19\x17T4\x144\x15$\x166\x19U\x14\\!\x1A\x16T\x16T\x16T4\x19U\x13\x15a\x18T4\x14<\x16\x146\x17\x18T4\x14<\x16\x1C6\x184\x14<\x16\x18Z!\x1C4\x174\x18~4\x19N\x14\x14\x1F4\x14<\x16\x1CU\x15~5\x1A \x15\x1F4\x19U\x94\x16Z!\x164\x19U\xB1\x16_\x18TU\x8A#\x1F4\x144\x19U\x95\x16\x7FU\x15\x886\x18U\xD4\x1C~B\x15\x14$\x145\x1A4\x144\x16$\x166\x19U\x14\\!\x1D4\x19U\x15\x886\x17U\xA4#~B\x15\x144\x144\x17U\xE4#~B\x15\x14$\x14~6\x1B4\x14<\x16\x1C6\x17_\x18TU\x89#\x1F4\x174\x1A4\x18U\x94\x1C~B\x15\x14~6\x18~5\x1A4\x14<\x16\x14Y!\x144\x1A4\x14<\x16\x18_!\x1A\x17T4\x18Y!\x164\x14<\x16\x146\x1A4\x17~4\x1A4\x174\x1B\x7F~A\x14\x14N\x14\x144\x144\x14<\x16\x1CU\x15~6\x17J\x16\x1C4\x18U\x15\x7F5\x18 \x14\x1F\x14\x1F4\x144\x1AJ\x16\x1C\x1F4\x19U\x94\x16[!\x15\x1F\x1FU\x14#\x1F\x14\x1F\x14\x1F\x194\x184\x17U\x15\x8AO\x15\x144\x18U\x16~5\x184\x17U\x15~5\x17 \x15\x1F\x1FU\x155\x19\x1F4\x19\x1F\x13\x1E\x15 \x937\x14U\x04\x1E\x7F6\x188\x144\x184\x14J\x16\x144\x184\x16J\x16 4\x18U\x14J\x16\x1C4\x18U\x14J\x1604\x18V\x14K\x16(4\x184\x15<\x16\x14J\x16\x184\x184\x17<\x16\x14J\x16$4\x18U\xB4\x1E~5\x1F4\x18U\x04\x1D~5 4\x18U\xA4\x1C~5!\x16T\x16T\x17T4\x18U\x15$\x145\"U\x935\x14\x16T\x16T\x16T\x16T\x16T\x16T\x16T4\x18U\x16$\x14\"\x17\x14\x15\x18\x1C\x1F4\x18V\x14K\x17,U\x165\x194\x18<\x16(6\x14U\x18~6\x164\x18<\x16$6\x1D_!\x1C4\x18<\x16 6\x1C4\x14~6\x1AA\x14\x145\x1B4\x1AA\x14\x155\x1E4\x184\x14U\x17~6#J\x16(U\x925\x144\x1AA\x14\x164\x1BU\x13\x15\x87[!\x1B4\x184\x16J\x16(4\x1C4#~A\x14\x144\x1EU\x1C\x886\x1AU\x93\x87U\x1C\x8AU\x13\x15\x85[!\x1B4\x1A4\x1B\x866\x144\x16~6\x1B4\x1D_!\x1C4\x18<\x16\x1C6\x194\x14~5\x1A4\x18<\x16\x146\x1D\x18T4\x18<\x16\x184\x1A]\x18TU\x155\x19 \x1E\x1F\x17T4\x14Y!\x174\x194\x1D~4\x164\x1C~A\x14\x14N\x14\x144\x19U\x15~5\x194\x16U\x15~5\x164\x14U\x15\x7F5\x14 \x14\x1F\x14\x1F4\x184\x1BJ\x16(4\x184\x1AJ\x16\x1C \x16\x1FU\xC4\x1DA\x14\x14!\x17U\x145\x16U\x94#U\xF4\x1DJ\x16\x14U\x10\"U\xD4\x1DJ\x16\x14U\x9C#U\xD4\"J\x16\x14U\x98#U\xB4\"J\x16\x14\x17T4\x16U\xB4\x16Z\x18TU\x145\x16\x17T4\x16U\xF4\x15Z\x18TU\x145\x16\x17T4\x16UDZ\x18TU\x145\x16\x17T4\x16U$[\x18T4\x164\x1F~U\x1CO\x15\x144\x16U\x16~5\x16 \x15\x1F\x1FU\xD4\x1DU\xF4\x1D4\x18U\x04\x19~U\xB4\x16$\x15.U\x145\x16\x17T4\x16UP[\x18T4\x18U\x04\x19~4\x16~U\x19O\x15\x144\x16U\x16~5\x16 \x15\x1F\x1FU\x98#<\x16\x14U\x9C#<\x16\x144\x18U\x04\x19~U2$\x15.U\xC4\x1DU\x15N\x14\x14 \x1D\x194\x164 ~U\x1BO\x15\x144\x16U\x16~5\x16 \x15\x1F\x14\x1F\x14\x194\x164!~U\x1DO\x15\x144\x16U\x16~5\x16 \x15\x1F\x14\x1F\x14\x194\x18U\x04\x19~4\x16~U\x1CO\x15\x144\x16U\x16~5\x16 \x15\x1F\x14\x1F\x14\x1F4\x184\x19J\x16\x1C4\x184\x16J\x16(\x1FU\x145\x14 \x16\x1F4\x184\x18U\xA4\x15~J\x16@4\x184\x18U\xE4\x19~J\x16<4\x184\x18UD~J\x1684\x184\x18U\x04\x14~J\x1644\x18U\x19$\x145\x164\x18U\x19$\x145\x19U\x915\x144\x18U\x18$\x145\x1B4\x16U1^4\x19U1^\x86!\x154\x16U\x95\x16~5\x1C4\x19U\x15~5\x1AU\x94\x1D5\x144\x1BU\x18~6\x16U\x144\x16U\x14^/6\x195\x16\x17T4\x16\x18T4\x18U\x17$\x145\x1B4\x18U\x04\x19~4\x14B\x15\x14U\x15\x88~4\x1BO\x15\x144\x16U\x15\x7F5\x164\x14U\x16~5\x14 \x15\x19U\x14U'4\x19\x7F6\x144\x14U'_/5\x164\x19U\x15\x88U\x94\x1D~5\x14\x17T4\x16\x18T4\x18U\x04\x19~4\x14B\x15\x14U\x15\x88~U\x14O\x15\x144\x16U\x15\x7F5\x164\x14U\x16~5\x14 \x15\x1F\x1FU\x905\x144\x18U\xE4\x19~4\x18U\xA4\x15~4\x18U\x04\x19~U'$\x15!\x174\x1A4\x1C~5\x1BU\x145\x19\x17T4\x194\x1B\\\x18T4\x184\x18U<~$\x166\x14U\x14\\!\x194\x14U#a\x18T4\x18U\x04\x19~4\x19U\x15\x88~4\x14O\x15\x144\x19U\x15~5\x19 \x16\x1FU\x145\x1DU\x175\x1EU\x175\x16\x16T\x16T\x16T4\x14U$\x7F\"\x16\x14\x16\x15\x1F4\x19Y\x18TU\x8F5\x14 \x1C\x1F4\x19U\x15\x884\x18~C\x15\x02\x195\x1DU\x165\x16 \x15\x1FU\x1F5\x1EU\x1B5\x16\x1F4\x1B4\x184\x16$\x144\x1E~6\x164\x19~\\\x18TU\x8E5\x14 \x1A\x1F4\x18U\x04\x19~4\x19U\x15\x88~5\x14\x17T4\x16Y!\x164\x144\x1DO\x15\x144\x14U\x16~5\x144\x19U\x15~5\x194\x16U\x15\x7F5\x16 \x14\x1F\x14\x1F\x1F4\x18C\x15\x04\x1DY\x18TU\x8B5\x14 \x18\x1F4\x18U\xE4\x19~4\x18U\xA4\x15~4\x18U\x04\x19~4\x1C$\x156\x16\x18TU\x8D5\x144\x16U\x14\\!\x184\x1C4\x18B\x15\xE6\x194\x18B\x15\xE4\x19~[!\x18\x1F4\x18U\x04\x14~4\x18UD~4\x18U\x04\x19~4\x1CU\x15\x88~4\x1A$\x156\x16\x18TU\x8C5\x144\x16U\x14\\!\x184\x1A4\x18B\x15\x864\x18B\x15\x84~[!\x18\x1F4\x184\x18U<~4\x18U4~$\x175\x14 \x17\x1F\x14\x1F\x14\x1F4\x18U\x10\"U\x98#$\x175\x14\x1F4\x144\"\x86Y!\x14\x1F4\x145\x194\x14U\x14^!\x15\x1F4\x154\x18<\x16\x1CJ\x16\x144\x174\x18<\x16(J\x16\x144\x145\x19\x1F4\x18U\x04\x1E~8\x144\x19\x1F\x1F\xAD\x15\x17\x14U\x94\x1C\x1FN\x17\x14\x18\x14\x19\x14\x1A\x14\x1B\x14\x1C\x14\x1D\x14\x1E\x14\x1F\x14!\x14#\x14%\x14'\x14+\x14/\x143\x147\x14?\x14G\x14O\x14W\x14g\x14w\x14\x87\x14\x97\x14\xB7\x14\xD7\x14\xF7\x14\x16\x15\x14U\xE4\x1C\x1F;\x15\x14\x15\x14\x15\x14\x15\x14\x16\x14\x16\x14\x16\x14\x16\x14\x17\x14\x17\x14\x17\x14\x17\x14\x18\x14\x18\x14\x18\x14\x18\x14\x19\x14\x19\x14\x19\x14\x19\x14U\x94\x1D\x1F9$\x14%\x14&\x14\x14\x14\x1C\x14\x1B\x14\x1D\x14\x1A\x14\x1E\x14\x19\x14\x1F\x14\x18\x14 \x14\x17\x14!\x14\x16\x14\"\x14\x15\x14#"])));
            WASMAudioDecoderCommon.getModule(WASMAudioDecoderCommon, puffString).then(function (wasm) {
              return WebAssembly.instantiate(wasm, {});
            }).then(function (_ref) {
              var exports = _ref.exports;
              // required for minifiers that mangle the __heap_base property
              var instanceExports = new Map(Object.entries(exports));
              var puff = instanceExports.get("puff");
              var memory = instanceExports.get("memory")["buffer"];
              var dataArray = new uint8Array(memory);
              var heapView = new DataView(memory);
              var heapPos = instanceExports.get("__heap_base");

              // source length
              var sourceLength = source.length;
              var sourceLengthPtr = heapPos;
              heapPos += 4;
              heapView.setInt32(sourceLengthPtr, sourceLength, true);

              // source data
              var sourcePtr = heapPos;
              heapPos += sourceLength;
              dataArray.set(source, sourcePtr);

              // destination length
              var destLengthPtr = heapPos;
              heapPos += 4;
              heapView.setInt32(destLengthPtr, dataArray.byteLength - heapPos, true);

              // destination data fills in the rest of the heap
              puff(heapPos, destLengthPtr, sourcePtr, sourceLengthPtr);
              resolve(dataArray.slice(heapPos, heapPos + heapView.getInt32(destLengthPtr, true)));
            });
          });
        }
      }
    });
  }
  Object.defineProperty(this, "wasm", {
    enumerable: true,
    get: function get() {
      return _this._wasm;
    }
  });
  this.getOutputChannels = function (outputData, channelsDecoded, samplesDecoded) {
    var output = [],
      i = 0;
    while (i < channelsDecoded) output.push(outputData.slice(i * samplesDecoded, i++ * samplesDecoded + samplesDecoded));
    return output;
  };
  this.allocateTypedArray = function (len, TypedArray) {
    var setPointer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var ptr = _this._wasm.malloc(TypedArray.BYTES_PER_ELEMENT * len);
    if (setPointer) _this._pointers.add(ptr);
    return {
      ptr: ptr,
      len: len,
      buf: new TypedArray(_this._wasm.HEAP, ptr, len)
    };
  };
  this.free = function () {
    _this._pointers.forEach(function (ptr) {
      _this._wasm.free(ptr);
    });
    _this._pointers.clear();
  };
  this.codeToString = function (ptr) {
    var characters = [],
      heap = new Uint8Array(_this._wasm.HEAP);
    for (var character = heap[ptr]; character !== 0; character = heap[++ptr]) characters.push(character);
    return String.fromCharCode.apply(null, characters);
  };
  this.addError = function (errors, message, frameLength, frameNumber, inputBytes, outputSamples) {
    errors.push({
      message: message,
      frameLength: frameLength,
      frameNumber: frameNumber,
      inputBytes: inputBytes,
      outputSamples: outputSamples
    });
  };
  this.instantiate = function (_EmscriptenWASM, _module) {
    if (_module) WASMAudioDecoderCommon.setModule(_EmscriptenWASM, _module);
    _this._wasm = new _EmscriptenWASM(WASMAudioDecoderCommon).instantiate();
    _this._pointers = new Set();
    return _this._wasm.ready.then(function () {
      return _this;
    });
  };
}