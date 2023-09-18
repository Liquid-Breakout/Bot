"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoUpdater = void 0;
var _nodeEvents = require("node:events");
var _downloadHelpers = require("./download-helpers.js");
var _primitives = require("./primitives.js");
var __classPrivateFieldSet = void 0 && (void 0).__classPrivateFieldSet || function (receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet = void 0 && (void 0).__classPrivateFieldGet || function (receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _AutoUpdater_checker;
const updateTimer = 2 * 24 * 60 * 60 * 1000; // 48 hours in ms
class AutoUpdater extends _nodeEvents.EventEmitter {
  constructor(dbList, customStorageDir) {
    super();
    Object.defineProperty(this, "dbList", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: [_primitives.GeoIpDbName.ASN, _primitives.GeoIpDbName.Country, _primitives.GeoIpDbName.City]
    });
    Object.defineProperty(this, "customStorageDir", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "checkingForUpdates", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false
    });
    Object.defineProperty(this, "downloading", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false
    });
    _AutoUpdater_checker.set(this, void 0);
    if (dbList) this.dbList = dbList;
    if (customStorageDir) this.customStorageDir = customStorageDir;
    (0, _downloadHelpers.cleanupHotDownloadDir)();
    __classPrivateFieldSet(this, _AutoUpdater_checker, setInterval(this.checkForUpdates.bind(this), updateTimer), "f");
    // Schedule first update check
    setTimeout(this.checkForUpdates.bind(this), 500);
    return this;
  }
  async checkForUpdates(secondRun = false) {
    if (this.checkingForUpdates) return;
    this.checkingForUpdates = true;
    try {
      const paths = await (0, _downloadHelpers.verifyChecksums)(this.dbList, this.customStorageDir);
      this.emit('check-ok', paths);
    } catch (err) {
      if (secondRun) throw err;
      if (!err.message.startsWith('Checksum mismatch') && !(err.code === 'ENOENT')) throw err;
      this.update();
    } finally {
      this.checkingForUpdates = false;
    }
  }
  async update() {
    if (this.downloading) return;
    this.downloading = true;
    try {
      const paths = await (0, _downloadHelpers.downloadDatabases)(this.dbList, this.customStorageDir);
      await this.checkForUpdates(true);
      this.emit('updated', paths);
    } catch (err) {
      throw err;
    } finally {
      (0, _downloadHelpers.cleanupHotDownloadDir)();
      this.downloading = false;
    }
  }
  close() {
    clearInterval(__classPrivateFieldGet(this, _AutoUpdater_checker, "f"));
    super.removeAllListeners();
  }
}
exports.AutoUpdater = AutoUpdater;
_AutoUpdater_checker = new WeakMap();