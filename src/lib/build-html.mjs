import jetpack from 'fs-jetpack'
import nunjucks from 'nunjucks'
import camelCase from 'camelcase'
import htmlmin from 'html-minifier'

export function buildHTML (data) {
  console.log('HTML attempting to compile')
  const env = nunjucks.configure('src/views', {
    autoescape: true
  })
  env.addFilter('camelCase', camelCase)
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      env.addGlobal(key, data[key])
    }
  }

  const html = nunjucks.render('index.njk', { data })
  const minifiedHtml = htmlmin.minify(html, {
    removeComments: true,
    collapseWhitespace: true
  })
  jetpack.write('dist/index.html', minifiedHtml)
  console.log('HTML compiled successfully')
}

export default buildHTML
