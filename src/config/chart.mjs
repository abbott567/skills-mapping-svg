import colours from '../model/Svg/utils/colours.mjs'

function buildConfig () {
  // Change these to style the chart
  const config = {
    width: 500,
    height: 500,
    levels: 10,
    spaceBetweenArcs: 0,
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

  // Auto calculations based on config
  config.radius = config.width / 2
  config.zoom = config.levels * 1.3
  config.padAngle = config.spaceBetweenArcs / config.radius
  config.colours = colours

  return config
}

export const config = buildConfig()
export default buildConfig()
