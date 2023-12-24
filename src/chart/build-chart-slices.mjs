import config from './config.mjs'

const {
  levels
} = config

export function buildChartSlices (inputData) {
  const dataset = []
  let slice = 0
  Object.keys(inputData).forEach(d => {
    for (let i = 0; i < levels; i++) {
      dataset.push({
        slice,
        name: d,
        level: i,
        active: i < inputData[d]
      })
    }
    slice += 1
  })
  return dataset
}

export default buildChartSlices
