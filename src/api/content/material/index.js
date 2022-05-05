import request from '@/utils/request'
// 查询素材列表
function findMaterialByPage(start, limit) {
  return request({
    url: `/lejuAdmin/material/findMaterialByPage/${start}/${limit}`,
  })
}
//删除列表
function delMaterial(id) {
  return request({
    url: `/lejuAdmin/material/delMaterial/${id}`,
    method: "DELETE"
  })
}


export {
  findMaterialByPage,
  delMaterial
}
