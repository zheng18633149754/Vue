import axios from 'axios'
// import store from './store/store'
import {router} from './router/router'
import Cookies from 'js-cookie'

// axios 配置
axios.defaults.timeout = 5000 // 请求超时
// axios.defaults.baseURL = 'http://www.baidu.com' // axios 请求地址

// http request 拦截器
axios.interceptors.request.use(
  config => {
    // store state 中获取 token
    if (Cookies.get('token')) {
      config.headers.Authorization = 'Bearer ' + Cookies.get('token')
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          // store.commit(types.LOGOUT)
          router.replace({
            path: 'login',
            query: { redirect: router.currentRoute.fullPath }
          })
      }
    }
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    return Promise.reject(error.response.data)
  }
)

export default axios
