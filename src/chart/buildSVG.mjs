import * as d3 from 'd3'
import renderSvgElement from './render-svg-element.mjs'
import renderLabels from './render-labels.mjs'
import renderOutlines from './render-outlines.mjs'
import renderScores from './render-scores.mjs'
import createSliceGroups from './create-slice-groups.mjs'
import createSlicesContainer from './create-slices-container.mjs'
import createScoreGroup from './create-score-group.mjs'
import groupChartSlices from './group-chart-slices.mjs'
import renderLevels from './render-levels.mjs'
import calculateScore from './calculate-score.mjs'
import calculateTotalSlices from './calculate-total-slices.mjs'
import getRepresentativeSlice from './get-representative-slice.mjs'
import { JSDOM } from 'jsdom'
import { optimize } from 'svgo'

export function buildSVG (chartId, chartSlices, labels, isTeam = false) {
  const groupedChartSlices = groupChartSlices(chartSlices)

  const dom = new JSDOM('<!DOCTYPE html><body></body>')
  const body = d3.select(dom.window.document.querySelector('body'))

  const svg = renderSvgElement(chartId, body)
  const slicesContainer = createSlicesContainer(svg)

  const slices = createSliceGroups(slicesContainer, groupedChartSlices)

  slices.each(function ([groupName, groupData], groupIndex) {
    const slice = d3.select(this)
    const designerId = groupData[0].designerId
    const category = groupData[0].category
    const label = groupData[0].label

    // Render coloured segments
    renderLevels(slice, groupData, isTeam, chartSlices, labels)

    // Add title
    const score = calculateScore(groupData)
    const totalSlices = calculateTotalSlices(isTeam, chartSlices, labels)
    const representativeSlice = getRepresentativeSlice(groupData, 9)
    const scoreGroup = createScoreGroup(slice, representativeSlice, totalSlices)
    renderScores(scoreGroup, score)

    // Add title
    slice.append('title')
      .text(`${category}, Designer ${designerId}, ${label} score: ${score}`)
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
