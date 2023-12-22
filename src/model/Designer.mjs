import groupDesignerSkills from '../lib/csv-group-skills.mjs'

export class Designer {
  static all = []
  id
  skills

  constructor (params) {
    this.id = params.id || params.ID
    this.#groupDesignSkills(params)
  }

  #groupDesignSkills (params) {
    const groupedSkills = groupDesignerSkills(params)
    this.skills = groupedSkills
  }

  static findByID (id) {
    Designer.all.find(x => x.id === id)
  }

  getHardSkills () { return this.skills['Hard Skills'] }
  getSoftSkills () { return this.skills['Soft Skills'] }
  getCapabilities () { return this.skills.Capabilities }
  save () { Designer.all.push(this) }
}

export default Designer
