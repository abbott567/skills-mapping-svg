import Chart from './Chart.mjs'

export class Team {
  id = 'Team'
  stats
  charts = {}
  inputData

  constructor (data) {
    const { Designer } = data
    this.inputData = []
    const skillsOrder = [...Designer.all][0].inputData.map(skill => skill.label)
    // Iterate over each skill label
    skillsOrder.forEach(label => {
      // For each skill, iterate over all designers
      Designer.all.forEach(designer => {
        // Find the value for the current skill and designer
        const skillData = designer.inputData.find(skill => skill.label === label)
        if (skillData) {
          this.inputData.push({
            value: skillData.value,
            label: skillData.label,
            associatedID: this.id,
            designerID: designer.id
          })
        }
      })
    })
    this.#buildAllCharts()
  }

  #buildChart (key) {
    const filteredInputData = this.inputData.filter(item => {
      const category = item.label.split(' (')[1].split(')')[0]
      return category === key
    })
    const chart = new Chart({
      key,
      inputData: filteredInputData,
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
