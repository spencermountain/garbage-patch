const isArray = function (arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}

const isBoolean = function (val) {
  return typeof val === 'boolean'
}

const isNumber = function (val) {
  return typeof val === 'number' && isFinite(val)
}

const isString = function (val) {
  return typeof val === 'string'
}

const isObject = function (val) {
  return Object.prototype.toString.call(val) === '[object Object]'
}

export { isArray, isBoolean, isNumber, isString, isObject }