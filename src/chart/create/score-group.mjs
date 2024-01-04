import arc from '../utils/arc.mjs'
import createIdsForScores from '../create/ids-for-scores.mjs'

function createScoreGroup (group, representativeSlice, totalSlices) {
  const [x, y] = arc.calculateCentroid(representativeSlice.level, representativeSlice.slice, totalSlices)
  const scoreGroup = group.append('g')
    .attr('class', 'slice__score')
    .attr('transform', `translate(${x}, ${y})`)
  createIdsForScores(scoreGroup)
  return scoreGroup
}

export default createScoreGroup
