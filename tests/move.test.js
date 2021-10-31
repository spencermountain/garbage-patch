import test from 'tape'
import { apply } from '../src/index.js'

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

test('move array', function (t) {
  let json = { foo: ['all', 'grass', 'cows', 'eat'] }
  let patch = [{ op: 'move', from: '/foo/1', path: '/foo/3' }]
  let want = { foo: ['all', 'cows', 'eat', 'grass'] }
  apply(patch, json)
  t.deepEqual(json, want)
  t.end()
})
