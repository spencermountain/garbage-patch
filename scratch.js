import { get, make, apply, getParent } from './src/index.js'

let json = {
  foo: ['bar', 'baz'],
  cool: true,
}

// console.log(getParent('/cool/asdf', json))

//let patch= { "op": "test", "path": "/a/b/c", "value": "foo" }
// let patch = { op: 'remove', path: '/a/b/c' }
// let patch = { op: 'add', path: '/a/b/c', value: ['foo', 'bar'] }
//let patch= { "op": "replace", "path": "/a/b/c", "value": 42 }
//let patch= { "op": "move", "from": "/a/b/c", "path": "/a/b/d" }
//let patch= { "op": "copy", "from": "/a/b/d", "path": "/a/b/e"

// let patch = { op: 'add' }
// console.log(apply(patch, json))

// console.log(get('/foo/1', json))
// console.log(get(['foo', 1], json))
console.log(get([], json))
