import * as d3 from 'd3'
import create from '../create/all.mjs'
import calculate from '../utils/calculate.mjs'
import group from '../utils/group.mjs'
import optimiseAndExtractSVG from '../utils/optimise-and-extract-svg.mjs'
import { JSDOM } from 'jsdom'

export function buildCompleteSvg (chartId, chartSlices, labels, isTeam = false) {
  // Group the chart slices data so that it's in order for the combined chart
  const groupedChartSlices = group.chartSlices(chartSlices)
  // Create a fake DOM to load everything into the <body>
  const dom = new JSDOM('<!DOCTYPE html><body></body>')
  const body = d3.select(dom.window.document.querySelector('body'))
  // Create and append a new <svg> element and append it to <body>
  const svg = create.svg(chartId, body)
  // Create a <g> (group) element to hold the slices and append it to SVG
  const slicesContainer = create.slicesContainer(svg)
  // Create a <g> for each slice and append it to the slices container <g>
  const slices = create.sliceGroups(slicesContainer, groupedChartSlices)
  // Iterate over each of slice <g>'s
  slices.each(function ([groupName, groupData], groupIndex) {
    // Assign variables
    const slice = d3.select(this)
    const designerId = groupData[0].designerId
    const category = groupData[0].category
    const label = groupData[0].label
    // Create paths for each chart segment and append them to the slice <g>
    create.paths(slice, groupData, isTeam, chartSlices, labels)
    // Calculate the score based on the paths
    const scoreData = calculate.score(groupData)
    // Calculate the total number of slices to know where to put the score marker
    const totalSlices = calculate.totalSlices(isTeam, chartSlices, labels)
    // Set which ring to display the marker in
    const scorePosition = calculate.scorePosition(groupData, 9)
    // Create a <g> to hold the score marker and the score text
    const scoreGroup = create.scoreGroup(slice, scorePosition, totalSlices)
    // Create the circular score marker and the text and append them to the scoreGroup <g>
    create.scoreMarker(scoreGroup, scoreData)
    // Add title
    create.title(slice, category, designerId, label, scoreData)
  })
  // Create the labels and append them to the <svg>
  create.labels(svg, labels)
  // Create the gridlines and append them to the <svg>
  create.gridLines(svg, labels)
  const optimisedSVG = optimiseAndExtractSVG(body)
  return optimisedSVG
}

export default buildCompleteSvg
