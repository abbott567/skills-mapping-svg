import path from 'path'
import jetpack from 'fs-jetpack'
import nunjucks from 'nunjucks'
import camelCase from 'camelcase'
import htmlmin from 'html-minifier'

export function buildHTML (data) {
  const config = jetpack.read(path.join('src', 'config', 'export.json'), 'json')

  console.log('HTML attempting to compile')
  const env = nunjucks.configure(['src/views', 'src/config'], {
    autoescape: true
  })
  env.addFilter('camelCase', camelCase)
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      env.addGlobal(key, data[key])
    }
  }
  env.addGlobal('orgName', config.orgName)
  const html = nunjucks.render('index.njk', { data })
  const minifiedHtml = htmlmin.minify(html, {
    removeComments: true,
    collapseWhitespace: true
  })
  jetpack.write('dist/index.html', minifiedHtml)
  console.log('HTML compiled successfully')
}

export default buildHTML
