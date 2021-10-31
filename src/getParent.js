import parsePointer from './_pointer.js'
import get from './get.js'
import { isArray, isObject } from './_helper.js'

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
export default getParent

// let json = {
//   foo: ['bar', 'baz'],
//   cool: {
//     yes: {
//       oh: 'yeah',
//     },
//   },
// }

// console.log(getParent('/cool/yes/', json))
