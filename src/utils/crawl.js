const chrome = require('selenium-webdriver/chrome')
const {Builder, By, Browser, until} = require('selenium-webdriver')
const saveCode = require('./save-code')

async function crawlLeetcode(codeOrName) {
  // const driver = await new Builder().forBrowser(Browser.CHROME).build()
  const options = new chrome.Options().headless()
  const driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build()

  try {
    // 请求页面
    await driver.get(`https://leetcode.cn/problemset/all/?search=${codeOrName}&page=1`)
    await driver.sleep(3000)

    // 寻找题目
    const rows = await driver.findElements(By.css('div[role="row"]'))
    const row = rows[2]
    const cells = await row.findElements(By.css('div[role="cell"]'))
    const cell = cells[1]
    const aList = await cell.findElements(By.css('a'))
    const a = aList[0]

    // 打开题目详情页面
    const href = await a.getAttribute('href')
    await driver.get(href)

    // 选择 JS 语言的 code
    // const btn = await driver.findElement(By.css('#lang-select'))
    // await btn.click()
    // const btn2 = await driver.findElement(By.css('#lang-select'))
    // await btn2.click()
    // const jsBtn = await driver.findElement(By.css('div[data-cypress="LanguageSelector-JavaScript"]'))
    // await jsBtn.click()

    // 提取页面详情
    await driver.wait(until.elementLocated(By.css('.notranslate')), 4000)
    await driver.wait(until.elementLocated(By.css('.view-lines')), 10000)
    const descEl = await driver.findElement(By.css('.notranslate'))
    const codeEl = await driver.findElement(By.css('.view-lines'))

    const title = (await driver.getTitle()).replace(' - 力扣（LeetCode）', '')
    const desc = await descEl.getText()
    const code = await codeEl.getText()
    const codeId = title.split('.')[0]

    // save code file
    saveCode({title, desc, code, codeId})
  } finally {
    await driver.quit()
  }
}

module.exports = crawlLeetcode
