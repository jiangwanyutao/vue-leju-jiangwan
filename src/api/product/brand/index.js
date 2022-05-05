import request from '@/utils/request'
// 查询品牌列表
function findAllBrand() {
  return request({
    url: '/lejuAdmin/brand/findAllBrand', 
  })
}
//删除品牌
function delBrand(id) {
  return request({
    url: `/lejuAdmin/brand/delBrand/${id}`,
    method: "DELETE"
  })
}
//品牌显示隐藏
function switchShowStatus(data) {
  return request({
    url: `/lejuAdmin/brand/switchShowStatus`,
    method: "post",
    data
  })
}
//新增品牌
function addBrand(data) {
  return request({
    url: `/lejuAdmin/brand/addBrand`,
    method: "post",
    data
  })
}
//更新品牌
function updateBrand(data) {
  return request({
    url: `/lejuAdmin/brand/updateBrand`,
    method: "post",
    data
  })
}

export {
  findAllBrand,
  delBrand,
  switchShowStatus,
  addBrand,
updateBrand
}