export function setIdForScores (scoresWithoutIds) {
  return scoresWithoutIds.each(function () {
    const slice = this.closest('.slice')
    const sliceId = slice.id
    this.id = `${sliceId}-score`
  })
}

export default setIdForScores
