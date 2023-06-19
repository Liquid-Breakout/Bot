/**
 * Created by scarboni on 25.12.2020
 */
export const key: "tags";
export function getFfiFunDeclarations(bass: any): {
    TAGS_GetVersion: (string | never[])[];
    TAGS_Read: (string | string[])[];
    TAGS_ReadEx: (string | string[])[];
    TAGS_SetUTF8: (string | string[])[];
    TAGS_GetLastErrorDesc: (string | never[])[];
};
