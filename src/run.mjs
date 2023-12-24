import buildDataModel from './model/build.mjs'
import rawData from './lib/csv-map-data.mjs'

const data = buildDataModel(rawData)
console.log(data)
