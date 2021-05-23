const test = require('tape')
const { apply } = require('../src')

test('replace object', function (t) {
  let json = {
    baz: 'qux',
    foo: 'bar',
  }
  let patch = [{ op: 'replace', path: '/baz', value: 'boo' }]
  let want = {
    baz: 'boo',
    foo: 'bar',
  }
  apply(patch, json)
  t.deepEqual(json, want)
  t.end()
})

test('replace array', function (t) {
  let json = { foo: ['bar', 'qux'] }
  let patch = [{ op: 'replace', path: '/foo/1', value: 'baz' }]
  let want = { foo: ['bar', 'baz'] }
  apply(patch, json)
  t.deepEqual(json, want)
  t.end()
})

test('remove object', function (t) {
  let json = {
    baz: 'qux',
    foo: 'bar',
  }
  let patch = [{ op: 'remove', path: '/baz' }]
  let want = { foo: 'bar' }
  apply(patch, json)
  t.deepEqual(json, want)
  t.end()
})

test('remove array', function (t) {
  let json = { foo: ['bar', 'qux', 'baz'] }
  let patch = [{ op: 'remove', path: '/foo/1' }]
  let want = { foo: ['bar', 'baz'] }
  apply(patch, json)
  t.deepEqual(json, want)
  t.end()
})

test('move object', function (t) {
  let json = {
    foo: {
      bar: 'baz',
      waldo: 'fred',
    },
    qux: {
      corge: 'grault',
    },
  }
  let patch = [{ op: 'move', from: '/foo/waldo', path: '/qux/thud' }]
  let want = {
    foo: {
      bar: 'baz',
    },
    qux: {
      corge: 'grault',
      thud: 'fred',
    },
  }
  apply(patch, json)
  t.deepEqual(json, want)
  t.end()
})
