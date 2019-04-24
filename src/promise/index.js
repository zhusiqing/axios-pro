var api = require('../ajax/api')
var utils = require('../utils')

var get = api.get
var post = api.post
var put = api.put
var del = api.del
var patch = api.patch

var transURL = function (url, urlParams) {
  var urlType = utils.objType(url)
  return urlType === 'function' ? url(urlParams) : url
}

var initHttpPromise = function (mappers, config) {
  return Object.keys(mappers).reduce(function (current, now) {
    const request = mappers[now]
    const httpPromise = current
    switch (now) {
      case 'gets':
        Object.keys(request).forEach(function (reqKey) {
          var url = request[reqKey]
          httpPromise[reqKey] = function (params, options, urlParams) {
            options = options || config
            url = transURL(url, urlParams)
            return get(url, params, options)
          }
        })
        break
      case 'posts':
        Object.keys(request).forEach(function (reqKey) {
          var url = request[reqKey]
          httpPromise[reqKey] = function (params, options, urlParams) {
            options = options || config
            url = transURL(url, urlParams)
            return post(url, params, options)
          }
        })
        break
      case 'puts':
        Object.keys(request).forEach(function(reqKey) {
          var url = request[reqKey]
          httpPromise[reqKey] = function (params, options, urlParams) {
            options = options || config
            url = transURL(url, urlParams)
            return put(url, params, options)
          }
        })
        break
      case 'dels':
        Object.keys(request).forEach(function (reqKey) {
          var url = request[reqKey]
          httpPromise[reqKey] = function (params, options, urlParams) {
            options = options || config
            url = transURL(url, urlParams)
            return del(url, params, options)
          }
        })
        break
      case 'patches':
        Object.keys(request).forEach(function (reqKey) {
          var url = request[reqKey]
          httpPromise[reqKey] = function (params, options, urlParams) {
            options = options || config
            url = transURL(url, urlParams)
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
