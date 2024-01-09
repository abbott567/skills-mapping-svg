import cloneDeep from 'clone-deep'
import camelCase from 'camelcase'
import slugify from 'slugify'

export function sanitiseCapabilityParams (params) {
  const sanitisedParams = cloneDeep(params)
  sanitisedParams.slug = slugify(sanitisedParams.name)
  sanitisedParams.key = camelCase(sanitisedParams.slug)
  return sanitisedParams
}

export default sanitiseCapabilityParams
