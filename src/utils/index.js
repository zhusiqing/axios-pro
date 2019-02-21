/**
 * @name combine
 * @desc 合并obj
 *  var a = { a: 123 }; var b = { b: 333 };
 *  var c = combine(a, b); // { a: 123, b: 333 }
 * @param {object} objA
 * @param {object} objB
 * @createTime 2019年02月21日16:08:38
 */
var combine = function(objA, objB) {
  var objs = [objA, objB]
  objs = objs.sort(function (a, b) {
    return Object.keys(b).length - Object.keys(a).length
  })
  var baseObj = objs[0]
  var baseKeys = Object.keys(baseObj)
  var obj = {}
  baseKeys.forEach(function (baseKey) {
    obj[baseKey] = objs.reduce(function (cur, obj) {
      return Object.assign(cur, obj[baseKey])
    }, {})
  })
  return obj
}

module.exports = {
  combine
}
