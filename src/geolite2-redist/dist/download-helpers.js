"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cleanupHotDownloadDir = cleanupHotDownloadDir;
exports.computeLocalChecksums = computeLocalChecksums;
exports.downloadDatabases = downloadDatabases;
exports.fetchChecksums = fetchChecksums;
exports.verifyChecksums = verifyChecksums;
var _nodeUtil = require("node:util");
var _nodeUrl = require("node:url");
var _nodePath = _interopRequireDefault(require("node:path"));
var _nodeFs = _interopRequireDefault(require("node:fs"));
var _nodeStream = _interopRequireDefault(require("node:stream"));
var _nodeCrypto = _interopRequireDefault(require("node:crypto"));
var _rimraf = _interopRequireDefault(require("rimraf"));
var _tar = _interopRequireDefault(require("tar"));
var _tsHelpers = require("./ts-helpers.js");
var _primitives = require("./primitives.js");
var Logger = require("../../Logger.js")
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const REDIST_MIRROR_URL = 'https://raw.githubusercontent.com/GitSquared/node-geolite2-redist/master/redist/';
const pRimraf = (0, _nodeUtil.promisify)(_rimraf.default);
const mirrorUrls = {
  checksum: (0, _tsHelpers.buildObjectFromEntries)(Object.values(_primitives.GeoIpDbName).map(dbName => [dbName, `${REDIST_MIRROR_URL}${dbName}.mmdb.sha384`])),
  download: (0, _tsHelpers.buildObjectFromEntries)(Object.values(_primitives.GeoIpDbName).map(dbName => [dbName, `${REDIST_MIRROR_URL}${dbName}.tar.gz`]))
};
const defaultTargetDownloadDir = _nodePath.default.resolve(__dirname, '..', 'dbs');
async function cleanupHotDownloadDir(dirPath) {
  return pRimraf(dirPath !== null && dirPath !== void 0 ? dirPath : defaultTargetDownloadDir + '.geodownload', {
    disableGlob: true
  });
}
async function fetchChecksums(dbList) {
  const dbListToFetch = dbList !== null && dbList !== void 0 ? dbList : Object.values(_primitives.GeoIpDbName);
  const checksums = await Promise.all(dbListToFetch.map(async dbName => [dbName, await Promise.resolve().then(() => _interopRequireWildcard(require('got-cjs'))).then(({
    got
  }) => got(mirrorUrls.checksum[dbName]).text()).then(checksum => checksum.trim())]));
  return (0, _tsHelpers.buildObjectFromEntries)(checksums);
}
async function computeLocalChecksums(dbList, customStorageDir) {
  const dbListToCheck = dbList !== null && dbList !== void 0 ? dbList : Object.values(_primitives.GeoIpDbName);
  const storageDir = customStorageDir !== null && customStorageDir !== void 0 ? customStorageDir : defaultTargetDownloadDir;
  const checksums = await Promise.all(dbListToCheck.map(async dbName => [dbName, await (0, _nodeUtil.promisify)(_nodeFs.default.readFile)(_nodePath.default.join(storageDir, `${dbName}.mmdb`)).then(buffer => _nodeCrypto.default.createHash('sha384').update(buffer).digest('hex'))]));
  return (0, _tsHelpers.buildObjectFromEntries)(checksums);
}
async function verifyChecksums(dbList, customStorageDir) {
  const [remote, local] = await Promise.all([fetchChecksums(dbList), computeLocalChecksums(dbList, customStorageDir)]);
  for (const db in local) {
    if (remote[db] !== local[db]) {
      //throw new Error(`Checksum mismatch for ${db}`);
      Logger.Warn(`${db} might be out of date!`);
    }
  }
  const dbListToMap = dbList !== null && dbList !== void 0 ? dbList : Object.values(_primitives.GeoIpDbName);
  return (0, _tsHelpers.buildObjectFromEntries)(dbListToMap.map(dbName => [dbName, _nodePath.default.join(customStorageDir !== null && customStorageDir !== void 0 ? customStorageDir : defaultTargetDownloadDir, `${dbName}.mmdb`)]));
}
async function downloadDatabases(dbList, customStorageDir) {
  const dbListToFetch = dbList !== null && dbList !== void 0 ? dbList : Object.values(_primitives.GeoIpDbName);
  const targetDownloadDir = customStorageDir !== null && customStorageDir !== void 0 ? customStorageDir : defaultTargetDownloadDir;
  const hotDownloadDir = targetDownloadDir + '.geodownload';
  await cleanupHotDownloadDir(hotDownloadDir);
  try {
    _nodeFs.default.mkdirSync(targetDownloadDir, { recursive: true });
  } catch (e) {
    if (e.code !== 'EEXIST') throw e;
  }
  try {
    _nodeFs.default.mkdirSync(hotDownloadDir, { recursive: true });
  } catch (e) {
    if (e.code !== 'EEXIST') throw e;
  }
  const pipeline = (0, _nodeUtil.promisify)(_nodeStream.default.pipeline);
  const downloadedPaths = await Promise.all(dbListToFetch.map(async dbName => [dbName, await (async () => {
    const hotDownloadPath = _nodePath.default.join(hotDownloadDir, `${dbName}.mmdb`);
    const coldCachePath = _nodePath.default.join(targetDownloadDir, `${dbName}.mmdb`);
    const {
      got
    } = await Promise.resolve().then(() => _interopRequireWildcard(require('got-cjs')));
    await pipeline(got.stream(mirrorUrls.download[dbName]), _tar.default.x({
      cwd: hotDownloadDir,
      filter: entryPath => _nodePath.default.basename(entryPath) === `${dbName}.mmdb`,
      strip: 1
    }));
    _nodeFs.default.renameSync(hotDownloadPath, coldCachePath);
    return coldCachePath;
  })()]));
  await cleanupHotDownloadDir(hotDownloadDir);
  return (0, _tsHelpers.buildObjectFromEntries)(downloadedPaths);
}