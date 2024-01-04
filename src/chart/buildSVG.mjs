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

export function buildSVG (chartId, chartSlices, labels, team = false) {
  const dom = new JSDOM('<!DOCTYPE html><body></body>')
  const body = d3.select(dom.window.document.querySelector('body'))
  // Create SVG element
  const svg = body.append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('id', `chart-${chartId}`)
  // Create a 'slices' group
  const slices = svg.append('g')
    .attr('class', 'slices')

  // Group the slices by 'name'
  const groupedSlices = d3.group(chartSlices, d => d.slice)
  // Append a <g> element for each group

  const groups = slices.selectAll('g.slices')
    .data(groupedSlices)
    .enter()
    .append('g')
    .attr('class', 'slice')
    .attr('id', d => {
      const designerID = d[1][0].designerID
      const i = parseInt(d[0])
      const sliceId = i + 1
      const id = `chart-${chartId}-slice-${sliceId}-designer-${designerID}`
      return id
    })
    .attr('tabindex', 0)
    .attr('transform', `translate(${radius},${radius})`)

  // Append paths to each group
  groups.each(function ([groupName, groupData], groupIndex) {
    const group = d3.select(this)
    const designerID = groupData[0].designerID
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
    const arrayLevel = groupData.reduce((maxLevel, d) => {
      return d.active && d.level > maxLevel ? d.level : maxLevel
    }, 0)
    const score = arrayLevel + 1
    let totalSlices
    if (team) totalSlices = chartSlices.length / 10
    else totalSlices = labels.length
    const representativeSlice = groupData[9]
    const [x, y] = arc.calculateCentroid(representativeSlice.level, representativeSlice.slice, totalSlices)

    // Create a group for the circle and text
    const scoreGroup = group.append('g')
      .attr('class', 'slice__score')
      .attr('transform', `translate(${x}, ${y})`)

    // Append a circle as the background to the group
    scoreGroup.append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', font.size - 3)
      .attr('fill', 'var(--text)') // Set your desired background color
      .attr('class', 'slice__score-background') // Class for optional styling

    // Append text to the group
    scoreGroup.append('text')
      .text(score)
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .attr('fill', 'white')
      .attr('class', 'slice__score-text')
      .attr('id', d => {
        const i = parseInt(d[0])
        const sliceId = i + 1
        const id = `chart-${chartId}-slice-${sliceId}-designer-${designerID}-score-text}`
        return id
      })

    const category = groupData[0].category
    const label = groupData[0].label
    group.append('title')
      .text(`${category}, Designer ${designerID}, ${label} score: ${score}`)
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
