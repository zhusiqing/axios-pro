import axios from 'axios'
import config from '@/config' // 倒入默认配置
import request from '@/ajax/interceptors/request'
import response from '@/ajax/interceptors/response'

// (type, url, param, opts)
export default options => {
  return new Promise((resolve, reject) => {
    let { baseURL, headers } = config
    // support override headers from methods
    options = Object.assign(config, options)

    let instance = axios.create({
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
        resolve(res)
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
