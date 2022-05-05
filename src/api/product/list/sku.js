import request from '@/utils/request'
// 删除sku
function delSku(skuId) {
  return request({
    url: `/lejuAdmin/sku/delSku/${skuId}`,
    method: "DELETE",
  })
}
// 更新sku
function updateSkuInfo(data) {
  return request({
    url: `/lejuAdmin/sku/updateSkuInfo`,
    method: "post",
    data
  })
}
// 根据商品添加库存信息
function addProductSkus(data) {
  return request({
    url: `/lejuAdmin/sku/addProductSkus`,
    method: "post",
    data
  })
}

export {
  delSku,
  updateSkuInfo,
  addProductSkus
}