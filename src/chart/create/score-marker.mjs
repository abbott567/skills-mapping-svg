import config from '../config.mjs'

const { font } = config

export function createScoreMarker (scoreGroup, score) {
  scoreGroup.append('circle')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', font.size - 3)
    .attr('fill', 'var(--text)')
    .attr('class', 'slice__score-background')

  scoreGroup.append('text')
    .text(score)
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .attr('fill', 'white')
    .attr('class', 'slice__score-text')
}

export default createScoreMarker
