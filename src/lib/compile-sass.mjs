import * as sass from 'sass'
import postcss from 'postcss'
import cssnano from 'cssnano'

export async function compileSass () {
  console.log('Sass attempting to compile')
  const resultSass = await sass.compile('src/sass/app.scss')
  const resultMinify = await postcss([cssnano]).process(resultSass.css, { from: undefined })
  console.log('Sass compiled successfully')
  return resultMinify
}

export default compileSass
