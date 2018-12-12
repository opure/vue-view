import axios from 'axios'
import Cookies from 'js-cookie'
import { TOKEN_KEY } from '@/libs/util'
import { Message } from 'iview'

class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }

  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //
      }
    }
    return config
  }

  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
    return this.queue.length
  }

  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      if (!config.url.includes('/oauth/token')) {
        config.headers['Authorization'] = 'Bearer ' + Cookies.get(TOKEN_KEY)
      }
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })

    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      const { data, status } = res
      /*    const is = this.destroy(url)
          if (!is) {
            setTimeout(() => {
              Spin.hide()
            }, 500)
          } */
      if (status !== 200) {
        if (status.code === 401) {
          Cookies.remove(TOKEN_KEY)
          window.location.href = window.location.pathname + '#/login'
          Message.error('未登录，或登录失效，请登录')
        } else {
          if (data.msg) Message.error(data.msg)
        }
        return false
      }
      return { data, status }
    }, error => {
      this.destroy(url)
      if (error.response.status === 401) {
        Cookies.remove(TOKEN_KEY)
        window.location.href = window.location.pathname + '#/login'
        Message.error('未登录，或登录失效，请登录')
      } else if (error.response.status === 400) {
        Cookies.remove(TOKEN_KEY)
        window.location.href = window.location.pathname + '#/login'
        Message.error('用户名或者密码错误!')
      } else {
        Message.error(error.message + '服务器内部错误')
      }
      return Promise.reject(error)
    })
  }

  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}

export default HttpRequest
