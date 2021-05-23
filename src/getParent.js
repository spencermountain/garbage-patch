const parsePointer = require('./_pointer')
const get = require('./get')
const { isArray, isObject } = require('./_helper')

const getParent = function (pointr, json) {
  let prop = ''
  let parts = parsePointer(pointr)
  if (parts.length > 1) {
    prop = parts.pop()
  }
  let parent = get(parts, json)
  // a parent must be an object or an array
  if (!isArray(parent) && !isObject(parent)) {
    parent = undefined
  }
  return { parent: parent, prop: prop }
}
module.exports = getParent

// let json = {
//   foo: ['bar', 'baz'],
//   cool: {
//     yes: {
//       oh: 'yeah',
//     },
//   },
// }

// console.log(getParent('/cool/yes/', json))
