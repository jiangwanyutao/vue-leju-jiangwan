import request from '@/utils/request'
// 查看广告列表
function adsList() {
  return request({
    url: `/lejuAdmin/advertise/adsList`,
  })
}
// 删除广告
function delAds(adsId) {
  return request({
    url: `/lejuAdmin/advertise/delAds/${adsId}`,
    method: "DELETE"
  })
}
// 新增广告
function addAds(data) {
  return request({
    url: `/lejuAdmin/advertise/addAds`,
    method: "post",
    data
  })
}
// 更新广告
function updateAds(data) {
  return request({
    url: `/lejuAdmin/advertise/updateAds`,
    method: "post",
    data
  })
}


export {
  adsList,
  delAds,
  addAds,
  updateAds
}