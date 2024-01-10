export function getLabelAngle (numberOfLabels) {
  return 2 * Math.PI / numberOfLabels
}

export function getStartAngle (i, labelAngle) {
  return i * labelAngle
}

export function getEndAngle (i, labelAngle) {
  return (i + 1) * labelAngle
}

export function getMidAngle (startAngle, endAngle) {
  return startAngle + (endAngle - startAngle) / 2
}

export function isBottomHalf (midAngle) {
  return midAngle > Math.PI / 2 && midAngle < 3 * Math.PI / 2
}

export function getPathId (i, inBottomHalf) {
  return `labelArc-${inBottomHalf ? 'bottom' : 'top'}-${i}`
}

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