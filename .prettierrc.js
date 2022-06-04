module.exports = {
  printWidth: 120, // 行长
  tabWidth: 2, // 缩进长度
  useTabs: false, //使用空格代替tab缩进
  semi: true, // 结尾分号
  singleQuote: true, // 单引号，jsx忽略此选项，请使用 jsxSingleQuote
  quoteProps: 'preserve', // <as-needed|consistent|preserve> 是否给对象属性加引号 preserve：保留编程时的状态
  jsxSingleQuote: false, // jsx中使用单引号
  trailingComma: 'all', // <es5|none|all> 在对象或数组最后一个元素后面是否加逗号。all 尽可能尾随逗号
  bracketSpacing: true, //在对象前后添加空格-eg: { foo: bar }
  bracketSameLine: false, // 多属性html、jsx标签的‘>’折行放置
  arrowParens: 'avoid', // <always|avoid> avoid：单参数箭头函数参数不使用圆括号
  endOfLine: 'lf', // 结束行形式
  embeddedLanguageFormatting: 'auto', // 对引用代码进行格式化
};
