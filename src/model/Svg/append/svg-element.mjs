import config from '../../../lib/build-config.mjs'

const {
  width,
  height
} = config

export function appendSvgElement (chartId, body) {
  const svg = body.append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('id', `chart-${chartId}`)
  return svg
}

export default appendSvgElement
