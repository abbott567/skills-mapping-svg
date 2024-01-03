import * as d3 from 'd3'
import arc from './arc.mjs'
import config from './config.mjs'
import renderLabels from './render-labels.mjs'
import renderOutlines from './render-outlines.mjs'
import { formatColours, colours } from './colours.mjs'
import { JSDOM } from 'jsdom'
import { optimize } from 'svgo'

const {
  font,
  width,
  height,
  radius
} = config

export function buildSVG (chartCount, paramId, chartId, chartSlices, labels, team = false, stats) {
  const dom = new JSDOM('<!DOCTYPE html><body></body>')
  const body = d3.select(dom.window.document.querySelector('body'))

  // Create SVG element
  const svg = body.append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('id', chartId)
  // Create a 'slices' group
  const slices = svg.append('g')
    .attr('class', 'slices')

  // Group the slices by 'name'
  const groupedSlices = d3.group(chartSlices, d => d.name)
  // Append a <g> element for each group
  const groups = slices.selectAll('g.slices')
    .data(groupedSlices)
    .enter()
    .append('g')
    .attr('class', 'slice')
    .attr('id', d => {
      const i = parseInt(d[0])
      const sliceId = i + 1
      return `${chartId}-slice-${sliceId}`
    })
    .attr('tabindex', 0)
    .attr('transform', `translate(${radius},${radius})`)

  // Append paths to each group
  groups.each(function ([groupName, groupData], groupIndex) {
    const group = d3.select(this)
    group.selectAll('path')
      .data(groupData)
      .enter()
      .append('path')
      .attr('d', d => {
        if (team) {
          return arc.makePath(d.level, d.slice, chartSlices.length / 10)
        } else {
          return arc.makePath(d.level, d.slice, labels.length)
        }
      })
      .attr('fill', d => formatColours(colours.levels[d.level], d.active))
      .attr('class', 'slice__level')
      .classed('slice__level--active', d => d.active)

    // Append score
    const score = groupData.reduce((maxLevel, d) => {
      return d.active && d.level > maxLevel ? d.level : maxLevel
    }, 0)
    let totalSlices
    if (team) {
      totalSlices = chartSlices.length / 10
    } else {
      totalSlices = labels.length
    }
    const representativeSlice = groupData[9] // for example, taking the first slice in the group
    const [x, y] = arc.calculateCentroid(representativeSlice.level, representativeSlice.slice, totalSlices)

    // Create a group for the circle and text
    const scoreGroup = group.append('g')
      .attr('class', 'slice__score')
      .attr('transform', `translate(${x}, ${y})`)

    // Append a circle as the background to the group
    scoreGroup.append('circle')
      .attr('cx', 0) // Centered in the group
      .attr('cy', 0) // Centered in the group
      .attr('r', font.size - 3)
      .attr('fill', 'var(--text)') // Set your desired background color
      .attr('class', 'slice__score-background') // Class for optional styling

    // Append text to the group
    const scoreTextId = `${chartId}-${parseInt(groupName + 1)}-score-${groupIndex + 1}`
    scoreGroup.append('text')
      .text(score) // or any other text you want to display
      .attr('text-anchor', 'middle') // Center the text
      .attr('alignment-baseline', 'middle') // Center vertically
      .attr('fill', 'white') // Set text color
      .attr('class', 'slice__score-text') // Class for optional styling
      .attr('id', scoreTextId)

    const labelIndex = groupIndex % labels.length // Use modulo to cycle through labels
    const labelForSlice = labels[labelIndex]
    group.append('title')
      .text(`${paramId} - ${labelForSlice} score: ${score}`)
  })

  // Render the overlays
  renderLabels(svg, labels)
  renderOutlines(svg, labels)

  const svgHTML = body.node().innerHTML
  const optimisedResult = optimize(svgHTML, {
    multipass: true,
    plugins: [
      {
        name: 'removeUnknownsAndDefaults',
        active: false
      }
    ]
  })
  return optimisedResult.data
}

export default buildSVG
