"use strict";
/**
 * Created by scarboni on 24.12.2020
 */
class FfiFunDeclarations {
    add(lib, ffiFunDeclarations) {
        if (this[lib])
            this[lib] = Object.assign(Object.assign({}, this[lib]), ffiFunDeclarations);
        else
            this[lib] = ffiFunDeclarations;
    }
    get(lib) {
        return this[lib];
    }
}
exports = module.exports = new FfiFunDeclarations();
