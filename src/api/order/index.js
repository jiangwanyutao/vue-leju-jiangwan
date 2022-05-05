import request from '@/utils/request'
// 地址列表
function addressList() {
  return request({
    url: '/lejuAdmin/companyAddress/addressList',
  })
}
//新增地址
function save(data) {
  return request({
    url: '/lejuAdmin/companyAddress/save',
    method: "post",
    data
  })
}
//编辑地址
function update(data) {
  return request({
    url: '/lejuAdmin/companyAddress/update',
    method: "post",
    data
  })
}
//更改收货默认
function setReceiveOne(data) {
  return request({
    url: '/lejuAdmin/companyAddress/setReceiveOne',
    method: "post",
    data
  })
}
//更改发货地址默认
function setSendOne(data) {
  return request({
    url: '/lejuAdmin/companyAddress/setSendOne',
    method: "post",
    data
  })
}
//删除地址
function companyAddress(id) {
  return request({
    url: `/lejuAdmin/companyAddress/${id}`,
    method: 'DELETE',
  })
}
export {
  addressList,
  save,
  setReceiveOne,
  setSendOne,
  companyAddress,
  update
}