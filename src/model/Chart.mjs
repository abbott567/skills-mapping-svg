import buildChartSlices from '../chart/build-chart-slices.mjs'
import buildSVG from '../chart/buildSVG.mjs'
import camelcase from 'camelcase'

export class Chart {
  id
  title
  key
  stats
  inputData
  labels
  svg
  slices

  constructor (params) {
    if (params.key === 'Hard Skills') this.id = `${params.id}-chart-hard-skills`
    else if (params.key === 'Soft Skills') this.id = `${params.id}-chart-soft-skills`
    else if (params.key === 'Capabilities') this.id = `${params.id}-chart-capabilities`
    else throw Error(`params.key not valid when constructing charts: '${params.key}'`)
    this.title = params.key
    this.key = camelcase(params.key)
    this.stats = params.stats
    this.labels = params.labels || Object.keys(params.stats)
    this.inputData = params.inputData || Object.values(params.stats)
    this.slices = buildChartSlices(this.inputData)
    this.svg = buildSVG(
      this.id,
      this.slices,
      this.labels,
      params.team
    )
  }
}

export default Chart
