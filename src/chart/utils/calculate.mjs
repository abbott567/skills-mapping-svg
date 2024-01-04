export function calculateScorePosition (groupData, level) {
  const representativeSlice = groupData[level]
  return representativeSlice
}

export function calculateScore (groupData) {
  const arrayLevel = groupData.reduce((maxLevel, d) => {
    return d.active && d.level > maxLevel ? d.level : maxLevel
  }, 0)
  const score = arrayLevel + 1
  return score
}

export function calculateTotalSlices (isTeam, chartSlices, labels) {
  if (isTeam) return chartSlices.length / 10
  return labels.length
}

export default {
  score: calculateScore,
  scorePosition: calculateScorePosition,
  totalSlices: calculateTotalSlices
}
