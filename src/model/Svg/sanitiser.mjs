import * as d3 from 'd3'
import cloneDeep from 'clone-deep'

export function groupChartSlices (data) {
  // Groups all the input data by their slice attribute
  return d3.group(data.chartSlices, d => d.slice)
}

export function sanitiseSvgParams (params) {
  const sanitisedParams = cloneDeep(params)
  const data = {}
  data.chartId = sanitisedParams.chartId
  data.chartSlices = params.chartSlices
  data.labels = params.labels
  data.isTeam = params.isTeam
  data.groupedChartSlices = groupChartSlices(data)
  sanitisedParams.data = data
  return sanitisedParams
}

export default sanitiseSvgParams
