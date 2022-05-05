import request from '@/utils/request'
// 查看订单列表
function findOrdersByPage(start, limit, data) {
  return request({
    url: `/lejuAdmin/order/findOrdersByPage/${start}/${limit}`,
    method: "post",
    data
  })
}
//查看订单明细
function orderDetail(orderId) {
  return request({
    url: `/lejuAdmin/order/orderDetail/${orderId}`,
  })
}
//确认发货
function sendDone(data) {
  return request({
    url: `/lejuAdmin/order/sendDone`,
    method: "post",
    data
  })
}
//强制确认收货
function receiveProductsForce(orderId) {
  return request({
    url: `/lejuAdmin/order/receiveProductsForce/${orderId}`,
    method: "post",
  })
}

export {
  findOrdersByPage,
  orderDetail,
  sendDone,
  receiveProductsForce

}