import puppeteer from 'puppeteer'
import jetpack from 'fs-jetpack'
import path from 'path'

const exportPath = path.join('dist', 'export')

export async function saveScreenshots (entity) {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--window-size=1400,1000']
  })
  const [page] = await browser.pages()
  await page.setViewport({ width: 1400, height: 720 })
  await page.setContent(jetpack.read('dist/index.html'))
  // Wait for the section to load
  await page.waitForSelector('footer')

  // Iterate over each chart container
  const chartContainers = await page.$$('div.chart-container')
  for (let i = 0; i < chartContainers.length; i++) {
    const container = chartContainers[i]
    const containerId = await container.evaluate(element => element.getAttribute('id'))
    // Define the screenshot path for each container
    const screenshotPath = path.join(exportPath, `${containerId}.png`)
    // Take a screenshot of each individual chart container
    await container.screenshot({ path: screenshotPath })
  }
  await browser.close()
}

export async function exportCharts (data) {
  console.log('Attempting to save charts as PNGs')
  const exportPath = path.join('dist', 'export')
  // Clean the export folder
  jetpack.remove(exportPath)
  jetpack.dir(exportPath)
  await saveScreenshots()
  console.log('Successfully saved charts as PNGs')
}

export default exportCharts
