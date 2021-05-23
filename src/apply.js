const get = require('./get')
const getParent = require('./getParent')
const { isArray, isNumber, isObject } = require('./_helper')

const actions = {
  add: (patch, json) => {
    let node = get(patch.path, json)
    // sneaky-push
    if (isArray(node) === true) {
      node.push(patch.value)
      return
    }
    // sneaky-splat
    if (isObject(node) === true && isObject(patch.value) === true) {
      Object.assign(node, patch.value)
      return
    }
    // traditional array-add
    let res = getParent(patch.path, json)
    if (isArray(res.parent)) {
      if (res.prop === '-') {
        res.parent.push(patch.value) //simple push
      } else if (isNumber(res.prop)) {
        res.parent.splice(res.prop, 0, patch.value) // splice into index
      }
    }
  },
  remove: (patch, json) => {},
  replace: (patch, json) => {},
  move: (patch, json) => {},
  copy: (patch, json) => {},
  test: (patch, json) => {},
}

const apply = function (patches, json) {
  if (!isArray(patches)) {
    patches = [patches]
  }
  patches.forEach(patch => {
    if (!actions[patch.op]) {
      return
    }
    actions[patch.op](patch, json)
  })
  return json
}
module.exports = apply
