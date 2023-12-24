import * as d3 from 'd3'
import config from './config.mjs'

const {
  width,
  height,
  padAngle,
  spaceBetweenArcs,
  zoom
} = config

function getWidth () {
  return Math.min(width, height)
}

function getAngle (zoom, totalSlices) {
  return ((2 * Math.PI / totalSlices) * zoom)
}

function getStartAngle (i, totalSlices) {
  return (i / totalSlices) * 2 * Math.PI
}

function getEndAngle (i, totalSlices) {
  return ((i + 1) / totalSlices) * 2 * Math.PI
}

const halfWidth = getWidth() / 2
const innerRadiusBuffer = 0
const ringWidth = (halfWidth - innerRadiusBuffer) / (zoom + 1)

function makePath (level, slice, totalSlices) {
  const startRadius = level * ringWidth + innerRadiusBuffer
  const path = d3.arc()
    .innerRadius(startRadius + spaceBetweenArcs)
    .outerRadius(startRadius + ringWidth)
    .startAngle(getAngle(slice, totalSlices))
    .endAngle(getEndAngle(slice, totalSlices))
    .padAngle(padAngle)
    .padRadius(halfWidth)
    .cornerRadius(0)
  return path()
}

export default {
  ringWidth,
  halfWidth,
  getAngle,
  getStartAngle,
  getEndAngle,
  getWidth,
  makePath
}
