import createGridLines from './grid-lines.mjs'
import createIdsForScores from './ids-for-scores.mjs'
import createIdsForSlices from './ids-for-slices.mjs'
import createLabels from './labels.mjs'
import createPaths from './paths.mjs'
import createScoreGroup from './score-group.mjs'
import createScoreMarker from './score-marker.mjs'
import createSliceGroups from './slice-groups.mjs'
import createSlicesContainer from './slices-container.mjs'
import createSvg from './svg.mjs'
import createTitle from './title.mjs'

export default {
  gridLines: createGridLines,
  idsForScores: createIdsForScores,
  idsForSlices: createIdsForSlices,
  labels: createLabels,
  paths: createPaths,
  scoreGroup: createScoreGroup,
  scoreMarker: createScoreMarker,
  sliceGroups: createSliceGroups,
  slicesContainer: createSlicesContainer,
  svg: createSvg,
  title: createTitle
}
