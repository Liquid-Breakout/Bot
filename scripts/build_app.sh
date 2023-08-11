mkdir -p app/js
mkdir -p app/dev_config
cp -r build/* app/js
#find app/js -type f -name '*.d.ts' -exec "rm -r {}" \; only if using tsc
rm -r build
#npx javascript-obfuscator app/js --target node --output app/js