/// <reference types="node" />
import { EventEmitter } from 'node:events';
import { GeoIpDbName, Path } from './primitives.js';
export declare class AutoUpdater extends EventEmitter {
    #private;
    dbList: GeoIpDbName[];
    customStorageDir: string | undefined;
    checkingForUpdates: boolean;
    downloading: boolean;
    constructor(dbList?: GeoIpDbName[], customStorageDir?: Path);
    checkForUpdates(secondRun?: boolean): Promise<void>;
    update(): Promise<void>;
    close(): void;
}
