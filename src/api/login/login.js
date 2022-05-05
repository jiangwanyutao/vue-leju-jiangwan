import request from '@/utils/request'
// 登录接口
function login(data) {
  return request({
    url: '/lejuAdmin/index/login',
    method: 'POST',
    data
  })
}
export {
  login
}
