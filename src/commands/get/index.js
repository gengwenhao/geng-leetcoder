// 获取 leetcode 代码
import crawlLeetcode from '../../utils/crawl.js'
import chalk from 'chalk'
import logSymbols from 'log-symbols'
import ora from 'ora'

export default function (program) {
  program
    .command('get <code_or_name>')
    .description('根据 leetcode 题号或名称，获取代码')
    .action((codeOrName) => {
      const spinner = ora('获取题目内容...').start()
      crawlLeetcode(codeOrName).then(({title = ''}) => {
        spinner.succeed('获取完成')
        console.log(chalk.bgGreenBright.bold(`${logSymbols.success} ${title} `))
      })
    })
}
