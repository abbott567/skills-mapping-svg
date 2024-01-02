import buildDataModel from './model/build.mjs'
import rawData from './lib/csv/map-data.mjs'
import buildHTML from './lib/build-html.mjs'
import convertAllSVGs from './lib/export-charts.mjs'

const data = buildDataModel(rawData)
buildHTML(data)
convertAllSVGs(data)
