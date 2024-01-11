export function groupByColumns (data) {
  const columnGroupedData = {}
  const columns = Object.keys(data[0])
  columns.forEach(column => {
    columnGroupedData[column] = data.map(row => row[column])
  })
  return columnGroupedData
}

export default groupByColumns
