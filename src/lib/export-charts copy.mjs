import puppeteer from 'puppeteer'
import jetpack from 'fs-jetpack'
import path from 'path'

export async function saveScreenshots (entity) {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--window-size=1650,1000']
  })
  const [page] = await browser.pages()
  await page.setViewport({ width: 1650, height: 720 })

  await page.evaluate(entity => {
    // Add some styling
    const style = document.createElement('style')
    style.textContent = `
      h1, h2 {
        font-family: inter;
        text-align: center;
      }
      section {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
      }
      svg {
        width: 100%;
      }
    `
    document.head.appendChild(style)

    // Create a section
    const section = document.createElement('section')
    section.setAttribute('id', `section-${entity.id}`)

    // Add a title
    const heading = document.createElement('h1')
    heading.textContent = entity.title
    document.body.prepend(heading)

    // Create the charts
    for (const chart of entity.charts) {
      const div = document.createElement('div')
      div.setAttribute('id', `chart-${chart.key}`)
      div.innerHTML = chart.svg
      const heading = document.createElement('h2')
      heading.setAttribute('id', `chart-${chart.key}-heading`)
      heading.textContent = chart.title
      div.prepend(heading)
      section.prepend(div)
    }
    document.body.appendChild(section)
  }, entity)

  // Wait for the section to load
  await page.waitForSelector(`#section-${entity.id}`)

  // Take the screenshot
  await page.screenshot({ path: entity.outputPath })
  await browser.close()
}

export function exportCharts (data) {
  console.log('Attempting to save charts as PNGs')
  const exportPath = 'dist/export'
  // Clean the export folder
  jetpack.remove(exportPath)
  jetpack.dir(exportPath)
  // Export team chart
  const team = {
    id: 'team',
    title: 'Team',
    charts: [],
    outputPath: path.join(exportPath, '0_team.png')
  }
  for (const [key, value] of Object.entries(data.team.charts)) {
    const chart = {
      key,
      title: value.title,
      svg: value.svg
    }
    team.charts.push(chart)
  }
  saveScreenshots(team)
  // Export Designer charts
  for (const designerData of data.Designer.all) {
    const designer = {
      id: designerData.id,
      title: `Designer: ${designerData.id}`,
      charts: [],
      outputPath: path.join(exportPath, `${designerData.id}_designer.png`)
    }
    for (const [key, value] of Object.entries(designerData.charts)) {
      const chart = {
        key,
        title: value.title,
        svg: value.svg
      }
      designer.charts.push(chart)
    }
    saveScreenshots(designer)
  }
  console.log('Successfully saved charts as PNGs')
}

export default exportCharts
