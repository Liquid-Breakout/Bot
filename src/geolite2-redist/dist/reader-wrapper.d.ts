import type { AutoUpdater } from './auto-updater.js';
import type { GeoIpDbName, Path } from './primitives.js';
export declare type WrappedReader<Reader extends Record<string, unknown>> = Reader & {
    close: Reader['close'] extends (...args: unknown[]) => unknown ? Reader['close'] : () => void;
};
export declare function wrapReader<DbReaderInstance extends Record<string, unknown>>(dbName: GeoIpDbName, readerInitializer: (path: Path) => DbReaderInstance | Promise<DbReaderInstance>, autoUpdater: AutoUpdater): Promise<WrappedReader<DbReaderInstance>>;
