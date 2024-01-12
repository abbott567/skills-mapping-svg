import config from '../../../lib/build-config.mjs'

// Calculate the position of a score based on the ring level
export function calculateScorePosition (groupData, level) {
  const representativeSlice = groupData[level]
  return representativeSlice
}
// Calculate the position of the marker based on the highest active level
export function calculateDevelopmentMarkerPosition (groupData, designerId) {
  // Filter the data for the specific designer
  const designerData = groupData.filter(item => item.designerId === designerId)
  // Find the highest level where 'active' is true
  const activeLevels = designerData.filter(item => item.active).map(item => item.level)
  const highestActiveLevel = Math.max(...activeLevels, 0) // Default to 0 if no active levels are found
  // Find the representative slice for the highest active level
  const representativeSlice = designerData.find(item => item.level === highestActiveLevel)
  // If no representative slice is found, return null or a default object
  return representativeSlice || null
}

// Calculate the score based on the group data
export function calculateScore (groupData) {
  const arrayLevel = groupData.reduce((maxLevel, d) => {
    return d.active && d.level > maxLevel ? d.level : maxLevel
  }, 0)
  // Add 1 to the score because arrays start at 0
  const score = arrayLevel + 1
  return score
}
// Calculate the total number of slices for the chart
export function calculateTotalSlices (isTeam, chartSlices, labels) {
  if (isTeam) return chartSlices.length / 10
  return labels.length
}

export function calculateOutermostRadius () {
  const halfWidth = Math.min(config.width, config.height) / 2
  const innerRadiusBuffer = 0
  const ringWidth = (halfWidth - innerRadiusBuffer) / (config.zoom + 1)
  return ringWidth * config.levels
}

export function calculateLabelPosition (labelOffset) {
  return labelOffset + calculateOutermostRadius() + 10
}

export default {
  developmentMarkerPosition: calculateDevelopmentMarkerPosition,
  labelPosition: calculateLabelPosition,
  score: calculateScore,
  scorePosition: calculateScorePosition,
  totalSlices: calculateTotalSlices,
  outerMostRadius: calculateOutermostRadius
}
