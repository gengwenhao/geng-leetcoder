import * as fs from 'fs'

const excludes = [
  '评论',
  '题解',
  '提交记录',
  '贡献者',
  '相关企业',
  '相关标签',
  '显示提示',
  '相似题目',
  '©'
]

export default function saveCode({title, url, desc, code, codeId = 'spe'}) {
  const dirName = `exercise${codeId}`
  const fileName = `main.js`
  const explain = desc
    .split('\n')
    .filter(line => !excludes.some(item => line.startsWith(item)))
    .map(line => '// ' + line)
    .join('\n')

  const content = `${explain}\n// ${url}\n\n${code}`

  try {
    fs.mkdirSync(dirName)
  } catch (e) {
    //
  } finally {
    fs.writeFileSync(dirName + '/' + fileName, content)
  }
}

