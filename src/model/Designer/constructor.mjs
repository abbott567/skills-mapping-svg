import groupDesignerStats from '../../lib/utils/csv/group-stats.mjs'
import Chart from '../Chart/constructor.mjs'
import validateDesignerParams from './validator.mjs'

export class Designer {
  static all = new Set()
  id
  stats
  inputData
  devFocus
  charts = {}
  #groupedSkills

  constructor (params) {
    const validParams = validateDesignerParams(params)
    this.devFocus = validParams.devFocus
    this.id = params.id || params.Id || params.ID
    this.#groupedSkills = groupDesignerStats(validParams)
    this.stats = this.#groupedSkills
    this.#buildInputData()
    this.#buildAllCharts()
  }

  #buildInputData () {
    this.inputData = Object.entries(this.#groupedSkills).flatMap(([category, skills]) =>
      Object.entries(skills).map(([skillName, skillLevel]) => ({
        value: skillLevel,
        label: skillName,
        category,
        combinedLabel: `${skillName} (${category})`,
        associatedId: this.id,
        designerId: this.id,
        designerDevFocus: this.devFocus,
        isDesignerDevFocus: this.devFocus === skillName
      }))
    )
  }

  #buildChart (key) {
    const filteredInputData = this.inputData.filter(item => {
      const category = item.category
      return category === key
    })

    const chart = new Chart({
      key,
      inputData: filteredInputData,
      isTeam: false,
      devFocus: this.devFocus
    })
    return chart
  }

  #saveChart (chart) {
    this.charts[chart.key] = chart
  }

  #buildAllCharts () {
    const hardSkillsChart = this.#buildChart('Hard Skills')
    this.#saveChart(hardSkillsChart)
    const softSkillsChart = this.#buildChart('Soft Skills')
    this.#saveChart(softSkillsChart)
    const capabilitiesChart = this.#buildChart('Capabilities')
    this.#saveChart(capabilitiesChart)
  }

  static findById (id) {
    for (const entry of Designer.all) {
      if (entry.id === id) return entry
    }
  }

  getStats (type) {
    return this.stats[type]
  }

  save () { Designer.all.add(this) }
}

export default Designer
