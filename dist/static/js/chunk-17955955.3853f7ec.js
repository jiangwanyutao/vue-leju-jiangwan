(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-17955955"],{"129f":function(t,e){t.exports=Object.is||function(t,e){return t===e?0!==t||1/t===1/e:t!=t&&e!=e}},"1b62":function(t,e,a){"use strict";var s=a("03e8");e["a"]={data:function(){return{start:1,limit:10,page:{currentPage:1,size:10,total:0,pageSizes:[10,20,30,40]},loadingOption:{background:"rgba(255,255,255,.9)",text:"拼了老命加载中.....",spinner:"el-icon-loading"},uploadUrl:"/lejuAdmin/material/uploadFileOss"}},methods:{handleSizeChange:function(t){this.page.size=t,this.page.currentPage=1,this.init()},handleCurrentChange:function(t){this.page.currentPage=t,this.init()}},computed:{headers:function(){var t=Object(s["b"])(),e={token:t};return e}}}},8117:function(t,e,a){"use strict";a("ad5d")},"841c":function(t,e,a){"use strict";var s=a("d784"),n=a("825a"),o=a("1d80"),i=a("129f"),r=a("14c3");s("search",1,(function(t,e,a){return[function(e){var a=o(this),s=void 0==e?void 0:e[t];return void 0!==s?s.call(e,a):new RegExp(e)[t](String(a))},function(t){var s=a(e,t,this);if(s.done)return s.value;var o=n(t),c=String(this),l=o.lastIndex;i(l,0)||(o.lastIndex=0);var u=r(o,c);return i(o.lastIndex,l)||(o.lastIndex=l),null===u?-1:u.index}]}))},"89db":function(t,e,a){"use strict";a.d(e,"e",(function(){return n})),a.d(e,"c",(function(){return o})),a.d(e,"b",(function(){return i})),a.d(e,"f",(function(){return r})),a.d(e,"g",(function(){return c})),a.d(e,"h",(function(){return l})),a.d(e,"i",(function(){return u})),a.d(e,"j",(function(){return d})),a.d(e,"k",(function(){return p})),a.d(e,"d",(function(){return h})),a.d(e,"a",(function(){return f}));a("99af");var s=a("b775");function n(t,e,a){return Object(s["a"])({url:"/lejuAdmin/product/productsByPage/".concat(t,"/").concat(e),method:"post",data:a})}function o(){return Object(s["a"])({url:"/lejuAdmin/brand/findAllBrand"})}function i(t){return Object(s["a"])({url:"/lejuAdmin/product/del/".concat(t),method:"DELETE"})}function r(t){return Object(s["a"])({url:"/lejuAdmin/product/switchNewStatus",method:"post",data:t})}function c(t){return Object(s["a"])({url:"/lejuAdmin/product/switchPreviewStatus",method:"post",data:t})}function l(t){return Object(s["a"])({url:"/lejuAdmin/product/switchPublishStatus",method:"post",data:t})}function u(t){return Object(s["a"])({url:"/lejuAdmin/product/switchRecommandStatus",method:"post",data:t})}function d(t){return Object(s["a"])({url:"/lejuAdmin/product/switchVerifyStatus",method:"post",data:t})}function p(t){return Object(s["a"])({url:"/lejuAdmin/product/updateProductAndSkus",method:"post",data:t})}function h(t){return Object(s["a"])({url:"/lejuAdmin/product/productSkusDetail/".concat(t)})}function f(t){return Object(s["a"])({url:"/lejuAdmin/product/addProductAndSkus",method:"post",data:t})}},a434:function(t,e,a){"use strict";var s=a("23e7"),n=a("23cb"),o=a("a691"),i=a("50c4"),r=a("7b0b"),c=a("65f0"),l=a("8418"),u=a("1dde"),d=a("ae40"),p=u("splice"),h=d("splice",{ACCESSORS:!0,0:0,1:2}),f=Math.max,m=Math.min,b=9007199254740991,g="Maximum allowed length exceeded";s({target:"Array",proto:!0,forced:!p||!h},{splice:function(t,e){var a,s,u,d,p,h,w=r(this),k=i(w.length),v=n(t,k),S=arguments.length;if(0===S?a=s=0:1===S?(a=0,s=k-v):(a=S-2,s=m(f(o(e),0),k-v)),k+a-s>b)throw TypeError(g);for(u=c(w,s),d=0;d<s;d++)p=v+d,p in w&&l(u,d,w[p]);if(u.length=s,a<s){for(d=v;d<k-s;d++)p=d+s,h=d+a,p in w?w[h]=w[p]:delete w[h];for(d=k;d>k-s+a;d--)delete w[d-1]}else if(a>s)for(d=k-s;d>v;d--)p=d+s-1,h=d+a-1,p in w?w[h]=w[p]:delete w[h];for(d=0;d<a;d++)w[d+v]=arguments[d+2];return w.length=k-s+a,u}})},a6bc:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"margin_40"},[a("el-collapse",[a("el-collapse-item",{attrs:{title:"商品管理介绍",name:"1"}},[a("div",{staticClass:"title"},[t._v(" 商品管理模块可以对客户端的商品进行增删改查等相关操作,来控制客户端商品的列表展示和商品详情 ")])])],1),a("el-collapse",{staticStyle:{"margin-top":"30px"}},[a("el-collapse-item",{attrs:{title:"条件查询",name:"1"}},[a("el-form",{staticClass:"search",attrs:{model:t.search,"label-width":"80px",inline:!1,size:"normal"}},[a("el-row",{attrs:{gutter:10}},[a("el-col",{staticClass:"searchItem",attrs:{span:6,offset:0}},[a("el-form-item",{attrs:{label:"商品名称",size:"mini"}},[a("el-input",{staticClass:"search-input",attrs:{size:"mini",placeholder:"商品名称/模糊查询"},model:{value:t.search.name,callback:function(e){t.$set(t.search,"name",e)},expression:"search.name"}})],1)],1),a("el-col",{staticClass:"searchItem",attrs:{span:6,offset:0}},[a("el-form-item",{attrs:{label:"商品货号",size:"mini"}},[a("el-input",{staticClass:"search-input",attrs:{size:"mini",placeholder:"商品货号"},model:{value:t.search.productSn,callback:function(e){t.$set(t.search,"productSn",e)},expression:"search.productSn"}})],1)],1),a("el-col",{staticClass:"searchItem",attrs:{span:6,offset:0}},[a("el-form-item",{attrs:{label:"品牌",size:"mini"}},[a("el-select",{staticClass:"search-input",attrs:{size:"mini",clearable:"",placeholder:"品牌"},model:{value:t.search.brandId,callback:function(e){t.$set(t.search,"brandId",e)},expression:"search.brandId"}},t._l(t.brandList,(function(t){return a("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})),1)],1)],1),a("el-col",{staticClass:"searchItem",attrs:{span:6,offset:0}},[a("el-form-item",{attrs:{label:"上架状态",size:"mini"}},[a("el-select",{staticClass:"search-input",attrs:{size:"mini",clearable:"",placeholder:"上架状态"},model:{value:t.search.publishStatus,callback:function(e){t.$set(t.search,"publishStatus",e)},expression:"search.publishStatus"}},[a("el-option",{attrs:{label:"上架",value:"1"}}),a("el-option",{attrs:{label:"未上架",value:"0"}})],1)],1)],1),a("el-col",{staticClass:"searchItem",attrs:{span:6,offset:0}},[a("el-form-item",{attrs:{label:"审核状态",size:"mini"}},[a("el-select",{staticClass:"search-input",attrs:{size:"mini",clearable:"",placeholder:"审核状态"},model:{value:t.search.verifyStatus,callback:function(e){t.$set(t.search,"verifyStatus",e)},expression:"search.verifyStatus"}},[a("el-option",{attrs:{label:"审核",value:"1"}}),a("el-option",{attrs:{label:"未审核",value:"0"}})],1)],1)],1),a("el-col",{staticStyle:{float:"right"},attrs:{span:4,offset:0}},[a("el-button",{attrs:{type:"default",size:"mini"},on:{click:t.doReset}},[t._v("重置 ")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.doSearch}},[t._v("搜索")])],1)],1)],1)],1)],1),a("el-card",{staticClass:"card",attrs:{shadow:"never"}},[a("div",{attrs:{slot:"header"},slot:"header"},[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.addProduct}},[t._v("新增")]),a("el-button",{attrs:{type:"primary",size:"mini",loading:t.downloadLoading},on:{click:t.handleDownload}},[t._v(" 导出商品列表excel文件 ")])],1),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.productList,border:""}},[a("el-table-column",{attrs:{type:"index",label:"序号",fixed:"left"}}),a("el-table-column",{attrs:{label:"商品图片",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.pic?a("img",{staticClass:"avatar",staticStyle:{width:"100px",height:"100px"},attrs:{src:e.row.pic}}):t._e()]}}])}),a("el-table-column",{attrs:{align:"center",label:"商品名称",width:"350"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("p",[t._v(t._s(e.row.name))]),a("p",[t._v("品牌: "+t._s(e.row.brandName))]),a("p",[t._v(t._s(e.row.description))])]}}])}),a("el-table-column",{attrs:{align:"center",label:"商品价格",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("p",[t._v("原价: "+t._s(e.row.originalPrice))]),a("p",[t._v("现价: "+t._s(e.row.price))])]}}])}),a("el-table-column",{attrs:{align:"center",prop:"productCategoryName",label:"商品类别",width:"150"}}),a("el-table-column",{attrs:{align:"center",label:"标签",width:180},scopedSlots:t._u([{key:"default",fn:function(e){return[a("p",[t._v(" 最新: "),a("el-switch",{attrs:{size:"small","active-value":1,"inactive-value":0},on:{change:function(a){return t.switchCode("newStatus",e.row)}},model:{value:e.row.newStatus,callback:function(a){t.$set(e.row,"newStatus",a)},expression:"scope.row.newStatus"}})],1),a("p",[t._v(" 推荐: "),a("el-switch",{attrs:{size:"small","active-value":1,"inactive-value":0},on:{change:function(a){return t.switchCode("recommendStatus",e.row)}},model:{value:e.row.recommendStatus,callback:function(a){t.$set(e.row,"recommendStatus",a)},expression:"scope.row.recommendStatus"}})],1)]}}])}),a("el-table-column",{attrs:{align:"center",label:"标签2",width:180},scopedSlots:t._u([{key:"default",fn:function(e){return[a("p",[t._v(" 发布: "),a("el-switch",{attrs:{size:"small","active-value":1,"inactive-value":0},on:{change:function(a){return t.switchCode("publishStatus",e.row)}},model:{value:e.row.publishStatus,callback:function(a){t.$set(e.row,"publishStatus",a)},expression:"scope.row.publishStatus"}})],1),a("p",[t._v(" 审核: "),a("el-switch",{attrs:{size:"small","active-value":1,"inactive-value":0},on:{change:function(a){return t.switchCode("verifyStatus",e.row)}},model:{value:e.row.verifyStatus,callback:function(a){t.$set(e.row,"verifyStatus",a)},expression:"scope.row.verifyStatus"}})],1)]}}])}),a("el-table-column",{attrs:{align:"center",prop:"keywords",label:"sku",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",size:"default"},on:{click:function(a){return t.skuDetail(e.row)}}},[t._v("编辑sku")])]}}])}),a("el-table-column",{attrs:{align:"center",prop:"weight",label:"重量",width:"80"}}),a("el-table-column",{attrs:{align:"center",prop:"sort",label:"排序",width:"150"}}),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.goEdit(e.row)}}},[t._v("编辑")]),a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.goDelete(e.row)}}},[a("span",{staticStyle:{color:"red"}},[t._v("删除")])])]}}])})],1),a("el-pagination",{attrs:{"current-page":t.page.currentPage,"page-sizes":t.page.pageSizes,"page-size":t.page.size,layout:"total, sizes, prev, pager, next, jumper",total:t.page.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),a("el-dialog",{attrs:{visible:t.dialog,width:"65%",title:"sku列表"},on:{"update:visible":function(e){t.dialog=e},close:t.clear}},[a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{staticStyle:{"margin-bottom":"20px"},attrs:{type:"primary",size:"default"},on:{click:t.addSku}},[t._v("新增")]),a("el-table",{attrs:{size:"mini",data:t.skuList,border:"",stripe:""}},[a("el-table-column",{attrs:{type:"index",label:"#",fixed:"left"}}),a("el-table-column",{attrs:{label:"图片",width:120},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-upload",{staticStyle:{width:"100px",height:"100px"},attrs:{action:t.uploadUrl,headers:t.headers,"show-file-list":!1,"on-success":t.handleUploadSucc},nativeOn:{click:function(a){return t.getTableItem(e.row)}}},[e.row.pic?a("img",{staticClass:"avatar",staticStyle:{width:"100px",height:"100px"},attrs:{src:e.row.pic}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon",staticStyle:{width:"100px",height:"100px","margin-top":"-31px"}})])]}}])}),a("el-table-column",{attrs:{label:"颜色",width:160},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-input",{attrs:{size:"mini"},model:{value:e.row.spData[0].value,callback:function(a){t.$set(e.row.spData[0],"value",a)},expression:"scope.row.spData[0].value"}})]}}])}),a("el-table-column",{attrs:{label:"大小",width:160},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.spData[1]?a("el-input",{attrs:{size:"mini"},model:{value:e.row.spData[1].value,callback:function(a){t.$set(e.row.spData[1],"value",a)},expression:"scope.row.spData[1].value"}}):t._e()]}}])}),a("el-table-column",{attrs:{label:"库存",width:200},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-input",{attrs:{size:"mini",placeholder:"自定义库存"},model:{value:e.row.stock,callback:function(a){t.$set(e.row,"stock",a)},expression:"scope.row.stock"}})]}}])}),a("el-table-column",{attrs:{label:"预警库存",width:200},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-input",{attrs:{size:"mini",placeholder:"预警库存"},model:{value:e.row.lowStock,callback:function(a){t.$set(e.row,"lowStock",a)},expression:"scope.row.lowStock"}})]}}])}),a("el-table-column",{attrs:{label:"锁定库存",width:200},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-input",{attrs:{size:"mini",placeholder:"锁定库存"},model:{value:e.row.lockStock,callback:function(a){t.$set(e.row,"lockStock",a)},expression:"scope.row.lockStock"}})]}}])}),a("el-table-column",{attrs:{label:"sku编码",width:200},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-input",{attrs:{size:"mini",placeholder:"自定义sku编码"},model:{value:e.row.skuCode,callback:function(a){t.$set(e.row,"skuCode",a)},expression:"scope.row.skuCode"}})]}}])}),a("el-table-column",{attrs:{label:"价格",width:160},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-input",{attrs:{size:"mini",placeholder:"价格,单位:分"},model:{value:e.row.price,callback:function(a){t.$set(e.row,"price",a)},expression:"scope.row.price"}})]}}])}),a("el-table-column",{attrs:{label:"销量",width:160},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-input",{attrs:{size:"mini"},model:{value:e.row.sale,callback:function(a){t.$set(e.row,"sale",a)},expression:"scope.row.sale"}})]}}])}),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:160},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.id?a("span",[a("el-button",{staticStyle:{color:"red"},attrs:{size:"mini",type:"text"},on:{click:function(a){return t.removeSku(e.row)}}},[t._v("删除 ")]),a("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(a){return t.editSku(e.row)}}},[t._v("修改编辑 ")])],1):a("span",[a("el-button",{staticStyle:{color:"red"},attrs:{size:"mini",type:"text"},nativeOn:{click:function(a){return a.preventDefault(),t.deleteRow(e.$index,t.skuList)}}},[t._v("删除 ")]),a("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(a){return t.saveNewSku(e.row)}}},[t._v("保存 ")])],1)]}}])})],1),a("el-button",{staticStyle:{"margin-top":"20px"},on:{click:function(e){t.dialog=!1}}},[t._v("取 消")])],1)])],1)},n=[],o=a("5530"),i=(a("ac1f"),a("841c"),a("d3b7"),a("159b"),a("e9c4"),a("a434"),a("3ca3"),a("ddb0"),a("d81d"),a("89db")),r=a("b775");function c(t){return Object(r["a"])({url:"/lejuAdmin/sku/delSku/".concat(t),method:"DELETE"})}function l(t){return Object(r["a"])({url:"/lejuAdmin/sku/updateSkuInfo",method:"post",data:t})}function u(t){return Object(r["a"])({url:"/lejuAdmin/sku/addProductSkus",method:"post",data:t})}var d=a("1b62"),p={mixins:[d["a"]],data:function(){return{brandList:[],search:{productSn:"",publishStatus:"",verifyStatus:"",name:""},productList:[],searchForm:[],downloadLoading:!1,dialog:!1,skuList:[],productId:"",tempTableObj:{}}},methods:{init:function(){var t=this,e={};for(var a in this.searchForm)(this.searchForm[a]||this.searchForm[a]+""==="0")&&(console.log("searhc==",this.searchForm[a]),e[a]=this.searchForm[a]);Object(i["e"])(this.page.currentPage,this.page.size,Object(o["a"])({},e)).then((function(e){console.log(e),t.productList=e.data.rows,t.page.total=e.data.total}))},getBrandList:function(){var t=this;Object(i["c"])().then((function(e){t.brandList=e.data.items})).catch((function(t){console.log("error",t)}))},switchCode:function(t,e){var a=this,s=e.id,n=0===e[t]?1:0;switch(t){case"newStatus":Object(i["f"])({productId:s,status:e[t]}).then((function(s){s.success?a.$message.success("修改状态成功"):(e[t]=n,a.$message.error("修改状态失败"))})).catch((function(s){e[t]=n,a.$message.error("修改状态失败")}));break;case"previewStatus":Object(i["g"])({productId:s,status:e[t]}).then((function(s){s.success?a.$message.success("修改状态成功"):(e[t]=n,a.$message.error("修改状态失败"))})).catch((function(s){e[t]=n,a.$message.error("修改状态失败")}));break;case"publishStatus":Object(i["h"])({productId:s,status:e[t]}).then((function(s){s.success?a.$message.success("修改状态成功"):(e[t]=n,a.$message.error("修改状态失败"))})).catch((function(s){e[t]=n,a.$message.error("修改状态失败")}));break;case"recommendStatus":Object(i["i"])({productId:s,status:e[t]}).then((function(s){s.success?a.$message.success("修改状态成功"):(e[t]=n,a.$message.error("修改状态失败"))})).catch((function(s){e[t]=n,a.$message.error("修改状态失败")}));break;case"verifyStatus":Object(i["j"])({productId:s,status:e[t]}).then((function(s){s.success?a.$message.success("修改状态成功"):(e[t]=n,a.$message.error("修改状态失败"))})).catch((function(s){e[t]=n,a.$message.error("修改状态失败")}));break;default:break}},doReset:function(){this.search={gname:"",pcode:"",brandId:"",price:""},this.searchForm={},this.init()},doSearch:function(){this.page.currentPage=1,this.searchForm=Object.assign({},this.search),this.init()},goDelete:function(t){var e=this;this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){Object(i["b"])(t.id).then((function(t){t.success?(e.init(),e.$message({type:"success",message:"删除成功!"})):e.$message.error(t.message)})).catch((function(t){e.$message.error(t.message)}))})).catch((function(t){console.log(t)}))},addProduct:function(){this.$router.push({name:"productaddlist"})},goEdit:function(t){this.$router.push({name:"productaddlist",params:{id:t.id}})},getTableItem:function(t){this.tempTableObj=t},handleTableSuccess:function(t,e){var a=this;this.skuList.forEach((function(e){e===a.tempTableObj&&(e.pic=t.data.fileUrl)}))},skuDetail:function(t){var e=this;this.dialog=!this.dialog,this.productId=t.id,Object(i["d"])(t.id).then((function(t){console.log(t),t.data.skus.forEach((function(t){e.skuList.push(Object(o["a"])(Object(o["a"])({},t),{},{spData:JSON.parse(t.spData)}))}))}))},clear:function(){this.skuList=this.$options.data().skuList},addSku:function(){var t={productId:this.productId,lockStock:"",lowStock:"",stock:"",pic:"",price:"",sale:"",skuCode:"",spData:[{key:"颜色",value:""},{key:"容量",value:""}]};this.skuList.push(t)},handleUploadSucc:function(t,e,a){var s=this;console.log(t),t.success?this.skuList.forEach((function(e){e===s.tempTableObj&&(e.pic=t.data.fileUrl)})):this.$message.error("素材上传失败")},removeSku:function(t){var e=this;this.$confirm("是否删除sku?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){c(t.id).then((function(t){t.success?(e.$message.success("删除sku成功"),e.$router.go(0),e.dialog=!e.dialog):e.$message.error("删除sku失败")})),e.$router.go(0)})).catch((function(t){console.log("quxiao")}))},editSku:function(t){var e=this,a={id:t.id,lockStock:t.lockStock,lowStock:t.lowStock,stock:t.stock,pic:t.pic,price:t.price,productId:t.productId,sale:t.sale,skuCode:t.skuCode,spData:JSON.stringify(t.spData)};this.dialog=!this.dialog,l(a).then((function(t){t.success?e.$message.success("修改sku成功"):e.$message.error("修改sku失败"),e.dialog=!1,e.$router.go(0)}))},deleteRow:function(t,e){e.splice(t,1)},saveNewSku:function(t){var e=this;this.dialog=!0,u(Object(o["a"])(Object(o["a"])({},t),{},{spData:JSON.stringify(t.spData)})).then((function(t){t.success?e.$message.success("新增成功"):e.$message.error("新增失败")})),this.dialog=!1},handleDownload:function(){var t=this;this.downloadLoading=!0,Promise.all([a.e("chunk-cd409754"),a.e("chunk-3d3606e8"),a.e("chunk-2133cd4f")]).then(a.bind(null,"4bf8")).then((function(e){var a=["商品名称","商品品牌","商品价格"],s=["name","brandName","price"],n=t.productList,o=t.formatJson(s,n);console.log(o),e.export_json_to_excel({header:a,data:o,filename:"商品列表",autoWidth:!0,bookType:"xlsx"}),t.downloadLoading=!1}))},formatJson:function(t,e){return e.map((function(e){return t.map((function(t){return e[t]}))}))}},computed:{},created:function(){this.init(),this.getBrandList()},mounted:function(){}},h=p,f=(a("8117"),a("2877")),m=Object(f["a"])(h,s,n,!1,null,"56146dd4",null);e["default"]=m.exports},ad5d:function(t,e,a){}}]);