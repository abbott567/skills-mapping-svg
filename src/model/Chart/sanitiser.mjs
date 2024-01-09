import cloneDeep from 'clone-deep'

export function sanitiseChartParams (params) {
  // Copy all params to a new object
  const sanitisedParams = cloneDeep(params)
  // Add Id's
  sanitisedParams.associatedId = sanitisedParams.inputData[0].associatedId
  sanitisedParams.designerId = sanitisedParams.inputData[0].designerId
  if (sanitisedParams.key === 'Hard Skills') {
    sanitisedParams.domId = `chart-${sanitisedParams.id}-hard-skills`
  } else if (sanitisedParams.key === 'Soft Skills') {
    sanitisedParams.domId = `chart-${sanitisedParams.id}-soft-skills`
  } else if (sanitisedParams.key === 'Capabilities') {
    sanitisedParams.domId = `chart-${sanitisedParams.id}-capabilities`
  }
  return sanitisedParams
}

export default sanitiseChartParams
