export function appendSlicesContainer (svg) {
  // Creates a group to hold all the slices
  const chartId = svg.attr('id')
  const slices = svg.append('g')
    .attr('class', 'slices')
    .attr('id', `${chartId}-slices`)
  return slices
}

export default appendSlicesContainer
