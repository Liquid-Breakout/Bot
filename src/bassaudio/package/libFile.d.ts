export = libFile;
declare class libFile {
    constructor(id: any, name: any);
    id: any;
    name: any;
    dl: any;
    setPath(basePath: any): void;
    path: any;
    enable(dl: any): boolean;
    isEnabled(): boolean;
    disable(): void;
    tryFunc(fun: any, ...args: any[]): any;
    rawFunc(fun: any, ...args: any[]): any;
    setDebugData({ ffiFunDeclaration }: {
        ffiFunDeclaration: any;
    }): void;
    ffiFunDeclaration: any;
    basicGeneratedInputs: {} | undefined;
    getDebugData(): {
        ffiFunDeclaration: any;
        basicGeneratedInputs: {} | undefined;
    };
}
