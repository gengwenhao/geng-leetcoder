import {Builder, By, until} from 'selenium-webdriver'
import chrome from 'selenium-webdriver/chrome.js'
import saveCode from './save-code.js'

import('chromedriver')

export default async function crawlLeetcode(codeOrName) {

  // 配置 selenium
  const options = new chrome.Options()
  options.excludeSwitches('enable-logging')

  // 实例化 driver
  const driver = await new Builder()
    .forBrowser('chrome')
    // .setChromeOptions(options.headless())
    .build()

  try {
    // 请求页面
    await driver.get(`https://leetcode.cn/problemset/all/?search=${codeOrName}&page=1`)
    await driver.sleep(3000)

    // 在列表中找到题目标题
    const rows = await driver.findElements(By.css('div[role="row"]'))
    const row = rows[2]
    const cells = await row.findElements(By.css('div[role="cell"]'))
    const cell = cells[1]
    const aList = await cell.findElements(By.css('a'))
    const a = aList[0]
    const href = await a.getAttribute('href')

    // 跳转到题目详情页面
    await driver.get(href)
    await driver.wait(until.elementLocated(By.css('#qd-content')), 4000)
    await driver.wait(until.elementLocated(By.css('.view-lines')), 4000)

    // 选择 JS 语言版本的 code
    const btnSelector = await driver.findElement(By.css('.relative.notranslate'))
    await btnSelector.click()
    const btnLanguages = await driver.findElements(By.css('.whitespace-nowrap'))
    const btnJS = await btnLanguages[11]
    await btnJS.click()

    // 寻找题目内容的 DOM 节点
    await driver.sleep(2000)
    const descEl = await driver.findElement(By.css('#qd-content div'))
    const codeEl = await driver.findElement(By.css('.view-lines'))

    // 提取题目页面详情
    const title = (await driver.getTitle()).replace(' - 力扣（LeetCode）', '')
    const desc = await descEl.getText()
    const code = await codeEl.getText()
    const codeId = title.split('.')[0]

    // save code file
    const data = {title, desc, code, codeId, url: href}
    saveCode(data)

    return data
  } catch (e) {
    throw e
  } finally {
    await driver.quit()
  }

  return {}
}

