export function calculateScore (groupData) {
  const arrayLevel = groupData.reduce((maxLevel, d) => {
    return d.active && d.level > maxLevel ? d.level : maxLevel
  }, 0)
  const score = arrayLevel + 1
  return score
}

export default calculateScore
