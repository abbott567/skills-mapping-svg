import dataPaths from '../../config/data-paths.mjs'
import parseCSV from './parse.mjs'

export function organiseRawData () {
  const designerData = parseCSV(dataPaths.designers)
  const mappingsData = parseCSV(dataPaths.mappings, { columns: true })

  const raw = {
    designerData,
    mappingsData,
    'Hard Skills': new Set(),
    'Soft Skills': new Set(),
    Capabilities: new Set(),
    'Skill Mappings': mappingsData['Skill Mappings']
  }
  for (const entry of mappingsData['Hard Skills']) {
    const params = {
      name: entry,
      type: 'hard'
    }
    raw['Hard Skills'].add(params)
  }
  for (const entry of mappingsData['Soft Skills']) {
    const params = {
      name: entry,
      type: 'soft'
    }
    raw['Soft Skills'].add(params)
  }
  for (const entry of mappingsData.Capabilities) {
    const params = {
      name: entry
    }
    raw.Capabilities.add(params)
  }
  return raw
}

export function mapSkillsToCapabilities (raw) {
  const mappedCapabilities = {}
  const capabilitiesIterator = raw.Capabilities.values()
  for (let i = 0; i < raw.Capabilities.size; i++) {
    const capabilityObj = capabilitiesIterator.next().value
    if (capabilityObj && raw['Skill Mappings'] && raw['Skill Mappings'][i]) {
      const skills = raw['Skill Mappings'][i].split(', ').map(skill => skill.trim())
      mappedCapabilities[capabilityObj.name] = skills
    }
  }
  return mappedCapabilities
}

const data = organiseRawData()
data.mappedCapabilities = mapSkillsToCapabilities(data)

export default data
