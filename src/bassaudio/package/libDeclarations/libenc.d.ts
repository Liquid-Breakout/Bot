/**
 * Created by scarboni on 25.12.2020
 */
export const key: "encoder";
export function getFfiFunDeclarations(bass: any): {
    BASS_Encode_Start: (string | any[])[];
    BASS_Encode_IsActive: (string | string[])[];
    BASS_Encode_SetNotify: (string | any[])[];
    BASS_Encode_SetPaused: (string | string[])[];
    BASS_Encode_Stop: (string | string[])[];
    BASS_Encode_CastInit: (string | string[])[];
    BASS_Encode_CastGetStats: (string | string[])[];
    BASS_Encode_CastSetTitle: (string | string[])[];
};
