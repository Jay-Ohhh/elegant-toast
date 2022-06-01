import { IConfig } from '@umijs/types';
import { components } from './components';
import OpenBrowserPlugin from 'open-browser-webpack-plugin';

const githubPath = 'https://github.com/Jay-Ohhh/elegant-toast';

const config: IConfig = {
  title: 'elegant-toast',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  hash: true, // 配置是否让生成的文件包含 hash 后缀，通常用于增量发布和避免浏览器加载缓存
  // more config: https://d.umijs.org/config
  fastRefresh: {}, // 开发环境下，可以保持组件状态，同时编辑提供即时反馈

  navs: {
    'zh-CN': [
      // null, // null 值代表保留约定式生成的导航，只做增量配置
      { title: 'Components', path: '/zh-CN/components' },
      {
        title: 'GitHub',
        path: githubPath,
      },
    ],
    'en-US': [
      // null, // null 值代表保留约定式生成的导航，只做增量配置
      { title: 'Components', path: '/components' },
      {
        title: 'GitHub',
        path: githubPath,
      },
    ],
  },

  menus: {
    '/': [
      {
        title: 'Home',
        path: 'index',
      },
    ],
    '/zh-CN': [
      {
        title: '首页',
        path: 'index',
      },
    ],
    '/components': components,
    '/zh-CN/components': components,
  },
  // 配置具体含义见：https://github.com/umijs/umi-webpack-bundle-analyzer#options-for-plugin
  analyze: {
    analyzerMode: 'server',
    analyzerPort: 8888,
    openAnalyzer: true,
    // generate stats file while ANALYZE_DUMP exist
    generateStatsFile: false,
    statsFilename: 'stats.json',
    logLevel: 'info',
    defaultSizes: 'parsed', // stat  // gzip
  },
  devServer: {
    port: 8081,
  },
  chainWebpack(memo, { env, webpack, createCSSRule }) {
    if (env === 'development') {
      memo.plugin('openBrowser').use(OpenBrowserPlugin, [
        {
          url: 'http://localhost:8081',
        },
      ]);
    }
  },
};

export default config;
