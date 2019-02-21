var api = require('./ajax/api')

var get = api.get
var post = api.post
var put = api.put
var del = api.del
var patch = api.patch

var initHttpPromise = function (mappers, config) {
  return Object.keys(mappers).reduce(function (current, now) {
    const request = mappers[now]
    const httpPromise = current
    switch (now) {
      case 'gets':
        Object.keys(request).forEach(function (reqKey) {
          var url = request[reqKey]
          httpPromise[reqKey] = function (params, options = config) {
            return get(url, params, options)
          }
        })
        break
      case 'posts':
        Object.keys(request).forEach(function (reqKey) {
          var url = request[reqKey]
          httpPromise[reqKey] = function (params, options = config) {
            return post(url, params, options)
          }
        })
        break
      case 'puts':
        Object.keys(request).forEach(function(reqKey) {
          var url = request[reqKey]
          httpPromise[reqKey] = function (params, options = config) {
            return put(url, params, options)
          }
        })
        break
      case 'dels':
        Object.keys(request).forEach(function (reqKey) {
          var url = request[reqKey]
          httpPromise[reqKey] = function (params, options = config) {
            return del(url, params, options)
          }
        })
        break
      case 'patches':
        Object.keys(request).forEach(function (reqKey) {
          var url = request[reqKey]
          httpPromise[reqKey] = function (params, options = config) {
            return patch(url, params, options)
          }
        })
        break
      default:
        break
    }
    return current
  }, {})
}

module.exports = function promise(options) {
  options = options || {}
  const { mappers, config } = options
  return initHttpPromise(mappers, config)
}
