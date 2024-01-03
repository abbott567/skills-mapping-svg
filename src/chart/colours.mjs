import path from 'path'
import hexToRgba from 'hex-to-rgba'
import jetpack from 'fs-jetpack'

export function formatColours (hex, active = true) {
  const rgba = active ? hexToRgba(hex, 1) : hexToRgba('#f7f8fc', 1)
  return rgba
}

export function parseSassColours (sassContent) {
  const colours = {
    chartColours: [],
    textColour: ''
  }
  const chartRegex = /--chart(\d+):\s*([^;]+)/g
  let match
  while ((match = chartRegex.exec(sassContent)) !== null) {
    colours.chartColours[parseInt(match[1]) - 1] = match[2].trim()
  }
  const textRegex = /--text:\s*([^;]+)/
  const textMatch = textRegex.exec(sassContent)
  if (textMatch) colours.textColour = textMatch[1].trim()
  return colours
}

export function extractColoursFromSass (sassFilePath) {
  const sassContent = jetpack.read(sassFilePath)
  if (!sassContent) return null
  const { chartColours, textColour } = parseSassColours(sassContent)
  return {
    stroke: {
      active: textColour,
      inactive: textColour
    },
    levels: chartColours
  }
}

const sassFilePath = path.join('src', 'sass', 'theme', '_colours.scss')
export const colours = extractColoursFromSass(sassFilePath)

export default {
  colours,
  formatColours,
  extractColoursFromSass,
  parseSassColours
}
