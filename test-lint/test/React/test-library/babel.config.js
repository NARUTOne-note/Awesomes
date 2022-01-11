module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
          useBuiltIns: 'usage',
          corejs: 3,
        },
      ],
      '@babel/preset-react',
    ],
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          corejs: 3,
        },
      ],
      [
        "import",
        [
          { "libraryName": "antd", "libraryDirectory": "lib", "style": true },
          {
            "libraryName": "@ant-design/icons",
            "libraryDirectory": "es/icons",
            "camel2DashComponentName": false
          }
        ]
      ]
    ]
  }
}
