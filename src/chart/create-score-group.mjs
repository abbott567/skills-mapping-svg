import arc from './arc.mjs'
import setIdForScores from './set-ids-for-scores.mjs'

function createScoreGroup (group, representativeSlice, totalSlices) {
  const [x, y] = arc.calculateCentroid(representativeSlice.level, representativeSlice.slice, totalSlices)
  const scoreGroup = group.append('g')
    .attr('class', 'slice__score')
    .attr('transform', `translate(${x}, ${y})`)
  setIdForScores(scoreGroup)
  return scoreGroup
}

export default createScoreGroup
