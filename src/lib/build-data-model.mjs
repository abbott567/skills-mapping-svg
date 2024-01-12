import Designer from '../model/Designer/constructor.mjs'
import Skill from '../model/Skill/constructor.mjs'
import Capability from '../model/Capability/constructor.mjs'
import Team from '../model/Team/constructor.mjs'
import getTodayDate from './utils/get-today-date.mjs'

export function buildDataModel (rawData) {
  const todayDate = getTodayDate()
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
  for (const entry of rawData.designerData) {
    for (const devFocus of rawData.developmentData) {
      if (entry.ID === devFocus.ID) {
        entry.devFocus = devFocus['Development Focus']
      }
    }
    const designer = new Designer(entry)
    designer.save()
  }

  const data = {
    todayDate,
    Team,
    Designer,
    Skill,
    Capability,
    rawData
  }
  data.team = new Team(data)
  return data
}

export default buildDataModel
