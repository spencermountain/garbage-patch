import getParent from '../getParent.js'
import { isArray, isNumber, isObject } from '../_helper.js'

const replace = (patch, json) => {
  let res = getParent(patch.path, json)
  // object replace
  if (isObject(res.parent)) {
    res.parent[res.prop] = patch.value
  }
  // array replace
  if (isArray(res.parent) && isNumber(res.prop)) {
    res.parent[res.prop] = patch.value
  }
}

export default replace
