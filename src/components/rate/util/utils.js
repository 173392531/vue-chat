export const hasClass = function (obj, cls) {
  return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

export function isObject (obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

export const kebabCase = function (str) {
  const hyphenateRE = /([^-])([A-Z])/g
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
}
