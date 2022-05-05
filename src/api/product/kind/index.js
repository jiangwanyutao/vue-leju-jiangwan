import request from '@/utils/request'
// 查询12级分类
function getAllCategory() {
  return request({
    url: '/lejuAdmin/category/getAllCategory',
  })
}
// 更新分类
function updateCategory(data) {
  return request({
    url: '/lejuAdmin/category/updateCategory',
    method: "post",
    data
  })
}


export {
  getAllCategory,
  updateCategory
}