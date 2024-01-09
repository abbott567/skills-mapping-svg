import config from '../../../config/chart.mjs'

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
