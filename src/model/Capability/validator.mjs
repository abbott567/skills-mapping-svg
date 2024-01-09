export function validateCapabilityParams (params) {
  if (params.name === undefined) {
    throw new Error(`
      Name was missing when constructing Capability: ${JSON.stringify(params)}
    `)
  }
  return params
}

export default validateCapabilityParams
