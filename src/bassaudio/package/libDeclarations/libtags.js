"use strict";
/**
 * Created by scarboni on 25.12.2020
 */
const key = "tags";
function getFfiFunDeclarations(bass) {
    return {
        TAGS_GetVersion: ["int", []],
        TAGS_Read: ["string", ["int", "string"]],
        TAGS_ReadEx: ["string", ["int", "string", "int", "int"]],
        TAGS_SetUTF8: ["bool", ["bool"]],
        TAGS_GetLastErrorDesc: ["string", []],
    };
}
exports.key = key;
exports.getFfiFunDeclarations = getFfiFunDeclarations;
