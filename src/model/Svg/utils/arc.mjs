import * as d3 from 'd3'
import config from '../../../config/chart.mjs'

const {
  width,
  height,
  padAngle,
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

function calculateCentroid (level, slice, totalSlices) {
  // Calculate angles
  const startAngle = getStartAngle(slice, totalSlices)
  const endAngle = getEndAngle(slice, totalSlices)
  const midAngle = (startAngle + endAngle) / 2
  // Calculate Radius'
  const startRadius = level * ringWidth + innerRadiusBuffer
  const endRadius = startRadius + ringWidth
  const midRadius = (startRadius + endRadius) / 2
  return [
    midRadius * Math.cos(midAngle - Math.PI / 2), // Adjusted by -90 degrees to align with standard coordinate system
    midRadius * Math.sin(midAngle - Math.PI / 2)
  ]
}

const halfWidth = getWidth() / 2
const innerRadiusBuffer = 0
const ringWidth = (halfWidth - innerRadiusBuffer) / (zoom + 1)

function makePath (level, slice, totalSlices) {
  const startRadius = level * ringWidth + innerRadiusBuffer
  const path = d3.arc()
    .innerRadius(startRadius)
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
  makePath,
  calculateCentroid
}
