import axios from 'axios'
import {
  MessageBox,
  Message
} from 'element-ui' // ui 中的消息提示
import store from '@/store'
// import {
//   getToken
// } from '@/utils/auth'

// 导入我们自己写的方法
import {
  getToken
} from '@/utils/myauth'
//导入清除本地存储
import { clear } from "@/utils/myauth"

//导入路由
import router from "@/router/index"

// create an axios instance
// 配置跨域后打包项目,跨域配置是webpack在开发阶段提供的一种方法,   打包后需要配置 baseurl  否则打包后项目不能使用
const service = axios.create({
  baseURL: 'http://leju.bufan.cloud', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor // 请求前的一个打断函数
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // 在请求体和请求头做一些操作 携带token验证
    // if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
    config.headers['token'] = getToken()
    // }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 20000) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      // 判断请求异常 清除本地存储token 重置到登录页面
       if (res.code == 20002) {
         clear()
         router.push('/login')
      }
      

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
