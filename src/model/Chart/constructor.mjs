import buildDataSets from './build-datasets.mjs'
import camelcase from 'camelcase'
import Svg from '../Svg/constructor.mjs'

export class Chart {
  static count = 0
  id
  associatedId
  designerId
  domId
  title
  key
  inputData
  labels = new Set()
  svg
  slices

  constructor (params) {
    this.id = Chart.count += 1
    this.associatedId = params.inputData[0].associatedId
    this.designerId = params.inputData[0].designerId
    if (params.key === 'Hard Skills') {
      this.domId = `chart-${params.id}-hard-skills`
      this.inputData = params.inputData
    } else if (params.key === 'Soft Skills') {
      this.domId = `chart-${params.id}-soft-skills`
      this.inputData = params.inputData
    } else if (params.key === 'Capabilities') {
      this.domId = `chart-${params.id}-capabilities`
      this.inputData = params.inputData
    } else {
      throw Error(`params.key not valid when constructing charts: '${params.key}'`)
    }
    this.title = params.key
    this.key = camelcase(params.key)
    for (const entry of params.inputData) {
      this.labels.add(entry.label)
    }
    this.labels = [...this.labels]
    this.slices = buildDataSets(this.inputData)
    this.svg = new Svg({
      chartId: this.id,
      chartSlices: this.slices,
      labels: this.labels,
      isTeam: params.team
    })
  }
}

export default Chart
