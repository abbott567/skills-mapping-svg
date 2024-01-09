import * as d3 from 'd3'
import appendGridLines from './append/grid-lines.mjs'
import appendIdsForScores from './append/ids-for-scores.mjs'
import appendIdsForSlices from './append/ids-for-slices.mjs'
import appendLabels from './append/labels.mjs'
import appendPaths from './append/paths.mjs'
import appendScoreGroup from './append/score-group.mjs'
import appendScoreMarker from './append/score-marker.mjs'
import appendSliceGroups from './append/slice-groups.mjs'
import appendSlicesContainer from './append/slices-container.mjs'
import appendSvgElement from './append/svg-element.mjs'
import appendTitle from './append/title.mjs'
import calculate from './utils/calculate.mjs'
import optimiseAndExtractSVG from './utils/optimise-and-extract-svg.mjs'
import { JSDOM } from 'jsdom'

class Svg {
  static count = 0
  static all = []
  id
  element
  data = {}
  #append
  #dom

  constructor (params) {
    this.#append = {
      gridLines: appendGridLines,
      idsForScores: appendIdsForScores,
      idsForSlices: appendIdsForSlices,
      labels: appendLabels,
      paths: appendPaths,
      scoreGroup: appendScoreGroup,
      scoreMarker: appendScoreMarker,
      sliceGroups: appendSliceGroups,
      slicesContainer: appendSlicesContainer,
      svgElement: appendSvgElement,
      title: appendTitle
    }
    this.id = Svg.count += 1
    this.#dom = this.#buildDom()
    this.data.chartId = params.chartId
    this.data.chartSlices = params.chartSlices
    this.data.groupedChartSlices = this.#groupChartSlices()
    this.data.labels = params.labels
    this.data.isTeam = params.isTeam || false
    this.element = this.#buildSvgElement()
  }

  #buildDom () {
    // Create a fake DOM and return the <body> to load everything into
    const dom = new JSDOM('<!DOCTYPE html><body></body>')
    const body = d3.select(dom.window.document.querySelector('body'))
    return body
  }

  #groupChartSlices () {
    // Groups all the input data by their slice attribute
    return d3.group(this.data.chartSlices, d => d.slice)
  }

  #processSlices (groupData, sliceElement) {
    // Create data variables
    const slice = d3.select(sliceElement)
    this.data.designerId = groupData[0].designerId
    this.data.category = groupData[0].category
    this.data.label = groupData[0].label
    this.data.title = `${this.data.category}, Designer ${this.data.designerId}, ${this.data.label} score: ${this.data.score}`
    // Create paths for each chart segment and append them to the slice <g>
    this.#append.paths(slice, groupData, this.data.isTeam, this.data.chartSlices, this.data.labels)
    // Calculate the score based on the paths
    this.data.score = calculate.score(groupData)
    // Calculate the total number of slices to know where to put the score marker
    const totalSlices = calculate.totalSlices(this.data.isTeam, this.data.chartSlices, this.data.labels)
    // Set which ring to display the marker in
    const scorePosition = calculate.scorePosition(groupData, 9)
    // Create a <g> to hold the score marker and the score text
    const scoreGroup = this.#append.scoreGroup(slice, scorePosition, totalSlices)
    // Create the circular score marker and the text and append them to the scoreGroup <g>
    this.#append.scoreMarker(scoreGroup, this.data.score)
    // Add title
    this.#append.title(slice, this.data.title)
  }

  #buildSvgElement () {
    // Create and append a new <svg> element and append it to <body>
    const svg = this.#append.svgElement(this.data.chartId, this.#dom)
    // Create a <g> (group) element to hold the slices and append it to SVG
    const slicesContainer = this.#append.slicesContainer(svg)
    // Create a <g> for each slice and append it to the slices container <g>
    const slices = this.#append.sliceGroups(slicesContainer, this.data.groupedChartSlices)
    // Iterate over each of slice <g>'s
    slices.each(([_groupName, groupData], index, nodes) => this.#processSlices(groupData, nodes[index]))
    // Create the labels and append them to the <svg>
    this.#append.labels(svg, this.data.labels)
    // Create the gridlines and append them to the <svg>
    this.#append.gridLines(svg, this.data.labels)
    this.save()
    return optimiseAndExtractSVG(this.#dom)
  }

  save () {
    Svg.all.push(this)
  }
}

export default Svg
