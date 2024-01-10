import { optimize } from 'svgo'

// Optimise the SVG using SVGO and then extract it from the fake dom
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
