export = getPlatformDependencies;
declare function getPlatformDependencies(): {
    path: string;
    libFiles: {
        bass: libFile;
        mixer: libFile;
        encoder: libFile;
        encMP3: libFile;
        tags: libFile;
    };
    addonsEncodings: string[];
} | null;
import libFile = require("./libFile");
