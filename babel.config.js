module.exports = function (api) {
    api.cache(false);
    return {
      presets: [
        [
          "@babel/preset-env",
            {
                "useBuiltIns": "entry",
                "corejs": "3.22"
            }
        ], 
        "@babel/preset-typescript"
      ]
    };
  }