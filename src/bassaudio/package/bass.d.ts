export = Bass;
declare function Bass(options: any): void;
declare class Bass {
    constructor(options: any);
    basePath: string;
    addonsEncodings: string[];
    libFiles: {
        bass: libFile;
        mixer: libFile;
        encoder: libFile;
        encMP3: libFile;
        tags: libFile;
    };
    FfiFunDeclarationIndex: {
        add(lib: any, ffiFunDeclarations: any): void;
        get(lib: any): any;
    };
}
import libFile = require("./libFile.js");
