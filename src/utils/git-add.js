const {spawn} = require('child_process')

const gitAdd = (path = '.') => {
  return new Promise((resolve) => {
    const git = spawn('git', ['add', path])

    git.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`)
    })

    git.on('close', (code) => {
      if (code !== 0) {
        console.error(`Git commit process exited with code ${code}`)
      } else {
        console.log(`Git add successful!`)
        resolve()
      }
    })
  })
}

// Usage:
// gitClone('https://github.com/xxx/xxx.git', './test/path');

module.exports = gitAdd
