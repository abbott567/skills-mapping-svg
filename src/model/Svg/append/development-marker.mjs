import * as d3 from 'd3'
import jetpack from 'fs-jetpack'

const config = jetpack.read('src/config/chart.json', 'json')

export function appendDevelopmentMarker (markerGroup, midAngleDegrees, totalSlices) {
  if (markerGroup) {
    // Define the size and type of the symbol (arrow)
    let arrowSize
    if (totalSlices < 10) arrowSize = 50
    else arrowSize = (100 * config.levels) / totalSlices
    const arrowSymbol = d3.symbol().type(d3.symbolTriangle).size(arrowSize)

    if (markerGroup) {
      // Append the arrow symbol
      markerGroup.append('path')
        .attr('d', arrowSymbol)
        // Position and rotate the arrow
        .attr('transform', `translate(0, 0) rotate(${midAngleDegrees})`)
        .attr('fill', 'var(--subduedText)') // Style as needed
        .attr('class', 'slice__development-marker-path')
    }
  }
}

export default appendDevelopmentMarker
