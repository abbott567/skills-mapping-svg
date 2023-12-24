export class Chart {
  id
  svg

  constructor (params) {
    if (params.skillGroup === 'Hard Skills') this.id = `${params.id}-chart-hard-skills`
    else if (params.skillGroup === 'Soft Skills') this.id = `${params.id}-chart-soft-skills`
    else if (params.skillGroup === 'Capabilities') this.id = `${params.id}-chart-capabilities`
    else throw Error(`params.skillsGroup not valid when constructing charts: '${params.skillGroup}'`)
  }
}

export default Chart
