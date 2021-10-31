import get from '../get.js'
import add from './add.js'

const copy = (patch, json) => {
  let value = get(patch.from, json)
  let addPatch = { op: 'add', path: patch.path, value: value }
  add(addPatch, json)
}

export default copy
