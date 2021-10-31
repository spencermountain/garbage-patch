import get from '../get.js'
import remove from './remove.js'
import add from './add.js'

const move = (patch, json) => {
  let value = get(patch.from, json)
  //  remove it
  let removePatch = { op: 'remove', path: patch.from }
  remove(removePatch, json)

  let addPatch = { op: 'add', path: patch.path, value: value }
  add(addPatch, json)
}

export default move
