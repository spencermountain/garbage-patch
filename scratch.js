const { get, make, apply } = require('./src')

// let json = {
//   foo: ['bar', 'baz'],
//   cool: true,
// }

// let ptr = make(['foo', 1])
// console.log(get(ptr, json))

//let patch= { "op": "test", "path": "/a/b/c", "value": "foo" }
// let patch = { op: 'remove', path: '/a/b/c' }
// let patch = { op: 'add', path: '/a/b/c', value: ['foo', 'bar'] }
//let patch= { "op": "replace", "path": "/a/b/c", "value": 42 }
//let patch= { "op": "move", "from": "/a/b/c", "path": "/a/b/d" }
//let patch= { "op": "copy", "from": "/a/b/d", "path": "/a/b/e"

// let patch = { op: 'add' }
// console.log(apply(patch, json))

let json = { foo: { bar: true } }
let patch = { op: 'add', path: '/foo', value: { hey: true } }
apply(patch, json) //this would normally be an error, i think.
console.log(json)
