const get = require('../get')
const getParent = require('../getParent')
const { isArray, isNumber, isObject, isString } = require('../_helper')

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

module.exports = remove
