import camelCase from 'camelcase'
import slugify from 'slugify'
import Skill from './Skill.mjs'
import data from '../lib/csv-map-data.mjs'

// const mappingsData = parseCSV(dataPaths.mappings, { columns: true })

export class Capability {
  static all = new Set()
  static count = 0
  id
  name
  slug
  key
  skills = new Set()

  constructor (params) {
    this.id = Capability.count += 1
    this.name = params.name
    this.slug = slugify(this.name)
    this.key = camelCase(this.slug)
    this.registerSkills()
  }

  static findByID (id) {
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
