import arc from '../utils/arc.mjs'
import appendIdsForScores from '../append/ids-for-scores.mjs'

function appendScoreGroup (group, representativeSlice, totalSlices) {
  const [x, y] = arc.calculateCentroid(representativeSlice.level, representativeSlice.slice, totalSlices)
  const scoreGroup = group.append('g')
    .attr('class', 'slice__score')
    .attr('transform', `translate(${x}, ${y})`)
  appendIdsForScores(scoreGroup)
  return scoreGroup
}

export default appendScoreGroup
