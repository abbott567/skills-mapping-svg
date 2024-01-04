import config from './config.mjs'

const {
  levels
} = config

export function buildChartSlices (inputData) {
  const dataset = []
  let slice = 0
  inputData.forEach(entry => {
    for (let i = 0; i < levels; i++) {
      dataset.push({
        slice,
        level: i,
        active: i < entry.value,
        label: entry.label,
        category: entry.category,
        combinedLabel: `${entry.label} (${entry.category})`,
        associatedID: entry.associatedID,
        designerID: entry.designerID
      })
    }
    slice += 1
  })
  return dataset
}

export default buildChartSlices
