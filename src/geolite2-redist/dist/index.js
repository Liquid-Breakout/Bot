"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "GeoIpDbName", {
  enumerable: true,
  get: function () {
    return _primitives.GeoIpDbName;
  }
});
exports.downloadDbs = downloadDbs;
exports.open = open;
var _autoUpdater = require("./auto-updater.js");
var _downloadHelpers = require("./download-helpers.js");
var _readerWrapper = require("./reader-wrapper.js");
var _primitives = require("./primitives.js");
/**
    Updates the local copy of the selected GeoLite databases, downloading new files if needed, or performing checksum validation of exiting ones.

    @param options - Configuration options.

    @param options.dbList - The list of databases to download. You can find available databases in the {@linkcode GeoIpDbName} enum or use string names directly in JS. Defaults to downloading all the databases.

    @param options.path - The path to the directory where the databases will be downloaded and stored. Defaults to `./node_modules/node-geolite2-redist/dbs`.

    @returns A Promise that resolves when the databases have been successfully downloaded, and rejects otherwise.
*/
async function downloadDbs(options) {
  try {
    await (0, _downloadHelpers.verifyChecksums)(options === null || options === void 0 ? void 0 : options.dbList, options === null || options === void 0 ? void 0 : options.path);
  } catch (err) {
    if (!err.message.startsWith('Checksum mismatch') && !(err.code === 'ENOENT')) throw err;
    await (0, _downloadHelpers.downloadDatabases)(options === null || options === void 0 ? void 0 : options.dbList, options === null || options === void 0 ? void 0 : options.path);
  }
}
/**
    Pre-fetches databases from the mirror.

    @typeParam DbReaderInstance - The type of a database reader instance. You can either supply it manually or let Typescript infer it from the `readerInitializer` param.

    @param dbName - The database to open. You can find available databases in the {@linkcode GeoIpDbName} enum or use string names directly in JS. Will be downloaded if it hasn't already been fetched (see {@linkcode downloadDbs} to pre-fetch at an earlier time).

    @param readerInitializer - A function that takes the absolute path to the downloaded `.mmmdb` database and returns a new `DbReaderInstance`. You need to supply it to this library so we can re-initialize your reader when the databases are auto-updated.

    @param downloadDirPath - The path to the directory where the database should be stored. Defaults to `./node_modules/node-geolite2-redist/dbs`. See {@linkcode downloadDbs} for more information.

    @returns A Promise that resolves with your reader instance when the databases have been successfully downloaded and your reader initialized. Calling `.close()` on the reader will gracefully stop the background databases auto-updater, and run the reader's actual `close()` method if there is one, supporting arguments passthrough.
*/
async function open(dbName, readerInitializer, downloadDirPath) {
  const autoUpdater = new _autoUpdater.AutoUpdater([dbName], downloadDirPath);
  const wrappedReader = await (0, _readerWrapper.wrapReader)(dbName, readerInitializer, autoUpdater);
  return wrappedReader;
}