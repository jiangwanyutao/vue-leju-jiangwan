(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-633e90f8"],{"129f":function(t,e){t.exports=Object.is||function(t,e){return t===e?0!==t||1/t===1/e:t!=t&&e!=e}},"1b62":function(t,e,a){"use strict";var i=a("03e8");e["a"]={data:function(){return{start:1,limit:10,page:{currentPage:1,size:10,total:0,pageSizes:[10,20,30,40]},loadingOption:{background:"rgba(255,255,255,.9)",text:"拼了老命加载中.....",spinner:"el-icon-loading"},uploadUrl:"/lejuAdmin/material/uploadFileOss"}},methods:{handleSizeChange:function(t){this.page.size=t,this.page.currentPage=1,this.init()},handleCurrentChange:function(t){this.page.currentPage=t,this.init()}},computed:{headers:function(){var t=Object(i["b"])(),e={token:t};return e}}}},"841c":function(t,e,a){"use strict";var i=a("d784"),n=a("825a"),o=a("1d80"),s=a("129f"),r=a("14c3");i("search",1,(function(t,e,a){return[function(e){var a=o(this),i=void 0==e?void 0:e[t];return void 0!==i?i.call(e,a):new RegExp(e)[t](String(a))},function(t){var i=a(e,t,this);if(i.done)return i.value;var o=n(t),l=String(this),c=o.lastIndex;s(c,0)||(o.lastIndex=0);var d=r(o,l);return s(o.lastIndex,c)||(o.lastIndex=c),null===d?-1:d.index}]}))},"94fd":function(t,e,a){"use strict";a("ad3d")},a346:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"market_main"},[a("el-card",{staticClass:"card",attrs:{shadow:"never"}},[a("div",{attrs:{slot:"header"},slot:"header"},[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.goAdd}},[t._v("新增")])],1),a("el-dialog",{staticStyle:{"margin-top":"-100px"},attrs:{title:"热销详情",visible:t.dialogVisible,width:"80%",modal:!1},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("div",{staticClass:"brandDetail_main"},[a("el-card",{staticClass:"search-main card",attrs:{shadow:"never"}},[a("div",{attrs:{slot:"header"},slot:"header"},[a("span",[t._v("条件查询")])]),a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:4,offset:0}},[a("el-input",{staticClass:"search-input",attrs:{size:"mini",placeholder:"商品名称/模糊查询"},model:{value:t.search.name,callback:function(e){t.$set(t.search,"name",e)},expression:"search.name"}})],1),a("el-col",{attrs:{span:4,offset:0}},[a("el-input",{staticClass:"search-input",attrs:{size:"mini",placeholder:"商品货号"},model:{value:t.search.productSn,callback:function(e){t.$set(t.search,"productSn",e)},expression:"search.productSn"}})],1),a("el-col",{attrs:{span:4,offset:0}},[a("el-select",{staticClass:"search-input",attrs:{size:"mini",clearable:"",placeholder:"品牌"},model:{value:t.search.brandId,callback:function(e){t.$set(t.search,"brandId",e)},expression:"search.brandId"}},t._l(t.brandList,(function(t){return a("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})),1)],1),a("el-col",{attrs:{span:4,offset:0}},[a("el-select",{staticClass:"search-input",attrs:{size:"mini",clearable:"",placeholder:"上架状态"},model:{value:t.search.publishStatus,callback:function(e){t.$set(t.search,"publishStatus",e)},expression:"search.publishStatus"}},[a("el-option",{attrs:{label:"上架",value:"1"}}),a("el-option",{attrs:{label:"未上架",value:"0"}})],1)],1),a("el-col",{attrs:{span:4,offset:0}},[a("el-select",{staticClass:"search-input",attrs:{size:"mini",clearable:"",placeholder:"审核状态"},model:{value:t.search.verifyStatus,callback:function(e){t.$set(t.search,"verifyStatus",e)},expression:"search.verifyStatus"}},[a("el-option",{attrs:{label:"审核",value:"1"}}),a("el-option",{attrs:{label:"未审核",value:"0"}})],1)],1),a("el-col",{attrs:{span:4,offset:0}},[a("el-button",{attrs:{type:"default",size:"mini"},on:{click:t.doReset}},[t._v("重置 ")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.doSearch}},[t._v("搜索")])],1)],1)],1)],1),a("el-card",{staticClass:"card table_main",attrs:{shadow:"never"}},[a("div",{attrs:{slot:"header"},slot:"header"},[t._v("商品列表")]),a("el-radio-group",{staticStyle:{width:"100%"},on:{change:t.radioChange},model:{value:t.productId,callback:function(e){t.productId=e},expression:"productId"}},[a("el-table",{ref:"productTable",staticStyle:{width:"100%"},attrs:{data:t.productList,border:""}},[a("el-table-column",{attrs:{type:"index",label:"序号",fixed:"left"}}),a("el-table-column",{attrs:{label:"选择",align:"center",width:"100"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("el-radio",{attrs:{label:t.row.id}},[a("span")])]}}])}),a("el-table-column",{attrs:{label:"商品图片",align:"center",width:"200"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("img",{staticClass:"table_img",attrs:{src:t.row.pic}})]}}])}),a("el-table-column",{attrs:{align:"center",label:"商品名称"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("p",[t._v(t._s(e.row.name))]),a("p",[t._v(" 品牌: "+t._s(e.row.brandName)+" | "+t._s(e.row.brandEname)+" ")]),a("p",[t._v(t._s(e.row.description))])]}}])}),a("el-table-column",{attrs:{align:"center",label:"商品价格",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("p",[t._v("原价: "+t._s(e.row.originalPrice))]),a("p",[t._v("现价: "+t._s(e.row.price))])]}}])}),a("el-table-column",{attrs:{align:"center",prop:"productCategoryName",label:"商品类别",width:"200"}}),a("el-table-column",{attrs:{align:"center",prop:"weight",label:"重量",width:"180"}})],1)],1),a("el-pagination",{attrs:{"current-page":t.page.currentPage,"page-sizes":t.page.pageSizes,"page-size":t.page.size,layout:"total, sizes, prev, pager, next, jumper",total:t.page.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),a("span",{staticClass:"dialog-footer",staticStyle:{"text-align":"left"},attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")])],1),a("el-dialog",{attrs:{title:"编辑限时活动",visible:t.isEditOpen,width:"50%",modal:!1},on:{"update:visible":function(e){t.isEditOpen=e}}},[a("el-row",{attrs:{gutter:10}},[a("el-form",{ref:"form",attrs:{model:t.form,"label-width":"100px",size:"mini"}},[a("el-col",{attrs:{span:12,offset:0}},[a("el-form-item",{attrs:{label:"商品原价"}},[a("span",[t._v(t._s(t.productDetail.price))])])],1),a("el-col",{attrs:{span:12,offset:0}},[a("el-form-item",{attrs:{label:"商品名称"}},[a("span",[t._v(t._s(t.productDetail.name))])])],1),a("el-col",{attrs:{span:12,offset:0}},[a("el-form-item",{attrs:{label:"促销价格"}},[a("el-input-number",{staticClass:"myInput",model:{value:t.form.promotionPrice,callback:function(e){t.$set(t.form,"promotionPrice",e)},expression:"form.promotionPrice"}})],1)],1),a("el-col",{attrs:{span:12,offset:0}},[a("el-form-item",{attrs:{label:"排序"}},[a("el-input-number",{staticClass:"myInput",model:{value:t.form.sort,callback:function(e){t.$set(t.form,"sort",e)},expression:"form.sort"}})],1)],1),a("el-col",{attrs:{span:12,offset:0}},[a("el-form-item",{attrs:{label:"开始时间"}},[a("el-date-picker",{staticClass:"myInput",attrs:{type:"datetime",placeholder:"开始时间","value-format":"yyyy-MM-dd HH:mm:ss"},model:{value:t.form.promotionStartTime,callback:function(e){t.$set(t.form,"promotionStartTime",e)},expression:"form.promotionStartTime"}})],1)],1),a("el-col",{attrs:{span:12,offset:0}},[a("el-form-item",{attrs:{label:"结束时间"}},[a("el-date-picker",{staticClass:"myInput",attrs:{type:"datetime",placeholder:"开始时间","value-format":"yyyy-MM-dd HH:mm:ss"},model:{value:t.form.promotionEndTime,callback:function(e){t.$set(t.form,"promotionEndTime",e)},expression:"form.promotionEndTime"}})],1)],1),a("el-col",{attrs:{span:12,offset:0}},[a("el-form-item",{attrs:{label:"活动限购数量"}},[a("el-input",{staticClass:"myInput",model:{value:t.form.promotionPerLimit,callback:function(e){t.$set(t.form,"promotionPerLimit",e)},expression:"form.promotionPerLimit"}})],1)],1),a("el-col",{attrs:{span:12,offset:0}},[a("el-form-item",{attrs:{label:"商品图片"}},[a("img",{staticStyle:{width:"150px",height:"150px"},attrs:{src:t.productDetail.pic,alt:""}})])],1)],1)],1),a("span",{attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.isEditOpen=!1}}},[t._v("取消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("确定")])],1)],1)],1),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:t.marketList,border:""}},[a("el-table-column",{attrs:{type:"index",label:"序号",fixed:"left"}}),a("el-table-column",{attrs:{label:"商品图片",width:"150"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("img",{staticClass:"table_img",attrs:{src:t.row.pic}})]}}])}),a("el-table-column",{attrs:{align:"center",prop:"productSn",label:"活动时间",width:"300"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("p",[t._v("开始时间: "+t._s(e.row.promotionStartTime))]),a("p",[t._v("结束时间: "+t._s(e.row.promotionEndTime))])]}}])}),a("el-table-column",{attrs:{align:"center",prop:"productSn",label:"是否过期",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("p",[t._v(" "+t._s(t.judgeTime(e.row.promotionStartTime,e.row.promotionEndTime))+" ")])]}}])}),a("el-table-column",{attrs:{align:"center",prop:"name",label:"商品名称",width:"300"}}),a("el-table-column",{attrs:{align:"center",prop:"brandName",label:"品牌名称",width:"250"}}),a("el-table-column",{attrs:{align:"center",prop:"price",label:"商品价格",width:"150"}}),a("el-table-column",{attrs:{align:"center",prop:"productCategoryName",label:"商品类别",width:"150"}}),a("el-table-column",{attrs:{align:"center",prop:"createTime",label:"创建时间",width:"350"}}),a("el-table-column",{attrs:{fixed:"right",align:"center",label:"操作",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.edit(e.row)}}},[a("span",{staticStyle:{color:"blue"}},[t._v("编辑")])]),a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.goDelete(e.row)}}},[a("span",{staticStyle:{color:"red"}},[t._v("删除")])])]}}])})],1)],1)],1)},n=[],o=a("5530"),s=(a("ac1f"),a("841c"),a("d3b7"),a("159b"),a("b0c0"),a("99af"),a("b775"));function r(){return Object(s["a"])({url:"/lejuAdmin/homeRecommend/findAllRecommends"})}function l(t){return Object(s["a"])({url:"/lejuAdmin/homeRecommend/delRecommend/".concat(t),method:"DELETE"})}function c(t){return Object(s["a"])({url:"/lejuAdmin/homeRecommend/addRecommend",method:"post",data:t})}function d(t){return Object(s["a"])({url:"/lejuAdmin/homeRecommend/updateRecommend",method:"post",data:t})}function u(){return Object(s["a"])({url:"/lejuAdmin/brand/findAllBrand"})}function p(t,e,a){return Object(s["a"])({url:"/lejuAdmin/product/productsByPage/".concat(t,"/").concat(e),method:"post",data:a})}var m=a("1b62"),f={name:"MarketList",mixins:[m["a"]],data:function(){return{marketList:[],loading:!1,dialogVisible:!1,brandList:[],search:{productSn:"",publishStatus:"",verifyStatus:"",name:""},productList:[],productId:"",isEditOpen:!1,form:{productId:"",promotionPrice:"",promotionPerLimit:"",sort:"",promotionStartTime:"",promotionEndTime:""},productDetail:[],num:!1}},computed:{showList:function(){return this.marketList}},created:function(){this.inits(),this.init()},methods:{judgeTime:function(t,e){var a=(new Date).getTime()-new Date(e).getTime();return a>0?"过期":"否"},inits:function(){var t=this;this.loading=!0,r().then((function(e){e.success&&(t.marketList=e.data.items),t.loading=!1}))},goDelete:function(t){var e=this;this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){l(t.recommendId).then((function(t){t.success?(e.inits(),e.$message({type:"success",message:"删除成功!"})):e.$message.error(t.message)})).catch((function(t){e.$message.error(t.message)}))})).catch((function(t){console.log(t)}))},goAdd:function(){this.dialogVisible=!0,this.brand()},brand:function(){var t=this;u().then((function(e){console.log(e),t.brandList=e.data.items}))},doSearch:function(){this.init()},doReset:function(){this.search=this.$options.data().search},init:function(){var t=this;p(this.page.currentPage,this.page.size,this.search).then((function(e){console.log(e),t.productList=e.data.rows,t.page.total=e.data.total}))},radioChange:function(t){var e=this;console.log(t),this.isEditOpen=!this.isEditOpen,this.productList.forEach((function(a){a.id===t&&(e.productDetail=Object.assign({},a))})),this.form={},this.productId=t},edit:function(t){this.num=!0,this.dialogVisible=!0,this.isEditOpen=!this.isEditOpen,this.form=t,this.productDetail.name=t.name,this.productDetail.price=t.price,this.productId=t.productId,this.productDetail.pic=t.pic},onSubmit:function(){var t=this;this.$confirm("是否确认".concat(this.num?"编辑":"新增","最热推荐商品?"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t.num?d(Object(o["a"])(Object(o["a"])({},t.form),{},{productId:t.productId})).then((function(e){e.success?(t.isEditOpen=!1,t.dialogVisible=!1,t.productId="",t.inits(),t.$emit("success"),t.$message.success("添加成功")):t.$message.error("添加失败")})):c(Object(o["a"])(Object(o["a"])({},t.form),{},{productId:t.productId})).then((function(e){console.log("res",e),e.success?(t.isEditOpen=!1,t.dialogVisible=!1,t.productId="",t.inits(),t.$emit("success"),t.$message.success("添加成功")):t.$message.error("添加失败")}))})).catch((function(t){console.log("取消")}))}}},h=f,b=(a("94fd"),a("2877")),g=Object(b["a"])(h,i,n,!1,null,"efaa17b8",null);e["default"]=g.exports},ad3d:function(t,e,a){}}]);