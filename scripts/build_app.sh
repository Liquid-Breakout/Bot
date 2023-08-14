mkdir -p app/js
mkdir -p app/dev_config
cp -r build/* app/js
mkdir -p app/js/geolite2-redist/dbs
cp -r src/geolite2-redist/dbs/* app/js/geolite2-redist/dbs
#find app/js -type f -name '*.d.ts' -exec "rm -r {}" \; only if using tsc
rm -r build
#npx javascript-obfuscator app/js --target node --output app/js