import validateSkillParams from './validator.mjs'
import sanitiseSkillParams from './sanitiser.mjs'

export class Skill {
  static all = new Set()
  static count = 0
  id
  name
  key
  slug
  type

  constructor (params) {
    params.id = Skill.count += 1
    const validParams = validateSkillParams(params)
    const sanitisedParams = sanitiseSkillParams(validParams)
    this.type = sanitisedParams.type
    this.name = sanitisedParams.name
    this.slug = sanitisedParams.slug
    this.key = sanitisedParams.key
  }

  save () {
    Skill.all.add(this)
  }

  static findById (id) {
    for (const entry of Skill.all) {
      if (entry.id === id) return entry
    }
  }

  static findByName (name) {
    for (const entry of Skill.all) {
      if (entry.name === name) return entry
    }
  }

  static findBySlug (slug) {
    for (const entry of Skill.all) {
      if (entry.slug === slug) return entry
    }
  }

  static findByKey (key) {
    for (const entry of Skill.all) {
      if (entry.key === key) return entry
    }
  }
}

export default Skill
