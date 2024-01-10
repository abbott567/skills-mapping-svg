import config from '../../../lib/build-config.mjs'

// Calculate the position of a score based on the ring level
export function calculateScorePosition (groupData, level) {
  const representativeSlice = groupData[level]
  return representativeSlice
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
  labelPosition: calculateLabelPosition,
  score: calculateScore,
  scorePosition: calculateScorePosition,
  totalSlices: calculateTotalSlices,
  outerMostRadius: calculateOutermostRadius
}
