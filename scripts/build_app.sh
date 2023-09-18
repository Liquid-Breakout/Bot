mkdir -p app/js
mkdir -p app/dev_config
cp -r build/* app/js
mkdir -p app/js/CompatibilityModules/geolite2-redist/dbs
cp -r src/CompatibilityModules/geolite2-redist/dbs/* app/js/CompatibilityModules/geolite2-redist/dbs
rm -r build