export function validateSkillParams (params) {
  if (params.name === undefined) {
    throw new Error(`
      Name was missing when constructing Skill: ${JSON.stringify(params)}
    `)
  }
  if (params.type === undefined) {
    throw new Error(`
      Type was missing when constructing Skill: ${JSON.stringify(params)}
    `)
  }
  return params
}

export default validateSkillParams
