const parsePointer = require('./_pointer')

const get = function (pointr, data) {
  // empty pointer is everything.
  if (!pointr) {
    return data
  }
  let parts = parsePointer(pointr)
  // gotta start with a slash
  if (parts[0] !== '') {
    return undefined
  }
  let node = data
  // walk through parts of the pointer
  for (let i = 1; i < parts.length; i += 1) {
    let el = parts[i]
    if (el === '-') {
      node = node[node.length - 1]
    } else if (typeof el === 'number') {
      node = node[el]
    } else if (data.hasOwnProperty(el)) {
      node = node[el]
    }
  }
  return node
}

module.exports = get
