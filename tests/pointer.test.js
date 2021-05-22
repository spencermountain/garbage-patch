const test = require('tape')
const { get } = require('../src')

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
