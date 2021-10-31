import getParent from '../getParent.js'
import { isArray, isNumber, isObject } from '../_helper.js'

const remove = (patch, json) => {
  let res = getParent(patch.path, json)
  // object remove
  if (isObject(res.parent)) {
    delete res.parent[res.prop]
  }
  // array remove
  if (isArray(res.parent) && isNumber(res.prop)) {
    res.parent.splice(res.prop, 1)
  }
}

export default remove
