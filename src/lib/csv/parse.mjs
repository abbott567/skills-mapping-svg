import Papa from 'papaparse'
import jetpack from 'fs-jetpack'
import groupByColumns from './group-by-columns.mjs'

export function parseCSV (pathToFile, options = {}) {
  const dataString = jetpack.read(pathToFile)
  const parsed = Papa.parse(dataString, {
    complete: result => validateResult(result),
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true
  })
  const data = parsed.data
  if (options.columns) return groupByColumns(data)
  return data
}

export function validateResult (result) {
  // Get the headers
  const headers = result.meta.fields
  const headerCount = headers.length
  // Iterate over each row
  result.data.forEach((row, index) => {
    // Get the cell count for the current row
    const cellCount = Object.keys(row).length
    const rowNumber = index + 1
    // Check if the cell count does not match the header count
    if (cellCount > headerCount) {
      throw new Error(`
        Could not parseCSV data: Row ${rowNumber} has more cells (${cellCount}) than headers (${headerCount})
        ${JSON.stringify(row).slice(0, 100)}…
      `)
    }
    if (cellCount < headerCount) {
      throw new Error(`
        Could not parse CSV data: Row ${rowNumber} has more headers (${headerCount}) than cells (${cellCount})
        ${JSON.stringify(row).slice(0, 100)}…
      `)
    }
    if (cellCount < headerCount) throw new Error(`Could not parse CSV data: Row ${rowNumber} has more headers (${headerCount}) than cells (${cellCount}).`)
  })
}

export default parseCSV
