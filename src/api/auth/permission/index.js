import request from '@/utils/request'
// 查询所有菜单
function findAllPermissions() {
  return request({
    url: `/admin/sysAuth/permission/findAllPermissions`,
  })
}

// 删除菜单权限
function remove(id) {
  return request({
    url: `/admin/sysAuth/permission/remove/${id}`,
    method: "DELETE"
  })
}

// 新增菜单权限
function save(data) {
  return request({
    url: `/admin/sysAuth/permission/save`,
    method: "post",
    data
  })
}
// 初始化菜单权限
function saveInitMenus(data) {
  return request({
    url: `/admin/sysAuth/permission/saveInitMenus`,
    method: "post",
    data
  })
}

export {
  findAllPermissions,
  remove,
  save,
  saveInitMenus
}