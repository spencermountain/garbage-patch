const test = require('tape')
const { apply } = require('../src')

test('test-fail', function (t) {
  let json = { baz: 'qux' }
  let patch = [{ op: 'test', path: '/baz', value: 'bar' }]
  t.throws(() => {
    apply(patch, json)
  })
  t.end()
})

test('test-pass', function (t) {
  let json = {
    baz: 'qux',
    foo: ['a', 2, 'c'],
  }
  let patch = [
    { op: 'test', path: '/baz', value: 'qux' },
    { op: 'test', path: '/foo/1', value: 2 },
  ]
  t.doesNotThrow(() => {
    apply(patch, json)
  })
  t.end()
})

test('test-escape-order', function (t) {
  let json = {
    '/': 9,
    '~1': 10,
  }
  let patch = [{ op: 'test', path: '/~01', value: 10 }]
  t.doesNotThrow(() => {
    apply(patch, json)
  })
  t.end()
})

test('test-types', function (t) {
  let json = {
    '/': 9,
    '~1': 10,
  }
  let patch = [{ op: 'test', path: '/~01', value: '10' }]
  t.throws(() => {
    apply(patch, json)
  })
  t.end()
})
