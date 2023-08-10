const nexe = require("nexe");
const binaryName = process.argv[2] || "LBBackend_General";

(async () => {
    await nexe.compile({
        input: "app/js/index.js",
        build: true,
        output: `binary/${binaryName}`,
        resources: ["app/js/**/*.js", "app/dev_config/.env"],
    })
})();