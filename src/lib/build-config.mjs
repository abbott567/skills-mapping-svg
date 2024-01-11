import path from 'path'
import jetpack from 'fs-jetpack'
import colours from '../model/Svg/utils/colours.mjs'

function createBaseConfig () {
  const config = jetpack.read(path.join('src', 'config', 'chart.json'), 'json')
  return config
}

function augmentConfig (baseConfig) {
  const config = { ...baseConfig }
  // Calculated properties based on the base configuration
  config.radius = config.width / 2
  config.zoom = config.levels * 1.3
  config.colours = colours
  config.stroke.colours = colours.stroke

  return config
}

function buildConfig () {
  const baseConfig = createBaseConfig()
  const config = augmentConfig(baseConfig)
  return config
}

export const config = buildConfig()
export default buildConfig()
