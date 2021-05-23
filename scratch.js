const { get, make, apply, getParent } = require('./src')

// let json = {
//   foo: ['bar', 'baz'],
//   cool: true,
// }

// console.log(getParent('/cool/asdf', json))

//let patch= { "op": "test", "path": "/a/b/c", "value": "foo" }
// let patch = { op: 'remove', path: '/a/b/c' }
// let patch = { op: 'add', path: '/a/b/c', value: ['foo', 'bar'] }
//let patch= { "op": "replace", "path": "/a/b/c", "value": 42 }
//let patch= { "op": "move", "from": "/a/b/c", "path": "/a/b/d" }
//let patch= { "op": "copy", "from": "/a/b/d", "path": "/a/b/e"

// let patch = { op: 'add' }
// console.log(apply(patch, json))

let json = {
  '/': 9,
  '~1': 10,
}

let patch = [{ op: 'test', path: '/~01', value: 10 }]

let want = {
  '/': 9,
  '~1': 10,
}

apply(patch, json)
console.log(json)
