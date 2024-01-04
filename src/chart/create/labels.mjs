import * as d3 from 'd3'
import config from '../config.mjs'

const {
  labelDistance,
  radius,
  font
} = config

export function createLabels (svg, labels) {
  const numberOfLabels = labels.length
  const labelAngle = 2 * Math.PI / numberOfLabels

  const labelContainer = svg.append('g')
    .attr('class', 'labelContainer')
    .attr('transform', `translate(${radius},${radius})`)

  labelContainer.selectAll('.labelArc')
    .data(labels)
    .enter()
    .each(function (_, i) {
      const startAngle = i * labelAngle
      const endAngle = (i + 1) * labelAngle
      const midAngle = startAngle + (endAngle - startAngle) / 2

      const isBottomHalf = midAngle > Math.PI / 2 && midAngle < 3 * Math.PI / 2
      const pathId = `labelArc-${isBottomHalf ? 'bottom' : 'top'}-${i}`

      d3.select(this)
        .append('path')
        .attr('id', pathId)
        .attr('class', 'labelArc')
        .attr('d', d3.arc()
          .innerRadius(labelDistance)
          .outerRadius(labelDistance)
          .startAngle(isBottomHalf ? endAngle : startAngle) // Reverse direction for bottom labels
          .endAngle(isBottomHalf ? startAngle : endAngle)())

      d3.select(this)
        .append('text')
        .attr('font-size', font.size)
        .attr('font-weight', font.weight)
        .attr('class', 'labelText')
        .attr('dy', isBottomHalf ? '.25em' : '.25em')
        .append('textPath')
        .attr('text-anchor', 'middle')
        .attr('startOffset', '25%')
        .attr('href', `#${pathId}`)
        .text(labels[i])
    })
}

export default createLabels
