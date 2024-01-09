import Chart from '../Chart/constructor.mjs'

export class Team {
  id = 'Team'
  stats
  charts = {}
  inputData

  constructor (data) {
    const { Designer } = data
    this.inputData = []
    const firstDesignerInputData = Array.from(Designer.all)[0].inputData
    const skillsOrder = firstDesignerInputData.map(skill => skill.label)
    skillsOrder.forEach(label => {
      Designer.all.forEach(designer => {
        const skillData = designer.inputData.find(skill => skill.label === label)
        if (skillData) {
          this.inputData.push({
            value: skillData.value,
            label: skillData.label,
            category: skillData.category,
            combinedLabel: skillData.combinedLabel,
            associatedId: this.id,
            designerId: designer.id
          })
        }
      })
    })
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
}

export default Team
