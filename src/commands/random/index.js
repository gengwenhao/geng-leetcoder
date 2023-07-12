// 随机获取 leetcode 代码
import crawlLeetcode from '../../utils/crawl.js'
import chalk from 'chalk'
import logSymbols from 'log-symbols'
import ora from 'ora'

const tags = {
  'dp': '&topicSlugs=dynamic-programming',
  'DP': '&topicSlugs=dynamic-programming',
  '动态规划': '&topicSlugs=dynamic-programming',

  'prefix-sum': '&topicSlugs=prefix-sum',
  'prefix': '&topicSlugs=prefix-sum',
  '前缀和': '&topicSlugs=prefix-sum',

  'sliding-window': '&topicSlugs=sliding-window',
  'window': '&topicSlugs=sliding-window',
  '滑动窗口': '&topicSlugs=sliding-window',

  'string': '&topicSlugs=string',
  'String': '&topicSlugs=string',
  '字符串': '&topicSlugs=string',
  '串': '&topicSlugs=string',

  'array': '&topicSlugs=array',
  'Array': '&topicSlugs=array',
  '数组': '&topicSlugs=array',

  'binary-tree': '&topicSlugs=binary-tree',
  'binarytree': '&topicSlugs=binary-tree',
  'BINARYTREE': '&topicSlugs=binary-tree',
  'BT': '&topicSlugs=binary-tree',
  'binary': '&topicSlugs=binary-tree',
  'btree': '&topicSlugs=binary-tree',
  '二叉树': '&topicSlugs=binary-tree',

  'two-pointers': '&topicSlugs=two-pointers',
  'two-pointer': '&topicSlugs=two-pointers',
  'twopointers': '&topicSlugs=two-pointers',
  'twopointer': '&topicSlugs=two-pointers',
  'pointers': '&topicSlugs=two-pointers',
  'pointer': '&topicSlugs=two-pointers',
  'Pointer': '&topicSlugs=two-pointers',
  '双指针': '&topicSlugs=two-pointers',

  'bit': '&topicSlugs=bit-manipulation',
  'Bit': '&topicSlugs=bit-manipulation',
  'bit-manipulation': '&topicSlugs=bit-manipulation',
  'bitmanipulation': '&topicSlugs=bit-manipulation',
  'Bit-Manipulation': '&topicSlugs=bit-manipulation',
  'BitManipulation': '&topicSlugs=bit-manipulation',
  '与': '&topicSlugs=bit-manipulation',
  '异或': '&topicSlugs=bit-manipulation',
  '位': '&topicSlugs=bit-manipulation',
  '位运算': '&topicSlugs=bit-manipulation',
}

const difficulty = {
  0: '&difficulty=EASY',
  '容易': '&difficulty=EASY',
  '简单': '&difficulty=EASY',
  'easy': '&difficulty=EASY',
  'e': '&difficulty=EASY',

  1: '&difficulty=MEDIUM',
  '一般': '&difficulty=MEDIUM',
  '中等': '&difficulty=MEDIUM',
  'medium': '&difficulty=MEDIUM',
  'm': '&difficulty=MEDIUM',

  2: '&difficulty=HARD',
  '困难': '&difficulty=HARD',
  '高级': '&difficulty=HARD',
  'hard': '&difficulty=HARD',
  'h': '&difficulty=HARD'
}

export default function (program) {
  program
    .command('random')
    .description('随机获取代码')
    .option('-t, --tag <string>', '随机获取练习题目')
    .option('-l, --level <string>', '难度')
    .action((options) => {
      const n = Math.floor(Math.random() * 100)
      let codeName = '&search=' + n
      codeName += (difficulty[options.level] || '')
      codeName += (tags[options.tag] || '')

      const spinner = ora('获取题目内容...').start()
      crawlLeetcode(codeName)
        .then(({title = '', url = ''}) => {
          spinner.succeed('获取完成')
          url && console.log(chalk.redBright(url))
          console.log(chalk.bgGreenBright.bold(`${logSymbols.success} ${title} `))
        }, (err) => {
          spinner.fail('获取失败')
        })
    })
}
