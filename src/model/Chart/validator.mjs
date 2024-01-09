export function validateChartParams (params) {
  if (params.inputData === undefined) {
    throw new Error(`
      InputData missing when constructing Chart
      params: ${JSON.stringify(params)}
    `)
  }
  if (params.key === undefined) {
    throw new Error(`
      Key missing when constructing Chart
      params: ${JSON.stringify(params)}
    `)
  }
  if (params.isTeam === undefined) {
    throw new Error(`
      isTeam missing when constructing Chart
      params: ${JSON.stringify(params)}
    `)
  }
  if (params.isTeam !== true && params.isTeam !== false) {
    throw new Error(`
      isTeam must be boolean when constructing Chart
      params: ${JSON.stringify(params)}
    `)
  }
  const validKeys = ['Hard Skills', 'Soft Skills', 'Capabilities']
  if (!validKeys.includes(params.key)) throw new Error(`params.key not valid when constructing charts: '${params.key}'`)
  return params
}

export default validateChartParams
