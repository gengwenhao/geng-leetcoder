#!/usr/bin/env node
const {program} = require('commander')
const commands = require('./commands')

program
  .name('小耿 leetcode 辅助刷题CLI工具')
  .version('0.1.0')

// mount commands
Object
  .values(commands)
  .forEach(commandHandler => {
    commandHandler(program)
  })

program.parse()
