#!/usr/bin/env node
const {program} = require('commander')

program
  .name('小耿用来辅助刷题的CLI')
  .version('0.1.0')
  .option('--first')
  .option('-s, --separator <char>')

// 初始化本地代码仓库
program
  .command('init')
  .alias('i')
  .help('初始化我的本地代码练习仓库')
  .action(() => {
    console.log('git clone')
  })

// 搜索题目
program
  .command('search')
  .alias('s')
  .help('搜索 leetcode 练习题目')
  .argument('<string>', '搜索相关的 leetcode 练习题目')
  .action(() => {
    console.log('获取最新刷题记录')
  })

// 获取题目
program
  .command('get')
  .alias('g')
  .help('根据题号获取 leetcode 练习题目')
  .argument('<number>', '根据题号获取 leetcode 练习题目')
  .action(() => {
    console.log('获取最新刷题记录')
  })

// 提交题目
program
  .command('submit')
  .help('提交题目')
  .argument('<number>', '提交题目')
  .action(() => {
    console.log('提交题目')
  })

program.parse()

