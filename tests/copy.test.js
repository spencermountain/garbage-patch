const test = require('tape')
const { apply } = require('../src')

test('copy array', function (t) {
  let json = { foo: ['bar'] }
  let patch = { op: 'copy', from: '/foo', path: '/a' }
  let want = { foo: ['bar'], a: ['bar'] }
  apply(patch, json)
  t.deepEqual(json, want)
  t.end()
})

test('copy object', function (t) {
  let json = { foo: { bar: true } }
  let patch = { op: 'copy', from: '/foo', path: '/a' }
  let want = { foo: { bar: true }, a: { bar: true } }
  apply(patch, json)
  t.deepEqual(json, want)
  t.end()
})
