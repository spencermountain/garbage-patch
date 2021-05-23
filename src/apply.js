const { isArray } = require('./_helper')

const actions = {
  add: require('./actions/add'),
  remove: require('./actions/remove'),
  replace: require('./actions/replace'),
  move: require('./actions/move'),
  copy: (patch, json) => {},
  test: require('./actions/test'),
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
