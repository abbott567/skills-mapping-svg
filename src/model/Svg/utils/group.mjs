import * as d3 from 'd3'

export function groupChartSlices (chartSlices) {
  // Groups all the input data by their slice attribute
  const groupedChartSlices = d3.group(chartSlices, d => d.slice)
  return groupedChartSlices
}

export default {
  chartSlices: groupChartSlices
}
