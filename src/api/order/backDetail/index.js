import request from '@/utils/request'
// 退单明细
function orderReturn(id) {
  return request({
    url: `/lejuAdmin/orderReturn/${id}`,
  })
}
//同意退货
function agreeApply(id,data) {
  return request({
    url: `/lejuAdmin/orderReturn/agreeApply/${id}`,
    method: "post",
    data
  })
}
//确认收货
function receiveProduct(id, data) {
  return request({
    url: `/lejuAdmin/orderReturn/receiveProduct/${id}`,
    method: "post",
    data
  })
}
//拒绝退货
function rejectApply(id, data) {
  return request({
    url: `/lejuAdmin/orderReturn/rejectApply/${id}`,
    method: "post",
    data
  })
}
export {
  orderReturn,
  agreeApply,
  receiveProduct,
  rejectApply
}