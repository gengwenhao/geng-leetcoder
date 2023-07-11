const {spawn} = require('child_process')

const gitCommit = (message) => {
  return new Promise((resolve, reject) => {
    const git = spawn('git', ['commit', '-m', message])
    git.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    git.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`)
    })

    git.on('close', (code) => {
      if (code !== 0) {
        console.error(`Git commit process exited with code ${code}`)
      } else {
        console.log(`Git commit successful!`)
        resolve()
      }
    })
  })
}

// Usage:
// gitClone('https://github.com/xxx/xxx.git', './test/path');

module.exports = gitCommit
