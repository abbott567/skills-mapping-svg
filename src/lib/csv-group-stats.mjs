import groupByColumns from './csv-group-by-columns.mjs'
import parseCSV from './csv-parse.mjs'
import dataPaths from '../data/data-paths.mjs'

const skillsMappingsParsed = parseCSV(dataPaths.mappings)
const skillMappingsData = groupByColumns(skillsMappingsParsed)

export function groupDesignerStats (designer) {
  const groupedData = {
    'Hard Skills': {},
    'Soft Skills': {},
    Capabilities: {}
  }
  // Grouping hard skills
  skillMappingsData['Hard Skills'].forEach(skill => {
    if (designer[skill] !== undefined) {
      groupedData['Hard Skills'][skill] = designer[skill]
    }
  })
  // Grouping soft skills
  skillMappingsData['Soft Skills'].forEach(skill => {
    if (designer[skill] !== undefined) {
      groupedData['Soft Skills'][skill] = designer[skill]
    }
  })
  // Grouping capabilities
  skillMappingsData.Capabilities.forEach(skill => {
    if (designer[skill] !== undefined) {
      groupedData.Capabilities[skill] = designer[skill]
    }
  })
  return groupedData
}

export default groupDesignerStats
