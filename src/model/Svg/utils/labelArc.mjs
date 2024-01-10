// Calculate the angle for each label based on the total number of labels
export function getLabelAngle (numberOfLabels) {
  return 2 * Math.PI / numberOfLabels
}
// Calculate the starting angle for a label at a given index
export function getStartAngle (i, labelAngle) {
  return i * labelAngle
}
// Calculate the ending angle for a label at a given index
export function getEndAngle (i, labelAngle) {
  return (i + 1) * labelAngle
}
// Calculate the middle angle between the start and end angles of a label
export function getMidAngle (startAngle, endAngle) {
  return startAngle + (endAngle - startAngle) / 2
}
// Determine if the mid angle of a label is in the bottom half of the circle
export function isBottomHalf (midAngle) {
  return midAngle > Math.PI / 2 && midAngle < 3 * Math.PI / 2
}
// Generate a path ID for a label based on its index and whether it's in the bottom half of the circle
export function getPathId (i, inBottomHalf) {
  return `labelArc-${inBottomHalf ? 'bottom' : 'top'}-${i}`
}
// Generate all relevant angles for a label at a given index
export function getAngles (i, numberOfLabels) {
    const labelAngle = getLabelAngle(numberOfLabels)
    const startAngle = getStartAngle(i, labelAngle)
    const endAngle = getEndAngle(i, labelAngle)
    const midAngle = getMidAngle(startAngle, endAngle)
    const inBottomHalf = isBottomHalf(midAngle)
    const pathId = getPathId(i, inBottomHalf)
    return {
      labelAngle,
      startAngle,
      endAngle,
      midAngle,
      inBottomHalf,
      pathId
    }
}

export default {
  getAngles,
  getLabelAngle,
  getEndAngle,
  getMidAngle,
  isBottomHalf,
  getStartAngle
}