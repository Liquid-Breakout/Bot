"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapReader = wrapReader;
function wrapReader(dbName, readerInitializer, autoUpdater) {
  // ugly typings, but this is quite the hack so typescript would lose it!
  let reader = {};
  const proxy = new Proxy({}, {
    get: (_, prop) => {
      if (prop === 'close') {
        return (...args) => {
          var _a;
          autoUpdater.close();
          (_a = reader.close) === null || _a === void 0 ? void 0 : _a.call(reader, ...args);
        };
      }
      return reader[prop];
    },
    set: (_, prop, value) => {
      reader[prop] = value;
      return true;
    }
  });
  return new Promise(resolve => {
    autoUpdater.once('check-ok', async paths => {
      const dbPath = paths[dbName];
      reader = await readerInitializer(dbPath);
      setImmediate(() => {
        autoUpdater.on('updated', async paths => {
          const dbPath = paths[dbName];
          reader = await readerInitializer(dbPath);
        });
      });
      resolve(proxy);
    });
  });
}