/**
 * @file index.js
 * @desc {{description}}{{http暴露接口}}
 * @createTime 2018年11月03日18:09:33
 * @doc
 *  npm run build && git add -A dist
 *  npm version patch
 */
import httpPromise from '@/promise'
import { combine } from '@/utils'

const axiosPro = {}

const install = (Vue, options) => {
  if (install.installed) {
    return
  }
  install.installed = true

  // TODO: 1.区分不同模块
  // TODO: 2.mapper应该作为参数引入
  // Object.defineProperties未生效
  // doc: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties
  // 注意哦，此处挂载在 Vue 原型的 $api 对象上
  Vue.prototype.$api = httpPromise(options)
}

// 自动安装 方便打包成压缩文件, 用<script scr=''></script>的方式引用
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

axiosPro.install = install
axiosPro.combine = combine

module.exports = axiosPro
