import parseCSV from './lib/csv-parse.mjs'
import dataPaths from './data/data-paths.mjs'
import Designer from './model/Designer.mjs'

const designersData = parseCSV(dataPaths.designers)

for (const entry of designersData) {
  const designer = new Designer(entry)
  designer.save()
}

console.log(Designer.all)
