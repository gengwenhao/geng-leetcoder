// 获取 leetcode 代码
const crawlLeetcode = require('../../utils/crawl')

module.exports = function (program) {
  program
    .command('get <code_or_name>')
    .description('根据 leetcode 题号或名称，获取代码')
    .action((codeOrName) => {
      crawlLeetcode(codeOrName)
    })
}
