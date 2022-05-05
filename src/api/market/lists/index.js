import request from '@/utils/request'
// 活动列表
function findAllRecommends() {
  return request({
    url: '/lejuAdmin/homeRecommend/findAllRecommends',
  })
}
// 活动明细
function homeRecommend(recommendId) {
  return request({
    url: `/lejuAdmin/homeRecommend/${recommendId}`,
  })
}
// 删除活动
function delRecommend(recommendId) {
  return request({
    url: `/lejuAdmin/homeRecommend/delRecommend/${recommendId}`,
    method: "DELETE"
  })
}
// 添加活动
function addRecommend(data) {
  return request({
    url: `/lejuAdmin/homeRecommend/addRecommend`,
    method: "post",
    data
  })
}
// 修改活动
function updateRecommend(data) {
  return request({
    url: `/lejuAdmin/homeRecommend/updateRecommend`,
    method: "post",
    data
  })
}
// 查询品牌列表
function findAllBrand() {
  return request({
    url: `/lejuAdmin/brand/findAllBrand`,
  })
}
//查询热销商品
function productsByPage(start, limit, data) {
  return request({
    url: `/lejuAdmin/product/productsByPage/${start}/${limit}`,
    method: "post",
    data
  })
}


export {
  findAllRecommends,
  homeRecommend,
  delRecommend,
  addRecommend,
  updateRecommend,
  findAllBrand,
  productsByPage
}