import config from '../config.mjs'
import createIdsForSlices from '../create/ids-for-slices.mjs'

const { radius } = config

export function createSliceGroups (slicesContainer, groupedChartSlices) {
  // Creates the slices inside the slices group
  const slicesWithoutIds = slicesContainer.selectAll('g.slices')
    .data(groupedChartSlices)
    .enter()
    .append('g')
    .attr('class', 'slice')
    .attr('data-sliceId', d => {
      const i = parseInt(d[0])
      const sliceId = i + 1
      return sliceId
    })
    .attr('data-designerId', d => {
      const designerId = d[1][0].designerId
      return designerId
    })
    .attr('tabindex', 0)
    .attr('transform', `translate(${radius},${radius})`)
  const slicesWithIds = createIdsForSlices(slicesWithoutIds)
  return slicesWithIds
}

export default createSliceGroups
