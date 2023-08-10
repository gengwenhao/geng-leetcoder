// 获取 leetcode 代码
import crawlLeetcode from '../../utils/crawl.js'
import chalk from 'chalk'
import logSymbols from 'log-symbols'
import ora from 'ora'

export default function (program) {
  program
    .command('get <code_or_name>')
    .option('-s, --screenshoot', '是否截图')
    .description('根据 leetcode 题号或名称，获取代码')
    .action((codeOrName, {screenshoot}) => {
      const spinner = ora('获取题目内容...').start()
      crawlLeetcode(codeOrName, screenshoot)
        .then(({title = '', url = ''}) => {
          spinner.succeed('获取完成')
          url && console.log(chalk.redBright(url))
          console.log(chalk.bgGreenBright.bold(`${logSymbols.success} ${title} `))
        }, (err) => {
          spinner.fail('获取失败')
        })
    })
}
