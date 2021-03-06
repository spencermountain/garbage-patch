import get from '../get.js'

const test = (patch, json) => {
  let value = get(patch.path, json)
  if (JSON.stringify(value) !== JSON.stringify(patch.value)) {
    throw new Error(`garbage-patch error: patch-test failed '${patch.path}'`)
  }
}

export default test
