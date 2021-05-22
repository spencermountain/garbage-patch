exports.isArray = arr => {
  return Object.prototype.toString.call(arr) === '[object Array]'
}

exports.isBoolean = val => {
  return typeof val === 'boolean'
}

exports.isNumber = val => {
  return typeof val === 'number' && isFinite(val)
}

exports.isString = val => {
  return typeof val === 'string'
}

exports.isObject = val => {
  return Object.prototype.toString.call(val) === '[object Object]'
}
