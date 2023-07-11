const gitCommit = require('./git-commit')
const gitAdd = require('./git-add')
const gitPush = require('./git-push')

const gitAutoCommit = async (message) => {
  await gitAdd()
  await gitCommit()
  await gitPush()
}

// Usage:
// gitClone('https://github.com/xxx/xxx.git', './test/path');

module.exports = gitAutoCommit
