export function validateTeamData (data) {
  const { Designer } = data
  if (Designer === undefined) throw new Error('Designer class not found in data when constructing Team')
  if (Designer.all.length === 0) throw new Error('No designers found in data when constructing Team')
  return data
}

export default validateTeamData
