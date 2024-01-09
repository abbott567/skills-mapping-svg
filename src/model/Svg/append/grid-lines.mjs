import arc from '../utils/arc.mjs'
import config from '../../../config/chart.mjs'

const {
  radius
} = config

export function appendGridLines (svg, labels) {
  // Create a group to hold the rings
  const rings = svg.append('g')
    .attr('class', 'rings')
  // Add rings
  const numberOfRings = config.levels
  const halfWidth = arc.getWidth() / 2
  const innerRadiusBuffer = 0
  const ringWidth = (halfWidth - innerRadiusBuffer) / (config.zoom + 1)
  for (let i = 0; i < numberOfRings; i++) {
    rings.append('circle')
      .attr('cx', halfWidth)
      .attr('cy', halfWidth)
      .attr('r', ringWidth * (i + 1))
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-width', 1)
  }
  // Add segment lines
  const totalSegments = labels.length
  const labelAngle = 2 * Math.PI / totalSegments // Angle covered by each label
  const outermostRadius = ringWidth * numberOfRings

  for (let i = 0; i < totalSegments; i++) {
    const angle = i * labelAngle // Updated angle calculation
    const x = outermostRadius * Math.cos(angle - Math.PI / 2) // Adjusting by Math.PI / 2
    const y = outermostRadius * Math.sin(angle - Math.PI / 2) // because D3's angle 0 is at 12 o'clock

    rings.append('line')
      .attr('x1', radius)
      .attr('y1', radius)
      .attr('x2', radius + x)
      .attr('y2', radius + y)
      .attr('stroke', 'black')
      .attr('stroke-width', 1)
  }
}

export default appendGridLines
