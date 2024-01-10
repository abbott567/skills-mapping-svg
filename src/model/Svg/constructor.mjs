import * as d3 from 'd3'
import append from './append/all.mjs'
import calculate from './utils/calculate.mjs'
import optimiseAndExtractSVG from './utils/optimise-and-extract-svg.mjs'
import validateSvgParams from './validator.mjs'
import sanitiseSvgParams from './sanitiser.mjs'

class Svg {
  static count = 0
  static all = []
  id
  element
  data = {}
  #dom

  constructor (params) {
    params.id = Svg.count += 1
    const validParams = validateSvgParams(params)
    const sanitisedParams = sanitiseSvgParams(validParams)
    this.#dom = append.fakeDom()
    this.data = sanitisedParams.data
    this.element = this.#buildSvgElement()
  }

  #buildSvgElement () {
    // Create and append a new <svg> element and append it to <body>
    const svg = append.svgElement(this.data.chartId, this.#dom)
    // Create a <g> (group) element to hold the slices and append it to SVG
    const slicesContainer = append.slicesContainer(svg)
    // Create a <g> for each slice and append it to the slices container <g>
    const slices = append.sliceGroups(slicesContainer, this.data.groupedChartSlices)
    // Iterate over each of slice <g>'s
    slices.each(([_groupName, groupData], index, nodes) => this.#processSlices(groupData, nodes[index]))
    // Create the labels and append them to the <svg>
    append.labels(svg, this.data.labels)
    // Create the gridlines and append them to the <svg>
    append.gridLines(svg, this.data.labels)
    this.save()
    return optimiseAndExtractSVG(this.#dom)
  }

  #processSlices (groupData, sliceElement) {
    // Create data variables
    const slice = d3.select(sliceElement)
    this.data.designerId = groupData[0].designerId
    this.data.category = groupData[0].category
    this.data.label = groupData[0].label
    // Create paths for each chart segment and append them to the slice <g>
    append.paths(slice, groupData, this.data.isTeam, this.data.chartSlices, this.data.labels)
    // Calculate the score based on the paths
    this.data.score = calculate.score(groupData)
    // Build the title for chart accessibility
    this.data.title = `${this.data.category}, Designer ${this.data.designerId}, ${this.data.label} score: ${this.data.score}`
    // Calculate the total number of slices to know where to put the score marker
    const totalSlices = calculate.totalSlices(this.data.isTeam, this.data.chartSlices, this.data.labels)
    // Set which ring to display the marker in
    const scorePosition = calculate.scorePosition(groupData, 9)
    // Create a <g> to hold the score marker and the score text
    const scoreGroup = append.scoreGroup(slice, scorePosition, totalSlices)
    // Create the circular score marker and the text and append them to the scoreGroup <g>
    append.scoreMarker(scoreGroup, this.data.score)
    // Add title
    append.title(slice, this.data.title)
  }

  save () {
    Svg.all.push(this)
  }
}

export default Svg
