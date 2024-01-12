import createFakeDom from './fake-dom.mjs'
import createGridLines from './grid-lines.mjs'
import createIdsForScores from './ids-for-scores.mjs'
import createIdsForSlices from './ids-for-slices.mjs'
import createLabels from './labels.mjs'
import createPaths from './paths.mjs'
import createScoreGroup from './score-group.mjs'
import createScoreMarker from './score-marker.mjs'
import createSliceGroups from './slice-groups.mjs'
import createSlicesContainer from './slices-container.mjs'
import createSvgElement from './svg-element.mjs'
import createTitle from './title.mjs'
import createDevelopmentMarkerGroup from './development-marker-group.mjs'
import createDevelopmentMarker from './development-marker.mjs'

export default {
  developmentMarker: createDevelopmentMarker,
  developmentMarkerGroup: createDevelopmentMarkerGroup,
  fakeDom: createFakeDom,
  gridLines: createGridLines,
  idsForScores: createIdsForScores,
  idsForSlices: createIdsForSlices,
  labels: createLabels,
  paths: createPaths,
  scoreGroup: createScoreGroup,
  scoreMarker: createScoreMarker,
  sliceGroups: createSliceGroups,
  slicesContainer: createSlicesContainer,
  svgElement: createSvgElement,
  title: createTitle
}
