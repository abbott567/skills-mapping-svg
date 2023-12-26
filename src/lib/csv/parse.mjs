import Papa from 'papaparse'
import jetpack from 'fs-jetpack'
import groupByColumns from './group-by-columns.mjs'

export function parseCSV (pathToFile, options = {}) {
  const dataString = jetpack.read(pathToFile)
  const parsed = Papa.parse(dataString, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true
  })
  const data = parsed.data
  if (options.columns) return groupByColumns(data)
  return data
}

export default parseCSV
