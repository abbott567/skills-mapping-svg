import groupDesignerSkills from '../lib/csv-group-skills.mjs'
import Chart from './Chart.mjs'

export class Designer {
  static all = new Set()
  id
  skills
  charts = new Set()

  constructor (params) {
    this.id = params.id || params.ID
    this.#groupDesignSkills(params)
  }

  #groupDesignSkills (params) {
    const groupedSkills = groupDesignerSkills(params)
    this.skills = groupedSkills
    this.#buildAllCharts()
  }

  #buildAllCharts () {
    this.charts.add(
      this.#buildChart('Hard Skills', this.id),
      this.#buildChart('Soft Skills', this.id),
      this.#buildChart('Capabilities', this.id)
    )
  }

  #buildChart (skillGroup, id) {
    const chart = new Chart({ skillGroup, id })
    return chart
  }

  static findByID (id) {
    for (const entry of Designer.all) {
      if (entry.id === id) return entry
    }
  }

  getHardSkills () { return this.skills['Hard Skills'] }
  getSoftSkills () { return this.skills['Soft Skills'] }
  getCapabilities () { return this.skills.Capabilities }
  save () { Designer.all.add(this) }
}

export default Designer
