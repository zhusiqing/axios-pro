var axios = require('axios')
var config = require('../config') // 倒入默认配置
var request = require('./interceptors/request')
var response = require('./interceptors/response')

// (type, url, param, opts)
module.exports = function (options) {
  return new Promise((resolve, reject) => {
    var { baseURL, headers } = config
    // support override headers from methods
    options = Object.assign(config, options)

    var instance = axios.create({
      baseURL,
      headers,
      transformResponse: [ data => {
        return data
      } ]
    })

    // request interceptor
    instance = request(instance, options)

    // response interceptor
    instance = response(instance, options)

    // 请求处理
    return instance(options)
      .then(res => {
        // console.log('res: ', res)
        const data = Object.prototype.toString.call(res.data) === '[object String]'
          ? JSON.parse(res.data)
          : res.data
        resolve(data)
        return res
      })
      .catch(error => {
        reject(error)
      })
      .finally(() => {
        if (options.handlers
          && options.handlers.loading
          && options.handlers.loading.open) {
          options.handlers
          && options.handlers.loading
          && options.handlers.loading.end
          && options.handlers.loading.end()
        }
      })
  })
}
