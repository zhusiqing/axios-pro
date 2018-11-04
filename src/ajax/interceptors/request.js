import qs from 'qs' // 序列化请求数据，视服务端的要求

const stringifyTypes = ['post', 'put', 'patch', 'delete']

export default (instance, config) => {
  // request 拦截器
  instance.interceptors.request.use(
    config => {
      // Tip: 1
      // 请求开始的时候可以结合 vuex 开启全屏的 loading 动画
      if (config.handlers
        && config.handlers.loading
        && config.handlers.loading.open) {
        config.handlers
          && config.handlers.loading
          && config.handlers.loading.start
          && config.handlers.loading.start()
      }

      // Tip: 2
      // 带上 token , 可以结合 vuex 或者重 localStorage
      // if (store.getters.token) {
      //     config.headers['X-Token'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
      // } else {
      //     // 重定向到登录页面
      // }
      config.handlers && config.handlers.token && config.handlers.token(config)

      // Tip: 3
      // TODO: 根据请求方法，序列化传来的参数，根据后端需求是否序列化
      let { method, params } = config
      method = method.toLocaleLowerCase()
      if (~stringifyTypes.indexOf(method)) {
        config.data = qs.stringify(params)
        delete config.params
      }
      return config
    },
    error => {
      // 请求错误时做些事(接口错误、超时等)
      // Tip: 4
      // 关闭loadding
      // console.log('request:', error)

      //  1.判断请求超时
      if (error.code === 'ECONNABORTED'
        && error.message.indexOf('timeout') !== -1) {
        console.log('根据你设置的timeout/真的请求超时 判断请求现在超时了，你可以在这里加入超时的处理方案')
        config.handlers && config.handlers.timeout && config.handlers.timeout(error.message)
        // return service.request(originalRequest);//例如再重复请求一次
      }
      //  2.需要重定向到错误页面
      // const errorInfo = error.response
      // // console.log(errorInfo);
      // if (errorInfo) {
      //   // error =errorInfo.data//页面那边catch的时候就能拿到详细的错误信息,看最下边的Promise.reject
      //   const errorStatus = errorInfo.status // 404 403 500 ... 等
      //   router.push({
      //     path: `/error/${errorStatus}`
      //   })
      // }
      return Promise.reject(error) // 在调用的那边可以拿到(catch)你想返回的错误信息
    }
  )
  return instance
}
