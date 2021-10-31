import { isArray } from './_helper.js'
import add from './actions/add.js'
import remove from './actions/remove.js'
import replace from './actions/replace.js'
import move from './actions/move.js'
import copy from './actions/copy.js'
import test from './actions/test.js'

const actions = {
  add,
  remove,
  replace,
  move,
  copy,
  test,
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
export default apply
