// 提交代码
import {gitClone} from '../../utils/git-clone.js'
import ora from 'ora'
import chalk from 'chalk'
import logSymbols from 'log-symbols'

export default function (program) {
  program
    .command('init')
    .description('建立本地代码练习项目')
    .option('-u, --url <string>', '仓库地址', 'https://gitee.com/gengwenhao/offer2.git')
    .option('-d, --dir <string>', '项目名称', 'offer2')
    .action((options) => {
      const spinner = ora('克隆仓库中...').start()
      gitClone(options.url, options.dir, false).then(() => {
        spinner.succeed('克隆完成')
        console.log(chalk.bgRedBright.bold(`${logSymbols.success} 本地项目 ${options.dir} 创建完成!`))
      })
    })
}
