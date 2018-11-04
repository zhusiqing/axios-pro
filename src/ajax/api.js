import ajax from '@/http/ajax'

/**
 * @name get
 * @param url string 请求url
 * @param params object 请求参数
 * @createTime 2018年11月04日00:15:02
 */
export const get = (url, params, options = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}) => ajax(Object.assign({
  url,
  params,
  method: 'get'
}, options))

/**
 * @name post
 * @param url string 请求url
 * @param params object 请求参数
 * @createTime 2018年11月04日00:15:02
 */
export const post = (url, params, options = {}) => ajax(Object.assign({
  url,
  params,
  method: 'post'
}, options))

/**
 * @name put
 * @param url string 请求url
 * @param params object 请求参数
 * @createTime 2018年11月04日00:15:02
 */
export const put = (url, params, options = {}) => ajax(Object.assign({
  url,
  params,
  method: 'put'
}, options))

/**
 * @name delete
 * @param url string 请求url
 * @param params object 请求参数
 * @createTime 2018年11月04日00:15:02
 */
export const del = (url, params, options = {}) => ajax(Object.assign({
  url,
  params,
  method: 'delete'
}, options))

/**
 * @name patch
 * @param url string 请求url
 * @param params object 请求参数
 * @createTime 2018年11月04日00:15:02
 */
export const patch = (url, params, options = {}) => ajax(Object.assign({
  url,
  params,
  method: 'patch'
}, options))
