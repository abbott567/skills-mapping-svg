import arc from '../utils/arc.mjs'
import { formatColours, colours } from '../utils/colours.mjs'

export function appendPaths (slice, groupData, isTeam, chartSlices, labels) {
  slice.selectAll('path')
    .data(groupData)
    .enter()
    .append('path')
    .attr('d', d => {
      return isTeam ? arc.makePath(d.level, d.slice, chartSlices.length / 10) : arc.makePath(d.level, d.slice, labels.length)
    })
    .attr('fill', d => formatColours(colours.levels[d.level], d.active))
    .attr('class', 'slice__level')
    .classed('slice__level--active', d => d.active)
}

export default appendPaths
