import camelcase from 'camelcase'
import validateChartParams from './validator.mjs'
import sanitiseParams from './sanitiser.mjs'
import Svg from '../Svg/constructor.mjs'
import config from '../../config/chart.mjs'

const {
  levels
} = config

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
    const validParams = validateChartParams(params)
    const sanitisedParams = sanitiseParams(validParams)
    this.id = Chart.count += 1
    this.associatedId = sanitisedParams.associatedId
    this.designerId = sanitisedParams.designerId
    this.domId = sanitisedParams.domId
    this.inputData = sanitisedParams.inputData
    this.title = sanitisedParams.title
    this.key = camelcase(params.key)
    this.#buildLabels()
    this.#buildSlices()
    this.svg = new Svg({
      chartId: this.id,
      chartSlices: this.slices,
      labels: this.labels,
      isTeam: params.isTeam
    })
  }

  #buildLabels () {
    const labelSet = new Set()
    for (const entry of this.inputData) {
      labelSet.add(entry.label)
    }
    this.labels = [...labelSet]
  }

  #buildSlices () {
    const slices = []
    let slice = 0
    this.inputData.forEach(entry => {
      for (let i = 0; i < levels; i++) {
        slices.push({
          slice,
          level: i,
          active: i < entry.value,
          label: entry.label,
          category: entry.category,
          combinedLabel: `${entry.label} (${entry.category})`,
          associatedId: entry.associatedId,
          designerId: entry.designerId
        })
      }
      slice += 1
    })
    this.slices = slices
  }
}

export default Chart
