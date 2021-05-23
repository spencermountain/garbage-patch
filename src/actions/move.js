const get = require('../get')
const remove = require('./remove')
const add = require('./add')

const move = (patch, json) => {
  let value = get(patch.from, json)
  //  remove it
  let removePatch = { op: 'remove', path: patch.from }
  remove(removePatch, json)

  let addPatch = { op: 'add', path: patch.path, value: value }
  add(addPatch, json)
}

module.exports = move
