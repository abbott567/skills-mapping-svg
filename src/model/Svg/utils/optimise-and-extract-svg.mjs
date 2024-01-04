import { optimize } from 'svgo'

export function optimiseAndExtractSVG (body) {
  const svgHTML = body.node().innerHTML
  const optimisedResult = optimize(svgHTML, {
    multipass: true,
    plugins: [
      {
        name: 'removeUnknownsAndDefaults',
        active: false
      }
    ]
  })
  return optimisedResult.data
}

export default optimiseAndExtractSVG
