import test from 'tape'
import { apply } from '../src/index.js'

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
