import config from './config.mjs'

const {
  width,
  height
} = config

export function renderSvgElement (chartId, body) {
  const svg = body.append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('id', `chart-${chartId}`)
  return svg
}

export default renderSvgElement
