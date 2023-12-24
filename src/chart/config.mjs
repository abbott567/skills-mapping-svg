import colours from './colours.mjs'

function buildConfig () {
  // Change these to style the chart
  const config = {
    width: 550,
    height: 550,
    levels: 10,
    spaceBetweenArcs: 0,
    labelDistance: 200,
    font: {
      size: 12,
      weight: 700
    },
    stroke: {
      width: '1px',
      colours: colours.stroke
    }
  }

  // Auto calculations based on config
  config.radius = config.width / 2
  config.zoom = config.levels * 1.4
  config.padAngle = config.spaceBetweenArcs / config.radius
  config.colours = colours

  return config
}

export const config = buildConfig()
export default buildConfig()
