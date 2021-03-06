module.exports = {
  types: [
    { value: 'feat', name: 'โจ feat:       A new feature' },
    { value: 'fix', name: '๐ง fix:        A bug fix' },
    { value: 'docs', name: '๐ docs:       Documentation only changes' },
    { value: 'style', name: '๐จ style:      Changes that do not affect the meaning of the code' },
    { value: 'refactor', name: 'โป๏ธ  refactor:   A code change that neither fixes a bug nor adds a feature' },
    { value: 'perf', name: '๐ perf:       A code change that improves performance' },
    { value: 'test', name: '๐งช test:       Adding missing or correcting existing tests' },
    { value: 'ci', name: '๐ท ci:         CI configuration related e.g. changes to k8s๏ผdocker configuration files' },
    { value: 'build', name: '๐ฆโ build:      Changes to the build process or auxiliary tools' },
    { value: 'chore', name: '๐ป chore:      chroe' },
    { value: 'revert', name: '๐ revert:     Reverts a previous commit' }
  ],
  scopes: [
    { name: 'docs' },
    { name: 'ci' },
    { name: 'style' },
  ],

  // allowTicketNumber: false,
  // isTicketNumberRequired: false,
  // ticketNumberPrefix: 'TICKET-',
  // ticketNumberRegExp: '\\d{1,5}',

  // it needs to match the value for field type. Eg.: 'fix'
  // ๅฝ type ไธบ fix ๆถ๏ผ้ๅ scopes ็ๅผ
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
}
