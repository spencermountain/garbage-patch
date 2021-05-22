// https://datatracker.ietf.org/doc/html/rfc6901
// '~' is encoded as '~0'
// '/' is encoded as '~1'
const escape = function (str) {
  str = str.replace(/~[^01]/g, '~0')
  str = str.replace(/\//g, '~1')
  return str
}
const make = function (props) {
  if (!props || props.length === 0) {
    return ''
  }
  props = props.map(prop => {
    prop = String(prop)
    return escape(prop)
  })
  return '/' + props.join('/')
}
module.exports = make
