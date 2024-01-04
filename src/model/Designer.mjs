import groupDesignerStats from '../lib/csv/group-stats.mjs'
import Chart from './Chart.mjs'

export class Designer {
  static all = new Set()
  id
  stats
  inputData
  charts = {}

  constructor (params) {
    this.id = params.id || params.ID
    this.#groupDesignSkills(params)
  }

  #groupDesignSkills (params) {
    const groupedSkills = groupDesignerStats(params)
    this.stats = groupedSkills
    this.inputData = Object.entries(groupedSkills).flatMap(([category, skills]) =>
      Object.entries(skills).map(([skillName, skillLevel]) => ({
        value: skillLevel,
        label: skillName,
        category,
        combinedLabel: `${skillName} (${category})`,
        associatedID: this.id,
        designerID: this.id
      }))
    )
    this.#buildAllCharts()
  }

  #buildChart (key) {
    const filteredInputData = this.inputData.filter(item => {
      const category = item.category
      return category === key
    })

    const chart = new Chart({
      key,
      inputData: filteredInputData,
      team: false
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

  static findByID (id) {
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
