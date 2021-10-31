import test from 'tape'
import { get } from '../src/index.js'

test('get', function (t) {
  let json = {
    foo: ['bar', 'baz'],
    cool: true,
  }

  let fromPtr = get('/foo/1', json)
  let fromArr = get(['foo', 1], json)
  t.deepEqual(fromPtr, fromArr)

  fromPtr = get('/foo', json)
  fromArr = get(['foo'], json)
  t.deepEqual(fromPtr, fromArr)

  fromPtr = get('cool', json)
  fromArr = get(['cool'], json)
  t.deepEqual(fromPtr, fromArr)

  fromPtr = get('/foob', json)
  fromArr = get(['foob'], json)
  t.deepEqual(fromPtr, fromArr)

  fromPtr = get('', json)
  fromArr = get([], json)
  t.deepEqual(fromPtr, fromArr)

  fromPtr = get('/', json)
  fromArr = get([], json)
  t.deepEqual(fromPtr, fromArr)

  fromPtr = get('3', json)
  fromArr = get([3], json)
  t.deepEqual(fromPtr, fromArr)

  t.end()
})
