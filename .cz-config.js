module.exports = {
  types: [
    { value: '✨ feat', name: '✨ feat:       A new feature' },
    { value: '🔧 fix', name: '🔧 fix:        A bug fix' },
    { value: '📝 docs', name: '📝 docs:       Documentation only changes' },
    { value: '🎨 style', name: '🎨 style:      Changes that do not affect the meaning of the code' },
    { value: '♻️ refactor', name: '♻️  refactor:   A code change that neither fixes a bug nor adds a feature' },
    { value: '🚀 perf', name: '🚀 perf:       A code change that improves performance' },
    { value: '🧪 test', name: '🧪 test:       Adding missing or correcting existing tests' },
    { value: '👷 ci', name: '👷 ci:         CI configuration related e.g. changes to k8s，docker configuration files' },
    { value: '📦‍ build', name: '📦‍ build:      Changes to the build process or auxiliary tools' },
    { value: '🍻 chore', name: '🍻 chore:      chroe' },
    { value: '💊 revert', name: '💊 revert:     Reverts a previous commi' },
  ],
  scopes: [{ name: 'docs' }, { name: 'ci' }, { name: 'style' }],

  // allowTicketNumber: false,
  // isTicketNumberRequired: false,
  // ticketNumberPrefix: 'TICKET-',
  // ticketNumberRegExp: '\\d{1,5}',

  // it needs to match the value for field type. Eg.: 'fix'
  // 当 type 为 fix 时，重写 scopes 的值
  /*  scopeOverrides: {
    fix: [
      {name: 'merge'},
      {name: 'style'},
      {name: 'e2eTest'},
      {name: 'unitTest'}
    ]
  },  */
  // override the messages, defaults are as follows
  messages: {
    type: "Select the type of change that you're committing:",
    scope: 'Denote the SCOPE of this change (optional):',
    // used if allowCustomScopes is true
    customScope: 'Denote the SCOPE of this change:',
    subject: 'Write a SHORT, IMPERATIVE tense description of the change:\n',
    body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
    breaking: 'List any BREAKING CHANGES (optional):\n',
    footer: 'List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n',
    confirmCommit: 'Are you sure you want to proceed with the commit above?',
  },
  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  subjectLimit: 100,
  // skip any questions you want
  // skipQuestions: ['body'],
  // limit subject length
  // breaklineChar: '|', // It is supported for fields body and footer.
  // footerPrefix : 'ISSUES CLOSED:'
  // askForBreakingChangeFirst : true, // default is false
};
