import * as d3 from 'd3'
import { JSDOM } from 'jsdom'

export function createFakeDom () {
  // Create a fake DOM and return the <body> to load everything into
  const dom = new JSDOM('<!DOCTYPE html><body></body>')
  const body = d3.select(dom.window.document.querySelector('body'))
  return body
}

export default createFakeDom
