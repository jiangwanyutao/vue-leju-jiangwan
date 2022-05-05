// 此处使用localstorage而不使用 vuex是因为pc端可以手动刷新页面, vuex存储的数据会丢失

const TokenKey = 'vue-leju-token'

const UserInfo = 'vue-leju-UserInfo'

// 读取token
export function getToken() {
  return localStorage.getItem(TokenKey)
}
//存储token
export function setToken(token) {
  localStorage.setItem(TokenKey, token)
}
//删除token
export function removeToken() {
  localStorage.removeItem(TokenKey)
}

// 读取个人信息
export function getUserInfo() {
  return JSON.parse(localStorage.getItem(UserInfo))
}
//存储个人信息
export function setUserInfo(info) {
  localStorage.setItem(UserInfo, JSON.stringify(info))
}
//删除个人信息
export function removeUserInfo() {
  localStorage.removeItem(UserInfo)
}

// 合并
//删除个人信息
export function clear() {
  return  localStorage.clear()
}
