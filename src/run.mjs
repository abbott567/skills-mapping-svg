import buildDataModel from './lib/build-data-model.mjs'
import rawData from './lib/csv/map-data.mjs'
import buildHTML from './lib/build-html.mjs'
import exportCharts from './lib/export-charts.mjs'
import compileSass from './lib/compile-sass.mjs'

async function run () {
  const data = await buildDataModel(rawData)
  data.css = await compileSass()
  await buildHTML(data)
  await exportCharts(data)
}

run()
