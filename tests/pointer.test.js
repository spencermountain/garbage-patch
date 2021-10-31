import test from 'tape'
import { get } from '../src/index.js'

let obj = {
  foo: ['bar', 'baz'],
  '': 0,
  'a/b': 1,
  'c%d': 2,
  'e^f': 3,
  'g|h': 4,
  'i\\j': 5,
  'k"l': 6,
  ' ': 7,
  'm~n': 8,
}

// from spec https://datatracker.ietf.org/doc/html/rfc6901
test('get', function (t) {
  let tests = [
    ['', obj], // the whole document
    ['/foo', ['bar', 'baz']],
    ['/foo/0', 'bar'],
    ['/', 0],
    // escaping
    ['/a~1b', 1],
    ['/c%d', 2],
    ['/e^f', 3],
    ['/g|h', 4],
    ['/i\\j', 5],
    ['/k"l', 6],
    ['/ ', 7],
    ['/m~0n', 8],
    // spencer
    ['/foo/-', 'baz'],
  ]
  tests.forEach(a => {
    let res = get(a[0], obj)
    t.deepEqual(res, a[1], a[0])
  })
  t.end()
})

test('misc', function (t) {
  let json = {
    nice: true,
    foo: ['bar', 'baz'],
    cool: {
      yes: {
        oh: 'yeah',
      },
    },
  }
  t.equal(get('/nice', json), true, 'no-trailing-slash')
  t.equal(get('/nice/', json), true, 'trailing-slash-one')

  t.equal(get('/cool/yes/oh', json), 'yea', 'three-step')
  t.equal(get('/cool/yes/oh/', json), 'yea', 'trailing-slash-deep')
  t.equal(get('/cool/wrong/yes/oh', json), undefined, 'no-skip-step')
  t.end()
})
