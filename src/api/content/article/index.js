import request from '@/utils/request'
// 查询文章分类
function findArticles(start,limit,data) {
  return request({
    url: `/lejuAdmin/productArticle/findArticles/${start}/${limit}`,
    method: 'POST',
    data
  })
}
//更新文章显示状态
function changeShowStatus(data) {
  return request({
    url: `/lejuAdmin/productArticle/changeShowStatus`,
    method: 'POST',
    data
  })
}
//删除文章
function del(id) {
  return request({
    url: `/lejuAdmin/productArticle/del/${id}`,
    method: 'DELETE',
  })
}
//新增文章
function addArticle(data) {
  return request({
    url: `/lejuAdmin/productArticle/addArticle`,
    method: 'post',
    data
  })
}
//获取文章明细
function productArticle(id) {
  return request({
    url: `/lejuAdmin/productArticle/productArticle/${id}`,
  })
}
// 更新文章
function updateArticle(data) {
  return request({
    url: `/lejuAdmin/productArticle/updateArticle`,
    method: 'post',
    data
  })
}


// 上传图片地址
function upload(data) {
  return request({
    url: `/lejuAdmin/material/uploadFileOss`,
    method: 'POST',
    data
  })
}

export {
  findArticles,
  changeShowStatus,
  del,
  addArticle,
  productArticle,
  updateArticle,
  upload
}
