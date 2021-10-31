import test from 'tape'
import { apply } from '../src/index.js'

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
