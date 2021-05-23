const test = require('tape')
const { apply } = require('../src')

test('normal add array', function (t) {
  let json = { foo: ['bar', 'baz'] }
  let patch = [{ op: 'add', path: '/foo/1', value: 'qux' }]
  let want = { foo: ['bar', 'qux', 'baz'] }
  apply(patch, json)
  t.deepEqual(json, want)
  t.end()
})
test('normal add append array', function (t) {
  let json = { foo: ['bar', 'baz'] }
  let patch = [{ op: 'add', path: '/foo/-', value: 'qux' }]
  let want = { foo: ['bar', 'baz', 'qux'] }
  apply(patch, json)
  t.deepEqual(json, want)
  t.end()
})

test('normal add object', function (t) {
  let json = { foo: 'bar' }
  let patch = [{ op: 'add', path: '/baz', value: 'qux' }]
  apply(patch, json)
  let want = {
    baz: 'qux',
    foo: 'bar',
  }
  t.deepEqual(json, want)
  t.end()
})

test('normal add grandchild', function (t) {
  let json = { foo: 'bar' }
  let patch = [{ op: 'add', path: '/child', value: { grandchild: {} } }]
  apply(patch, json)
  let want = {
    foo: 'bar',
    child: {
      grandchild: {},
    },
  }
  t.deepEqual(json, want)
  t.end()
})

test('normal add ignore', function (t) {
  let json = { foo: 'bar' }
  let patch = [{ op: 'add', path: '/baz', value: 'qux', xyz: 123 }]
  apply(patch, json)
  let want = {
    foo: 'bar',
    baz: 'qux',
  }
  t.deepEqual(json, want)
  t.end()
})

// this throws in the spec
test('add ignore 2', function (t) {
  let json = { foo: 'bar' }
  let patch = [{ op: 'add', path: '/baz/bat', value: 'qux' }]
  apply(patch, json)
  let want = { foo: 'bar' }
  t.deepEqual(json, want)
  t.end()
})

test('sneaky append', function (t) {
  let json = { full: true, foo: [1] }
  let patch = { op: 'add', path: '/foo/', value: 2 }
  apply(patch, json)
  t.equal(json.foo[1], 2, 'append')
  t.end()
})

test('sneaky splat', function (t) {
  let json = { foo: { bar: true } }
  let patch = { op: 'add', path: '/foo', value: { baz: true } }
  apply(patch, json)
  t.equal(json.foo.baz, true, 'sneaky merge')
  t.end()
})

test('sneaky splat - overwrite', function (t) {
  let json = { foo: { bar: true } }
  let patch = { op: 'add', path: '/foo', value: { bar: false } }
  apply(patch, json)
  t.equal(json.foo.bar, false, 'sneaky overwrite')
  t.end()
})
