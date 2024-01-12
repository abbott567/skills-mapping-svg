import * as d3 from 'd3'

export function logAttributes (selection) {
  selection.each(function () {
    // 'this' refers to the current DOM element
    const element = d3.select(this)
    const nodeName = element.node().nodeName
    const attributes = element.node().attributes
    const attrs = {}
    for (const attr of attributes) {
      attrs[attr.name] = attr.value
    }
    console.log(`Element: ${nodeName}`, attrs)
  })
}

export default logAttributes
