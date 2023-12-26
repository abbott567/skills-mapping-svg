import buildDataModel from './model/build.mjs'
import rawData from './lib/csv/map-data.mjs'

const { Designer } = buildDataModel(rawData)
// console.log(Designer.findByID(1).charts)
