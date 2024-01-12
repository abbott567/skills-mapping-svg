import arc from '../utils/arc.mjs'

function appendDevelopmentMarkerGroup (slice, representativeSlice, totalSlices, isDesignerDevFocus) {
  if (isDesignerDevFocus && representativeSlice) {
    const [x, y] = arc.calculateCentroid(representativeSlice.level, representativeSlice.slice, totalSlices)
    const markerGroup = slice.append('g')
      .attr('class', 'slice__development-marker')
      .attr('transform', `translate(${x}, ${y})`)
    return markerGroup
  }
}

export default appendDevelopmentMarkerGroup
