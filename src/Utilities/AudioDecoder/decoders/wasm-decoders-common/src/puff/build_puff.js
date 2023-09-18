"use strict";

var _fs = _interopRequireDefault(require("fs"));
var _simpleYenc = require("simple-yenc");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var puffWasmPath = "src/common/src/puff/Puff.wasm";
var wasmCommonPath = "src/common/src/WASMAudioDecoderCommon.js";
var puffWasm = _fs["default"].readFileSync(puffWasmPath);
var puffEncoded = (0, _simpleYenc.dynamicEncode)(puffWasm, "`");
var wasmCommon = _fs["default"].readFileSync(wasmCommonPath).toString();
var puffString = wasmCommon.match(/const puffString = String[\s\S]raw`[\s\S]*`;/)[0];
var wasmStartIdx = wasmCommon.indexOf(puffString);
var wasmEndIdx = wasmStartIdx + puffString.length;

// Concatenate the strings as buffers to preserve extended ascii
var wasmCommonWithPuff = Buffer.concat([wasmCommon.substring(0, wasmStartIdx), "const puffString = String.raw`", puffEncoded, "`;", wasmCommon.substring(wasmEndIdx)].map(Buffer.from));
_fs["default"].writeFileSync(wasmCommonPath, wasmCommonWithPuff, {
  encoding: "binary"
});
console.log(puffWasm.length);