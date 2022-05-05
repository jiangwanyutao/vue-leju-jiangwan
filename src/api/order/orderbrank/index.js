import request from '@/utils/request'
// 查看退单列表
function findReturnApply(start, limit, data) {
  return request({
    url: `/lejuAdmin/orderReturn/findReturnApply/${start}/${limit}`,
    method: "post",
    data
  })
}

export {
  findReturnApply,

}