const fs = require('fs')

const excludes = [
  '评论',
  '题解',
  '提交记录',
  '贡献者',
  '相关企业',
  '相关标签',
  '显示提示'
]

function saveCode({title, desc, code, codeId = 'spe'}) {
  const dirName = `exercise${codeId}`
  const fileName = `main.js`
  const explain = desc
    .split('\n')
    .filter(line => !excludes.some(item => line.startsWith(item)))
    .map(line => '// ' + line)
    .join('\n')

  // const content = `// ${title}\n${explain}\n\n${code}`
  const content = `${explain}\n\n`

  try {
    fs.mkdirSync(dirName)
  } catch (e) {
    //
  } finally {
    fs.writeFileSync(dirName + '/' + fileName, content)
  }
}

module.exports = saveCode
