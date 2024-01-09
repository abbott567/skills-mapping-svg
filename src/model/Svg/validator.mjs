export function validateSvgParams (params) {
  if (params.chartId === undefined) throw new Error(`ChartId not found when constructing Svg: id:${params.id}`)
  if (params.chartSlices === undefined) throw new Error(`Slices not found when constructing Svg: id:${params.id}`)
  if (params.labels === undefined) throw new Error(`Labels not found when constructing Svg: id:${params.id}`)
  if (params.isTeam === undefined) throw new Error(`isTeam not found when constructing Svg: id:${params.id}`)
  return params
}

export default validateSvgParams
