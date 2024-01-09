import cloneDeep from 'clone-deep'

export function sanitiseChartParams (params) {
  // Copy all params to a new object
  const sanitisedParams = cloneDeep(params)
  // Add Id's
  sanitisedParams.associatedId = params.inputData[0].associatedId
  sanitisedParams.designerId = params.inputData[0].designerId
  if (params.key === 'Hard Skills') {
    sanitisedParams.domId = `chart-${params.id}-hard-skills`
  } else if (params.key === 'Soft Skills') {
    sanitisedParams.domId = `chart-${params.id}-soft-skills`
  } else if (params.key === 'Capabilities') {
    sanitisedParams.domId = `chart-${params.id}-capabilities`
  }
  return sanitisedParams
}

export default sanitiseChartParams
