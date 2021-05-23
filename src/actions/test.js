const get = require('../get')

const test = (patch, json) => {
  let value = get(patch.path, json)
  if (JSON.stringify(value) !== JSON.stringify(patch.value)) {
    throw new Error(`simple-json-patch error: patch-test failed '${patch.path}'`)
  }
}

module.exports = test
