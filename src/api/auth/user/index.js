import request from '@/utils/request'
// 地址列表
function findAllRoles() {
  return request({
    url: `/admin/sysAuth/role/findAllRoles`,
  })
}
// 获取用户列表
function findUsersByPage(start, limit, data) {
  return request({
    url: `/admin/sysAuth/user/findUsersByPage/${start}/${limit}`,
    method: "post",
    data
  })
}
//编辑获取用户明细
function user(id) {
  return request({
    url: `/admin/sysAuth/user/${id}`,
  })
}
//删除用户
function removeUser(id) {
  return request({
    url: `/admin/sysAuth/user/removeUser/${id}`,
    method: "DELETE"
  })
}
//更新用户
function updateUserRoles(data) {
  return request({
    url: `/admin/sysAuth/user/updateUserRoles`,
    method: "PUT",
    data
  })
}
//新增用户
function saveUserRoles(data) {
  return request({
    url: `/admin/sysAuth/user/saveUserRoles`,
    method: "post",
    data
  })
}

export {
  findAllRoles,
  findUsersByPage,
  user,
  removeUser,
  updateUserRoles,
   saveUserRoles

}