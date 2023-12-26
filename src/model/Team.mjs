import Chart from './Chart.mjs'

export class Team {
  id = 'Team'
  stats
  charts = {}
  inputData

  constructor (data) {
    const { Designer } = data
    this.stats = this.#blankOutStats(Designer)

    this.inputData = {}
    const skillCounts = Object.entries(this.stats).reduce((acc, [key, value]) => {
      acc[key] = Object.keys(value).length
      return acc
    }, {})

    // Loop to create an alternating pattern
    Object.keys(skillCounts).forEach(category => {
      this.inputData[category] = []
      for (let i = 0; i < skillCounts[category]; i++) {
        for (const designer of Designer.all) {
          if (designer.stats[category] && Object.values(designer.stats[category])[i] !== undefined) {
            this.inputData[category].push(Object.values(designer.stats[category])[i])
          }
        }
      }
    })

    this.#buildAllCharts()
  }

  #buildChart (key) {
    const chart = new Chart({
      key,
      stats: this.stats[key],
      inputData: this.inputData[key],
      id: this.id,
      team: true
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

  #blankOutStats (Designer) {
    const stats = { ...Designer.findByID(1).stats }
    const zeroedStats = {}
    for (const category in stats) {
      zeroedStats[category] = {}
      for (const key in stats[category]) {
        zeroedStats[category][key] = 'Not used for team'
      }
    }
    return zeroedStats
  }
}

export default Team
