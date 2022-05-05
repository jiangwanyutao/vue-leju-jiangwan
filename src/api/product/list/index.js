import request from '@/utils/request'
// 查询列表
function productsByPage(start, limit,data) {
  return request({
    url: `/lejuAdmin/product/productsByPage/${start}/${limit}`,
    method: "post",
    data
  })
}
//查询品牌列表
function findAllBrand() {
  return request({
    url: `/lejuAdmin/brand/findAllBrand`,
  })
}
//删除商品列表
function del(productId) {
  return request({
    url: `/lejuAdmin/product/del/${productId}`,
    method: "DELETE"
  })
}
// 更改是否最新
function switchNewStatus(data) {
  return request({
    url: `/lejuAdmin/product/switchNewStatus`,
    method: "post",
    data
  })
}
// 更改是否预告
function switchPreviewStatus(data) {
  return request({
    url: `/lejuAdmin/product/switchPreviewStatus`,
    method: "post",
    data
  })
}
// 更改是发布状态
function switchPublishStatus(data) {
  return request({
    url: `/lejuAdmin/product/switchPublishStatus`,
    method: "post",
    data
  })
} 
// 是否推荐
function switchRecommandStatus(data) {
  return request({
    url: `/lejuAdmin/product/switchRecommandStatus`,
    method: "post",
    data
  })
}
// 更改审核状态
function switchVerifyStatus(data) {
  return request({
    url: `/lejuAdmin/product/switchVerifyStatus`,
    method: "post",
    data
  })
}
// 更改商品信息
function updateProductAndSkus(data) {
  return request({
    url: `/lejuAdmin/product/updateProductAndSkus`,
    method: "post",
    data
  })
}
//获取详情
function productSkusDetail(productId) {
  return request({
    url: `/lejuAdmin/product/productSkusDetail/${productId}`,
  })
}
//新增商品信息
function addProductAndSkus(data) {
  return request({
    url: `/lejuAdmin/product/addProductAndSkus`,
    method: 'post',
    data
  })
}
export {
  productsByPage,
  findAllBrand,
  del,
  switchNewStatus,
  switchPreviewStatus,
  switchPublishStatus,
  switchRecommandStatus,
  switchVerifyStatus,
  updateProductAndSkus,
  productSkusDetail,
  addProductAndSkus,
}