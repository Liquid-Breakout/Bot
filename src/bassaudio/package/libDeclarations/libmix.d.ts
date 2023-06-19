/**
 * Created by scarboni on 25.12.2020
 */
export const key: "mixer";
export function getFfiFunDeclarations(bass: any): {
    BASS_Mixer_StreamCreate: (string | string[])[];
    BASS_Mixer_StreamAddChannel: (string | string[])[];
    BASS_Mixer_ChannelGetLevel: (string | string[])[];
    BASS_Mixer_ChannelGetMixer: (string | string[])[];
    BASS_Mixer_ChannelGetPosition: (string | string[])[];
    BASS_Mixer_ChannelRemove: (string | string[])[];
    BASS_Mixer_ChannelRemoveSync: (string | string[])[];
    BASS_Mixer_ChannelSetPosition: (string | string[])[];
    BASS_Mixer_ChannelSetSync: (string | any[])[];
    BASS_Split_StreamCreate: (string | string[])[];
    BASS_Split_StreamGetAvailable: (string | string[])[];
    BASS_Split_StreamGetSource: (string | string[])[];
    BASS_Split_StreamReset: (string | string[])[];
    BASS_Split_StreamResetEx: (string | string[])[];
    BASS_Split_StreamGetSplits: (string | string[])[];
};
