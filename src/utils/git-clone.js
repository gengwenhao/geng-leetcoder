import {spawn} from 'child_process'

export const gitClone = (url, localPath, showTips = true) => {
  return new Promise((resolve) => {
    const git = spawn('git', ['clone', url, localPath])

    git.stdout.on('data', (data) => {
      showTips && console.log(`${data}`)
    })

    git.stderr.on('data', (data) => {
      showTips && console.error(`${data}`)
    })

    git.on('close', (code) => {
      if (code !== 0) {
        console.error(`Git clone process exited with code ${code}`)
      } else {
        showTips && console.log(`Git clone successful!`)
        resolve()
      }
    })
  })
}

// Usage:
// gitClone('https://github.com/xxx/xxx.git', './test/path');

