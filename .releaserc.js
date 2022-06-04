module.exports = {
  branches: [ // 指定在哪个分支下要执行发布操作
    'master',
    {
      name: 'beta', prerelease: true // beta 分支为 预发布 分支 2.0.0-beta.1, 2.0.0-beta.2, etc...
    }
  ],
  plugins: [ // 插件有顺序要求
    [
      '@semantic-release/commit-analyzer', // semantic-release plugin to analyze commits with conventional-changelog
      {
        preset: "conventionalcommits", // 需安装 conventional-changelog-conventionalcommits
        // 没列在这里或者不在 default release rules(https://github.com/semantic-release/commit-analyzer/blob/master/lib/default-release-rules.js) 里的规则，不会进行 release
        "releaseRules": [
          { type: 'feat', release: 'minor' },
          { type: 'fix', release: 'patch' },
          { type: 'perf', release: 'patch' },
          { type: 'style', release: 'patch' },
          { type: 'revert', release: 'patch' },
          { breaking: true, release: 'major' }, // https://www.conventionalcommits.org/en a commit that has a footer BREAKING  CHANGE: 
        ],
        "parserOpts": {
          "noteKeywords": ["BREAKING CHANGE", "BREAKING CHANGES"] // the commits that contains BREAKING CHANGE, BREAKING CHANGES or BREAKING in their body will be considered breaking changes(by default the angular preset checks only for BREAKING CHANGE and BREAKING CHANGES)
        }
      }
    ],
    ['@semantic-release/release-notes-generator', // semantic-release plugin to generate changelog content(非文件) with conventional-changelog
      {
        preset: "conventionalcommits",
        presetConfig: { // Conventional Changelog Configuration Spec, https://github.com/conventional-changelog/conventional-changelog-config-spec
          "types": [
            { "type": "feat", "section": "✨ Features | 新功能" },
            { "type": "fix", "section": "🛠️ Bug Fixes | Bug 修复" },
            { "type": "docs", "section": "📝 Documentation | 文档" },
            { "type": "style", "section": "🎨 Styles | 风格" },
            { "type": "refactor", "section": "♻️ Code Refactoring | 代码重构" },
            { "type": "perf", "section": "🚀 Performance Improvements | 性能优化" },
            { "type": "test", "section": "📸 Tests | 测试" },
            { "type": "build", "section": "📦‍ Build System | 打包构建" },
            { "type": "ci", "section": "🐳 Continuous Integration | CI 配置" },
            { "type": "chore", "section": "🍮 Chore | 构建/工程依赖/工具" },
            { "type": "revert", "section": "💊 Revert | 回退" }
          ]
        }
      }
    ],
    [
      '@semantic-release/changelog', // semantic-release plugin to create or update a changelog file
      {
        changelogFile: 'CHANGELOG.md'
      }
    ],
    // 需要NPM_TOKEN，命令行cross-env、或 .npmrc 文件 或在 github actions中定义
    // 根据commit type，Update the package.json version
    '@semantic-release/npm',  // semantic-release plugin to publish a npm package.
    // 需要GITHUB_TOKEN
    [
      '@semantic-release/github', // 创建 github-release
      {
        labels: false // The labels to add to the issue created when a release fails. Set to false to not add any label.
      }
    ],
    [
      '@semantic-release/git', // semantic-release plugin to commit release assets to the project's git repository.
      {
        assets: ['CHANGELOG.md', 'package.json'],
        message: "🍺 chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
      }
    ]
  ]
}
