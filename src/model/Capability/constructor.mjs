import Skill from '../Skill/constructor.mjs'
import data from '../../lib/csv/map-data.mjs'
import validateCapabilityParams from './validator.mjs'
import sanitiseCapabilityParams from './sanitiser.mjs'

export class Capability {
  static all = new Set()
  static count = 0
  id
  name
  slug
  key
  skills = new Set()

  constructor (params) {
    params.id = Capability.count += 1
    const validParams = validateCapabilityParams(params)
    const sanitisedParams = sanitiseCapabilityParams(validParams)
    this.id = sanitisedParams.id
    this.name = sanitisedParams.name
    this.slug = sanitisedParams.slug
    this.key = sanitisedParams.key
    this.registerSkills()
  }

  static findById (id) {
    for (const entry of Capability.all) {
      if (entry.id === id) return entry
    }
  }

  save () {
    Capability.all.add(this)
  }

  registerSkills () {
    for (const capName in data.mappedCapabilities) {
      if (capName === this.name) {
        for (const skillName of data.mappedCapabilities[capName]) {
          const skill = Skill.findByName(skillName)
          this.skills.add(skill)
        }
      }
    }
  }

  getSkills (type) {
    if (type) {
      return new Set([...this.skills].filter(x => x.type === type))
    }
    return this.skills
  }
}

export default Capability
