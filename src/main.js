#!/usr/bin/env node
import {program} from 'commander'
import commands from './commands/index.js'

program
  .name('小耿 leetcode 辅助刷题CLI工具')
  .version('0.1.4')

// mount commands
Object
  .values(commands)
  .forEach(commandHandler => {
    commandHandler(program)
  })

program.parse()
