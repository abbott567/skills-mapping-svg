import buildChartSlices from '../chart/build-chart-slices.mjs'
import buildSVG from '../chart/buildSVG.mjs'
import camelcase from 'camelcase'

export class Chart {
  static count = 0
  id
  paramId
  domId
  title
  key
  stats
  inputData
  labels
  svg
  slices

  constructor (params) {
    this.id = Chart.count += 1
    this.paramId = params.id
    if (params.key === 'Hard Skills') this.domId = `chart-${params.id}-hard-skills`
    else if (params.key === 'Soft Skills') this.domId = `chart-${params.id}-soft-skills`
    else if (params.key === 'Capabilities') this.domId = `chart-${params.id}-capabilities`
    else throw Error(`params.key not valid when constructing charts: '${params.key}'`)
    this.title = params.key
    this.key = camelcase(params.key)
    this.stats = params.stats
    this.labels = params.labels || Object.keys(params.stats)
    this.inputData = params.inputData || Object.values(params.stats)
    this.slices = buildChartSlices(this.inputData)
    console.log(this.domId)
    this.svg = buildSVG(
      this.id,
      this.paramId,
      this.domId,
      this.slices,
      this.labels,
      params.team
    )
  }
}

export default Chart
