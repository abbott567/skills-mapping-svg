import Papa from 'papaparse'
import jetpack from 'fs-jetpack'

export function parseCSV (pathToFile) {
  const dataString = jetpack.read(pathToFile)
  const parsed = Papa.parse(dataString, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true
  })
  const data = parsed.data
  return data
}

export default parseCSV
