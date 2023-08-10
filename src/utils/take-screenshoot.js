import Jimp from 'jimp'

async function takeScreenshoot(element, driver, filePath) {
  try {
    try {
      // 获取元素的位置和大小信息
      const rect = await element.getRect()

      // 获取整个页面截图
      const fullScreenshot = await driver.takeScreenshot()

      // 使用Jimp加载整个页面截图
      const jimpImage = await Jimp.read(Buffer.from(fullScreenshot, 'base64'))

      // 裁剪页面截图以获得元素截图
      const elementImage = await jimpImage.crop(rect.x, rect.y + 40, rect.width - 20, rect.height - 40)

      // 将元素截图保存为图像文件
      await elementImage.writeAsync(filePath)
    } catch (error) {
      console.error('Error cropping image:', error)
    }
  } catch (e) {
    console.log(e)
    throw e
  }
}

export default takeScreenshoot

