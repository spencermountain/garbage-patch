const get = require('../get')
const add = require('./add')

const copy = (patch, json) => {
  let value = get(patch.from, json)
  let addPatch = { op: 'add', path: patch.path, value: value }
  add(addPatch, json)
}

module.exports = copy
