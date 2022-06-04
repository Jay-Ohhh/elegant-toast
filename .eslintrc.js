module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {  // 解析器选项
    "ecmaVersion": 2019, // 支持 ES6 语法并不意味着同时支持新的 ES6 全局变量或类型（比如 Set 等新类型），需{ "env":{ "es6": true } }
    "sourceType": "module", //  "script" (默认)，如果代码是 ECMAScript 模块，设置为"module"
    "ecmaFeatures": {
      "jsx": true
    }
  },
  env: {                          // 指定代码的运行环境
    browser: true,
    es6: true,
    node: true,
  },
  // 全局变量
  globals: {
  },
  settings: {
    // eslint-plugin-react要求：https://www.npmjs.com/package/eslint-plugin-react
    "react": {
      "pragma": "React",
      "version": "detect"
    }
  },
  // 扩展（或覆盖）规则
  rules: {

  },
}
