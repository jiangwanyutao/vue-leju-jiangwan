import request from '@/utils/request'
// 查询所有角色
function findAllRoles() {
  return request({
    url: `/admin/sysAuth/role/findAllRoles`,
  })
}
// 获取角色明细
function findRolePermissions(id) {
  return request({
    url: `/admin/sysAuth/role/findRolePermissions/${id}`,
  })
}
// 获取角色分页
function findRolesByPage(start, limit) {
  return request({
    url: `/admin/sysAuth/role/findRolesByPage/${start}/${limit}`,
  })
}
// 查询所有菜单
function findAllPermissions() {
  return request({
    url: `/admin/sysAuth/permission/findAllPermissions`,
  })
}
// 删除角色
function removeRole(id) {
  return request({
    url: `/admin/sysAuth/role/removeRole/${id}`,
    method: "DELETE"
  })
}
// 新增角色
function saveRolePermissions(data) {
  return request({
    url: `/admin/sysAuth/role/saveRolePermissions`,
    method: "post",
    data
  })
}
// 更新角色和权限
function updateRolePermissions(data) {
  return request({
    url: `/admin/sysAuth/role/updateRolePermissions`,
    method: "PUT",
    data
  })
}

export {
  findAllRoles,
  findRolePermissions,
  findRolesByPage,
  findAllPermissions,
  removeRole,
  saveRolePermissions,
  updateRolePermissions
}