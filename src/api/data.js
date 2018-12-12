import axios from '@/libs/api.request'

export const getTableData = (param = {}) => {
  return axios.request({
    url: '/review/all_list',
    params: param,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'get'
  })
}

export const getCommentList = (param = {}) => {
  return axios.request({
    url: '/review/system_list',
    params: param,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'get'
  })
}

export const errorReq = () => {
  return axios.request({
    url: 'error_url',
    method: 'post'
  })
}

export const saveErrorLogger = info => {
  return axios.request({
    url: 'save_error_logger',
    data: info,
    method: 'post'
  })
}

export const uploadImg = formData => {
  return axios.request({
    url: 'image/upload',
    data: formData
  })
}
