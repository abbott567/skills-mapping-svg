export function appendDevelopmentMarker (markerGroup) {
  if (markerGroup) {
    markerGroup.append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', 3)
      .attr('fill', 'var(--text)')
      .attr('class', 'slice__development-marker-path')
  }
}

export default appendDevelopmentMarker
