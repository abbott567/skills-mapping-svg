import groupDesignerStats from '../lib/csv-group-stats.mjs'
import Chart from './Chart.mjs'

export class Designer {
  static all = new Set()
  id
  stats
  charts = []

  constructor (params) {
    this.id = params.id || params.ID
    this.#groupDesignSkills(params)
  }

  #groupDesignSkills (params) {
    const groupedSkills = groupDesignerStats(params)
    this.stats = groupedSkills
    this.#buildAllCharts()
  }

  #buildChart (key) {
    const chart = new Chart({
      key,
      stats: this.stats[key],
      id: this.id
    })
    return chart
  }

  #saveChart (chart) {
    this.charts.push(chart)
  }

  #buildAllCharts () {
    const harsSkillsChart = this.#buildChart('Hard Skills')
    this.#saveChart(harsSkillsChart)
    // this.charts.add(this.#buildChart('Soft Skills', this.id))
    // this.charts.add(this.#buildChart('Capabilities', this.id))
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
