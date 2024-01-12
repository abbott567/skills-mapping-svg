import * as d3 from 'd3'

export function appendDevelopmentMarker (markerGroup, midAngleDegrees) {
  if (markerGroup) {
    // Define the size and type of the symbol (arrow)
    const arrowSize = 70 // Adjust the size as needed
    const arrowSymbol = d3.symbol().type(d3.symbolTriangle).size(arrowSize)

    if (markerGroup) {
      // Append the arrow symbol
      markerGroup.append('path')
        .attr('d', arrowSymbol)
        // Position and rotate the arrow
        .attr('transform', `translate(0, 0) rotate(${midAngleDegrees})`)
        .attr('fill', 'var(--text)') // Style as needed
        .attr('class', 'slice__development-marker-path')
    }
  }
}

export default appendDevelopmentMarker
