import puppeteer from 'puppeteer'
import jetpack from 'fs-jetpack'
import path from 'path'
import sharp from 'sharp'

const window = {
  width: 1400,
  height: 720
}

const exportPath = path.join('dist', 'export')
const configPath = path.join('src', 'config')
const logoPath = path.join(configPath, 'logo.png')

const config = jetpack.read(path.join(configPath, 'export.json'), 'json')

export async function saveScreenshots (entity) {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [`--window-size=${window.width},${window.height}`]
  })
  const [page] = await browser.pages()
  await page.setViewport({ width: window.width, height: window.height })
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
    if (config.logo.use) await appendLogos(screenshotPath)
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

export async function appendLogos (screenshotPath) {
  if (!jetpack.exists(logoPath)) {
    throw new Error(`
      Logo missing but config says to use it.
      Add logo.png to src/config, or amend config/export.json to useLogo:false
    `)
  }
  const parts = screenshotPath.split('.')
  const fileName = parts[0].split('/').pop()
  const extension = parts[1]
  const tmp = `${parts[0]}-tmp.${extension}`
  const screenshotMetadata = await sharp(screenshotPath).metadata()
  const screenshotHeight = screenshotMetadata.height

  const resizedLogo = await sharp(logoPath)
    .resize(null, config.logo.height)
    .toBuffer()

  await sharp(screenshotPath)
    .composite([
      {
        input: resizedLogo,
        left: config.logo.margin.left,
        top: screenshotHeight - config.logo.height - config.logo.margin.bottom,
        blend: 'over'
      }
    ])
    .toFile(tmp, err => {
      if (err) console.error('Error:', err)
      jetpack.remove(screenshotPath)
      jetpack.rename(tmp, `${fileName}.${extension}`)
    })
}

export default exportCharts
