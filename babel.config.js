module.exports = {
    presets: [
      "@babel/preset-env",
      "@babel/preset-react"
    ],
    plugins: [
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-transform-runtime"
    ],
    env: {
      test: {
        presets: [
          ["@babel/preset-env", { targets: { node: "current" } }]
        ],
        plugins: [
          "dynamic-import-node" 
        ]
      }
    }
  };
  