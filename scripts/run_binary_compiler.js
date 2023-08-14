const nexe = require("nexe");
const binaryName = process.argv[2] || "LBBackend_General";
const cpuTarget = process.argv[3] || "x64";

(async () => {
    await nexe.compile({
        input: "app/js/index.js",
        build: true,
        output: `binary/${binaryName}`,
        resources: ["app/js/**/*.js", "app/dev_config/.env", "node_modules/form-data-encoder/", "app/js/geolit2-redist/dbs/"],
        verbose: true
    })
})();