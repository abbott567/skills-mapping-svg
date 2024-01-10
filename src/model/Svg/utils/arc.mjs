import * as d3 from 'd3'
import config from '../../../lib/build-config.mjs'

const {
  width,
  height,
  padAngle,
  zoom
} = config

// Return the smaller of the chart's width or heigh
function getWidth () {
  return Math.min(width, height)
}

// Angle calculations
// Calculate the angle for a slice based on the total number of slices and the zoom level
function getAngle (zoom, totalSlices) {
  return ((2 * Math.PI / totalSlices) * zoom)
}
// Calculate the starting angle of a slice at a given index
function getStartAngle (i, totalSlices) {
  return (i / totalSlices) * 2 * Math.PI
}
// Calculate the ending angle of a slice at a given index
function getEndAngle (i, totalSlices) {
  return ((i + 1) / totalSlices) * 2 * Math.PI
}
// Calculate the centroid (center point) of a slice
function calculateCentroid (level, slice, totalSlices) {
  // Calculate starting and ending angles for the slice
  const startAngle = getStartAngle(slice, totalSlices)
  const endAngle = getEndAngle(slice, totalSlices)
  // Calculate the midpoint of these angles
  const midAngle = (startAngle + endAngle) / 2
    // Determine the radii for the start, end, and midpoint of the slice
  const startRadius = level * ringWidth + innerRadiusBuffer
  const endRadius = startRadius + ringWidth
  const midRadius = (startRadius + endRadius) / 2
    // Calculate and return the coordinates of the centroid
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
