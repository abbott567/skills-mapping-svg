import Designer from './Designer.mjs'
import Skill from './Skill.mjs'
import Capability from './Capability.mjs'

export function buildDataModel (rawData) {
  for (const entry of rawData.designerData) {
    const designer = new Designer(entry)
    designer.save()
  }
  for (const entry of rawData.mappingsData['Hard Skills']) {
    const params = {
      name: entry,
      type: 'hard'
    }
    const skill = new Skill(params)
    skill.save()
  }
  for (const entry of rawData.mappingsData['Soft Skills']) {
    const params = {
      name: entry,
      type: 'soft'
    }
    const skill = new Skill(params)
    skill.save()
  }
  for (const entry in rawData.mappedCapabilities) {
    const params = {
      name: entry
    }
    const capability = new Capability(params)
    capability.save()
  }
  return {
    Designer,
    Skill,
    Capability,
    rawData
  }
}

export default buildDataModel
