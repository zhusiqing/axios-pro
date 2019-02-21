## axios接口封装插件

- [axios-pro-demo](https://github.com/muzi131313/axios-pro-demo)

### 目的
- 错误处理
  - 统一错误处理, 统一UI提示
  - 超时处理
  - 后端正常返回的不同接口status统一的处理
- 统一token添加, 判断是否登录
- 请求loading动画
- 请求文件流处理, 以及文件名处理
  - 后台应在headers中添加filename的属性，值为文件名
- 接口工厂

### 用法

- init plugin

````
import axiosPro from 'axios-pro'
Vue.use(axiosPro, {
  mappers: {
    gets: {
      getDetail: '/id/detail',
      queryOrg: 'api/v1/society/seal/site/query/org'
    },
    posts: {
      // 函数的名字, 登陆的访问url
      login: '/login',
      proxyUrl: '/proxyUrl'
    },
    puts: {
      getDetail: '/id/detail'
    },
    dels: {
      getDetail: '/id/detail'
    },
    patches: {
      getDetail: '/id/detail'
    }
  },
  config: {
    handlers: {
      timeout (msg) {
        console.log('timeout: ', msg)
      },
      data (data = {}) {
        const code = data.code
        console.log('errorInfo: ', code)
      },
      error (errorInfo) {
        // 此处我使用的是 element UI 的提示组件
        // Message.error(`ERROR: ${err}`);
        console.log('errorInfo: ', errorInfo)
      },
      token (config) {
        // if (!Utils.isNotLogin()) {
        //     config.headers['X-Token'] = Utils.getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
        // } else {
        //     // 重定向到登录页面
        //     window.location.href = 'login'
        // }
      },
      loading: {
        // 是否开启动画, 默认关闭, 需要请求中主动开启
        open: false,
        start () {
          // UI开始loading动画
        },
        end () {
          // UI结束loading动画
        }
      }
    }
  }
})
````

- use plugin

````
async init () {
  // two params, one was `params`, second was `options` that cound be overwrite axios default options
  // if necessary, the second param `options` was not need transfer
  const resp = await this.$api.queryOrg({
    jsonConditions: {
      op: 'or',
      elements: [
        {
          param: 'name',
          op: 'contains',
          values: '北京'
        }
      ]
    }
  }, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    handlers: {
      data (data = {}) {
        const code = data.code
        // 根据返回的code值来做不同的处理（和后端约定）
        switch (code) {
          case '':
            break
          default:
            break
        }
        // 若不是正确的返回code，且已经登录，就抛出错误
        // const err = new Error(data.description)

        // err.data = data
        // err.response = response

        // throw err
      },
      loading: {
        // 是否开启动画, 默认关闭, 需要请求中主动开启
        open: true
      }
    }
  })
  console.log('resp: ', resp)
}
````

### 参考文献
- [使用 Webpack4.0 打包组件库并发布到 npm](https://juejin.im/post/5b5f260751882561da216b8a)
