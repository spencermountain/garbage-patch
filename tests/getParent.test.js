import test from 'tape'
import { getParent, get } from '../src/index.js'

test('getParent', function (t) {
  let json = {
    nice: true,
    foo: ['bar', 'baz'],
    cool: {
      yes: {
        oh: 'yeah',
      },
    },
  }
  t.deepEqual(getParent('/', json).parent, json, 'allow root')
  t.deepEqual(getParent('', json).parent, json, 'allow full')
  // nesting
  t.deepEqual(getParent('/cool', json).parent, json, 'nest-1')
  let cool = get('/cool', json)
  t.deepEqual(getParent('/cool/yes', json).parent, cool, 'nest-2')
  let yes = get('/cool/yes', json)
  t.deepEqual(getParent('/cool/yes/oh', json).parent, yes, 'nest-3')
  // array parent
  let foo = get('/foo', json)
  t.deepEqual(getParent('/foo/1', json).parent, foo, 'nest-arr')
  t.deepEqual(getParent('/foo/-', json).parent, foo, 'nest-last')
  t.end()
})
