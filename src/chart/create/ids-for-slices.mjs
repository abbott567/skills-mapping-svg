export function createIdsForSlices (slicesWithoutIds) {
  return slicesWithoutIds.each(function () {
    const svg = this.closest('svg')
    const svgId = svg.id
    const sliceId = this.getAttribute('data-sliceId')
    const designerId = this.getAttribute('data-designerId')
    this.id = `${svgId}-slice-${sliceId}-designer-${designerId}`
  })
}

export default createIdsForSlices
