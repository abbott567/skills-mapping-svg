import camelCase from 'camelcase'
import slugify from 'slugify'

export class Skill {
  static all = new Set()
  static count = 0
  id
  name
  key
  slug
  type

  constructor (params) {
    this.id = Skill.count += 1
    this.name = params.name
    this.slug = slugify(this.name, { lower: true })
    this.key = camelCase(this.slug)
    this.type = params.type
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
