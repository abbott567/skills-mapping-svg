import colours from '../model/Svg/utils/colours.mjs'

function createBaseConfig () {
  // Change these to style the chart
  const config = {
    width: 500,
    height: 500,
    levels: 10,
    labelDistance: 190,
    font: {
      size: 13,
      weight: 500
    },
    stroke: {
      width: '1px',
      colours: colours.stroke
    }
  }
  return config
}

function augmentConfig (config) {
  // Calculated properties based on the base configuration
  config.radius = config.width / 2
  config.zoom = config.levels * 1.3
  config.padAngle = config.spaceBetweenArcs / config.radius
  config.colours = colours

  return config
}

function buildConfig () {
  const baseConfig = createBaseConfig()
  return augmentConfig(baseConfig)
}

export const config = buildConfig()
export default buildConfig()
