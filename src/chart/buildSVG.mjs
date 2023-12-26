import * as d3 from 'd3'
import arc from './arc.mjs'
import config from './config.mjs'
import formatColours from './format-colours.mjs'
import colours from './colours.mjs'
import renderLabels from './render-labels.mjs'
import renderOutlines from './render-outlines.mjs'
import { JSDOM } from 'jsdom'

const {
  width,
  height,
  radius
} = config

export function buildSVG (id, slices, labels, team = false) {
  const dom = new JSDOM('<!DOCTYPE html><body></body>')
  const body = d3.select(dom.window.document.querySelector('body'))
  // Create SVG element
  const svg = body.append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('id', `chart-${id}`)
  // Render the chart and segments
  svg.selectAll('path')
    .data(slices)
    .enter()
    .append('path')
    .attr('transform', `translate(${radius},${radius})`)
    .attr('d', (d) => {
      if (team) {
        return arc.makePath(d.level, d.slice, slices.length / 10)
      } else {
        return arc.makePath(d.level, d.slice, labels.length)
      }
    })
    .attr('fill', (d) => formatColours(colours.levels[d.level], d.active))
    .attr('class', 'slice')
  renderLabels(svg, labels)
  renderOutlines(svg, labels)
  return body.node().innerHTML
}

export default buildSVG
