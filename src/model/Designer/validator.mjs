import Skill from '../Skill/constructor.mjs'
import Capability from '../Capability/constructor.mjs'

export function validateDesignerParams (params) {
  // Validate ID
  const id = params.id || params.Id || params.ID
  if (id === undefined) {
    throw Error(`
      ID not found when constructing Designer: ${params}
    `)
  }
  // Validate stats
  const skillsArray = []
  for (const skill of Skill.all) skillsArray.push(skill.name)
  for (const capability of Capability.all) skillsArray.push(capability.name)
  for (const [key, value] of Object.entries(params)) {
    let matchSkill = false
    const comparator = key
    if (typeof value !== 'number') throw Error(`Score (${value}) is not a number when constructing Designer: ${id}`)
    if (value < 0) throw Error(`Score (${value}) cannot be less than 0 when constructing Designer: ${id}`)
    if (value > 10) throw Error(`Score (${value}) cannot be more than 10 when constructing Designer: ${id}`)
    if (skillsArray.includes(comparator)) matchSkill = true
    if (!matchSkill) {
      const ignore = ['id', 'ID', 'Id']
      if (!ignore.includes(comparator)) {
        throw Error(`
          Skill name (${comparator}) in CSV did not match mapped skills when constructing Designer: ${id}
          Mapped skills: ${skillsArray}
        `)
      }
    }
  }
  return params
}

export default validateDesignerParams
