const { isArray } = require('./_helper')

const actions = {
  add: require('./actions/add'),
  remove: require('./actions/remove'),
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
