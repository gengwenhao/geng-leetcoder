// 提交代码
const gitClone = require('../../utils/git-clone')

module.exports = function (program) {
  program
    .command('init')
    .description('建立本地代码练习项目')
    .option('-u, --url <string>', '仓库地址', 'https://gitee.com/gengwenhao/offer2.git')
    .option('-d, --dir <string>', '项目名称', 'offer2')
    .action((options) => {
      gitClone(options.url, options.dir, false).then(() => {
        console.log(`本地代码练习项目 ${options.dir} 创建完成!`)
      })
    })
}
