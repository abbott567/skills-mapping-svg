export function calculateTotalSlices (isTeam, chartSlices, labels) {
  if (isTeam) return chartSlices.length / 10
  return labels.length
}

export default calculateTotalSlices
