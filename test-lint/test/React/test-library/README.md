# test-libray

> [React test library](https://testing-library.com/docs/react-testing-library/intro) Demo

- [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro)
- [@testing-library/react-hooks](https://react-hooks-testing-library.com/)

## install

```bash
# react
yarn add react react-dom

# ts
yarn add typescript
yarn add @types/node @types/react @types/react-dom --dev

# less
yarn add less postcss --dev 

# 编译
yarn add @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript --dev
yarn add core-js @babel/plugin-transform-runtime @babel/runtime @babel/runtime-corejs3 --dev

# browserslist
yarn add browserslist --dev

# lint
yarn add @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-airbnb-base eslint-config-airbnb-typescript eslint-config-prettier eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y --dev

yarn add prettier stylelint-config-prettier eslint-config-prettier --dev

yarn add stylelint stylelint-config-rational-order stylelint-config-standard stylelint-declaration-block-no-ignored-properties stylelint-order --dev

yarn add @commitlint/cli @commitlint/config-conventional --dev

# rollup
yarn add rollup rollup-plugin-filesize rollup-plugin-postcss rollup-plugin-terser @rollup/plugin-commonjs @rollup/plugin-node-resolve @rollup/plugin-replace @rollup/plugin-typescript --dev

# husky
yarn add husky is-ci lint-staged --dev

# test
yarn add jest babel-jest ts-jest jest-resolve @types/jest --dev 
yarn add @testing-library/jest-dom @testing-library/react @testing-library/user-event --dev 
yarn add identity-obj-proxy eslint-plugin-jest --dev 

```

## guide

1、`@testing-library/jest-dom`添加了一些额外的匹配器，用来测试dom, 需要将它加入`jest`的配置，同时将jest环境设置为`jsdom`

```js
module.exports = {
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  testEnvironment: "jsdom",
};
```
