import * as d3 from 'd3'
import config from '../../../config/chart.mjs'
import labelArc from '../utils/labelArc.mjs'

const {
  labelDistance,
  radius,
  font
} = config



export function appendLabels (svg, labels) {
  const numberOfLabels = labels.length

  const labelContainer = svg.append('g')
    .attr('class', 'labelContainer')
    .attr('transform', `translate(${radius},${radius})`)

  labelContainer.selectAll('.labelArc')
    .data(labels)
    .enter()
    .each(function (_, i) {
      const angles = labelArc.getAngles(i, numberOfLabels)
      d3.select(this)
        .append('path')
        .attr('id', angles.pathId)
        .attr('class', 'labelArc')
        .attr('d', d3.arc()
          .innerRadius(labelDistance)
          .outerRadius(labelDistance)
          .startAngle(angles.inBottomHalf ? angles.endAngle : angles.startAngle) // Reverse direction for bottom labels
          .endAngle(angles.inBottomHalf ? angles.startAngle : angles.endAngle)())

      d3.select(this)
        .append('text')
        .attr('font-size', font.size)
        .attr('font-weight', font.weight)
        .attr('class', 'labelText')
        .attr('dy', angles.inBottomHalf ? '.25em' : '.25em')
        .append('textPath')
        .attr('text-anchor', 'middle')
        .attr('startOffset', '25%')
        .attr('href', `#${angles.pathId}`)
        .text(labels[i])
    })
}

export default appendLabels
