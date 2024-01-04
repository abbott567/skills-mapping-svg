export function createTitle (slice, category, designerId, label, scoreData) {
  slice.append('title')
    .text(`${category}, Designer ${designerId}, ${label} score: ${scoreData}`)
}

export default createTitle
