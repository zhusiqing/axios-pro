import {
  get,
  post,
  put,
  del,
  patch
} from '@/http/ajax/api'

const initHttpPromise = (mappers, config) => {
  return Object.keys(mappers).reduce((current, now) => {
    const request = mappers[now]
    const httpPromise = current
    switch (now) {
      case 'gets':
        Object.keys(request).forEach(reqKey => {
          const url = request[reqKey]
          httpPromise[reqKey] = (params, options = config) => get(url, params, options)
        })
        break
      case 'posts':
        Object.keys(request).forEach(reqKey => {
          const url = request[reqKey]
          httpPromise[reqKey] = (params, options = config) => post(url, params, options)
        })
        break
      case 'puts':
        Object.keys(request).forEach(reqKey => {
          const url = request[reqKey]
          httpPromise[reqKey] = (params, options = config) => put(url, params, options)
        })
        break
      case 'dels':
        Object.keys(request).forEach(reqKey => {
          const url = request[reqKey]
          httpPromise[reqKey] = (params, options = config) => del(url, params, options)
        })
        break
      case 'patches':
        Object.keys(request).forEach(reqKey => {
          const url = request[reqKey]
          httpPromise[reqKey] = (params, options = config) => patch(url, params, options)
        })
        break
      default:
        break
    }
    return current
  }, {})
}

export default (options = {}) => {
  const { mappers, config } = options
  return initHttpPromise(mappers, config)
}
