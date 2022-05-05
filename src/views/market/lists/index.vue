<template>
  <div class="market_main">
    <el-card class="card" shadow="never">
      <div slot="header">
        <el-button type="primary" size="small" @click="goAdd">新增</el-button>
      </div>
      <!-- 新增渲染列表 -->
      <el-dialog
        title="热销详情"
        :visible.sync="dialogVisible"
        width="80%"
        :modal="false"
        style="margin-top: -100px"
      >
      <!-- 搜索 -->
        <div class="brandDetail_main">
          <el-card class="search-main card" shadow="never">
            <div slot="header">
              <span>条件查询</span>
            </div>
            <el-row :gutter="20">
              <el-col :span="4" :offset="0">
                <el-input
                  v-model="search.name"
                  class="search-input"
                  size="mini"
                  placeholder="商品名称/模糊查询"
                />
              </el-col>
              <el-col :span="4" :offset="0">
                <el-input
                  v-model="search.productSn"
                  class="search-input"
                  size="mini"
                  placeholder="商品货号"
                />
              </el-col>
              <el-col :span="4" :offset="0">
                <el-select
                  v-model="search.brandId"
                  class="search-input"
                  size="mini"
                  clearable
                  placeholder="品牌"
                >
                  <el-option
                    v-for="item in brandList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-col>
              <el-col :span="4" :offset="0">
                <el-select
                  v-model="search.publishStatus"
                  class="search-input"
                  size="mini"
                  clearable
                  placeholder="上架状态"
                >
                  <el-option label="上架" value="1" />
                  <el-option label="未上架" value="0" />
                </el-select>
              </el-col>
              <el-col :span="4" :offset="0">
                <el-select
                  v-model="search.verifyStatus"
                  class="search-input"
                  size="mini"
                  clearable
                  placeholder="审核状态"
                >
                  <el-option label="审核" value="1" />
                  <el-option label="未审核" value="0" />
                </el-select>
              </el-col>
              <el-col :span="4" :offset="0">
                <el-button type="default" size="mini" @click="doReset"
                  >重置
                </el-button>
                <el-button type="primary" size="mini" @click="doSearch"
                  >搜索</el-button
                >
              </el-col>
            </el-row>
          </el-card>
        </div>
        <!-- ------------------------------------------------------------------------------------------------------------ -->
        <!-- 商品列表 -->
        <el-card class="card table_main" shadow="never">
          <div slot="header">商品列表</div>
          <!-- 添加的商品信息 -->
          <el-radio-group
            v-model="productId"
            style="width: 100%"
            @change="radioChange"
          >
            <el-table
              ref="productTable"
              :data="productList"
              border
              style="width: 100%"
            >
              <el-table-column type="index" label="序号" fixed="left" />
              <el-table-column label="选择" align="center" width="100">
                <template slot-scope="scope">
                  <el-radio :label="scope.row.id"><span /></el-radio>
                </template>
              </el-table-column>
              <!-- 商品列表内容 -->
              <el-table-column label="商品图片" align="center" width="200">
                <template slot-scope="scope">
                  <!-- <router-link></router-link> -->
                  <img :src="scope.row.pic" class="table_img">
                </template>
              </el-table-column>
              <el-table-column align="center" label="商品名称">
                <template slot-scope="scope">
                  <p>{{ scope.row.name }}</p>
                  <p>
                    品牌: {{ scope.row.brandName }} | {{ scope.row.brandEname }}
                  </p>
                  <p>{{ scope.row.description }}</p>
                </template>
              </el-table-column>

              <el-table-column align="center" label="商品价格" width="200">
                <template slot-scope="scope">
                  <p>原价: {{ scope.row.originalPrice}}</p>
                  <p>现价: {{ scope.row.price}}</p>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                prop="productCategoryName"
                label="商品类别"
                width="200"
              />
              <el-table-column
                align="center"
                prop="weight"
                label="重量"
                width="180"
              />
            </el-table>
          </el-radio-group>

          <el-pagination
            :current-page="page.currentPage"
            :page-sizes="page.pageSizes"
            :page-size="page.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-card>
        <span slot="footer" class="dialog-footer" style="text-align: left">
          <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
        <!-- -------------------------------------------------------------------------------------------------------------- -->
         <!-- 编辑最热商品 -->

    <el-dialog title="编辑限时活动" :visible.sync="isEditOpen" width="50%" :modal="false">
      <el-row :gutter="10">
        <el-form
          ref="form"
          :model="form"
          label-width="100px"
          size="mini"
        >
          <el-col :span="12" :offset="0">
            <el-form-item label="商品原价">
              <span>{{ productDetail.price }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="商品名称">
              <span>{{ productDetail.name }}</span>
            </el-form-item>
          </el-col>

          <!-- 需要编辑的内容 -->
          <el-col :span="12" :offset="0">
            <el-form-item label="促销价格">
              <el-input-number v-model="form.promotionPrice" class="myInput" />
            </el-form-item>
          </el-col>

          <el-col :span="12" :offset="0">
            <el-form-item label="排序">
              <el-input-number v-model="form.sort" class="myInput" />
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="开始时间">
              <el-date-picker
                v-model="form.promotionStartTime"
                class="myInput"
                type="datetime"
                placeholder="开始时间"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="结束时间">
              <el-date-picker
                v-model="form.promotionEndTime"
                class="myInput"
                type="datetime"
                placeholder="开始时间"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="活动限购数量">
              <el-input v-model="form.promotionPerLimit" class="myInput" />
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="商品图片">
              <img
                style="width: 150px; height: 150px"
                :src="productDetail.pic"
                alt=""
              >
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <span slot="footer">
        <el-button @click="isEditOpen = false">取消</el-button>
        <el-button
          type="primary"
@click="onSubmit"
        >确定</el-button>
      </span>
    </el-dialog>
      </el-dialog>
      <!-- 品牌列表 -->
      <el-table
        v-loading="loading"
        :data="marketList"
        border
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" fixed="left" />
        <el-table-column label="商品图片" width="150">
          <template slot-scope="scope">
            <!-- <router-link></router-link> -->
            <img :src="scope.row.pic" class="table_img" />
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="productSn"
          label="活动时间"
          width="300"
        >
          <template slot-scope="scope">
            <p>开始时间: {{ scope.row.promotionStartTime }}</p>
            <p>结束时间: {{ scope.row.promotionEndTime }}</p>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="productSn"
          label="是否过期"
          width="100"
        >
          <template slot-scope="scope">
            <p>
              {{
                judgeTime(
                  scope.row.promotionStartTime,
                  scope.row.promotionEndTime
                )
              }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="商品名称"
          width="300"
        />
        <!-- <el-table-column align="center" prop="sort" label="排序" width="150" /> -->
        <el-table-column
          align="center"
          prop="brandName"
          label="品牌名称"
          width="250"
        />

        <el-table-column
          align="center"
          prop="price"
          label="商品价格"
          width="150"
        />
        <el-table-column
          align="center"
          prop="productCategoryName"
          label="商品类别"
          width="150"
        />
        <!-- doing -->

        <el-table-column
          align="center"
          prop="createTime"
          label="创建时间"
          width="350"
        />

        <el-table-column fixed="right" align="center" label="操作" width="200">
          <template slot-scope="scope">
         <el-button type="text" size="small" @click="edit(scope.row)">
              <span style="color: blue">编辑</span>
            </el-button>
            <el-button type="text" size="small" @click="goDelete(scope.row)">
              <span style="color: red">删除</span>
            </el-button>
           
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import {
  findAllRecommends,
  delRecommend,
  findAllBrand,
  productsByPage,
  addRecommend,
  updateRecommend
} from "@/api/market/lists/index";
import mixins from "@/mixins/index"
export default {
  name: "MarketList",
  mixins:[mixins],
  data() {
    return {
      marketList: [],  //页面初始化数据
      loading: false,
      dialogVisible: false,  //新增编辑弹窗
      brandList:[],   //品牌列表
      search: {       //搜索数据
        productSn: "",   //sku
        publishStatus: "",
        verifyStatus: "",
        name: "",   //商品名称
      },
      productList:[],  //点击编辑或者新增渲染
       productId: '', // radio选中 商品id
       isEditOpen:false,  //编辑活动小窗口
       form: {
                productId: '', // 商品ID
                promotionPrice: '',
                promotionPerLimit: '',
                sort: '',
                promotionStartTime: '',
                promotionEndTime: ''
            },    
            productDetail:[]  ,
            num:false
    };
  },
  computed: {
    showList() {
      return this.marketList;
    },
  },
  created() {
    this.inits();
    this.init();
  },
  methods: {
    judgeTime(startTime, endTime) {
      // console.log(new Date(endTime).getTime())
      var num = new Date().getTime() - new Date(endTime).getTime();
      return num > 0 ? "过期" : "否";
    },
    // 初始化页面
    inits() {
      this.loading = true;
      findAllRecommends().then((res) => {
        if (res.success) {
          this.marketList = res.data.items;
        }
        this.loading = false;
      });
    },
    // 删除活动列表
    goDelete(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delRecommend(row.recommendId)
            .then((res) => {
              if (res.success) {
                 this.inits()  //刷新页面
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
              } else {
                this.$message.error(res.message);
              }
            })
            .catch((res) => {
              this.$message.error(res.message);
            });
        })
        .catch((rej) => {
          console.log(rej);
        });
    },
    // 点击新增弹窗
    goAdd() {
     this.dialogVisible = true;
      this.brand();
    },
    // 初始化品牌列表
    brand() {
      findAllBrand().then((res) => {
        console.log(res);
         this.brandList = res.data.items
      });
    },
     // 搜索按钮
    doSearch() {
            this.init()
        },
        doReset(){
         this.search=this.$options.data().search
        },
    //获取热销商品
    init(){
        productsByPage(this.page.currentPage, this.page.size, this.search).then(res=>{
              console.log(res);
               this.productList = res.data.rows
             this.page.total = res.data.total
        })
    },
    // 点击赋值编辑窗口
    radioChange(e){
           console.log(e);
           this.isEditOpen=!this.isEditOpen
            this.productList.forEach((item) => {
                if (item.id === e) {
                    this.productDetail = Object.assign({}, item)
                }
            })
            this.form = {}
            this.productId = e
    },
    edit(row){
        //   console.log(row);
        this.num=true;
          this.dialogVisible = true;
          this.isEditOpen=!this.isEditOpen

          this.form=row
          this.productDetail.name=row.name
          this.productDetail.price=row.price
         this.productId=row.productId
         this.productDetail.pic =row.pic
    },
    // 点击新增后提交
    onSubmit() {
            this.$confirm(`是否确认${ this.num ? "编辑" : "新增" }最热推荐商品?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    if(!this.num){
                   addRecommend({
                            ...this.form,
                            productId: this.productId
                        })
                        .then((res) => {
                            console.log('res', res)
                            if (res.success) {
                                this.isEditOpen = false // 关闭编辑弹窗
                                this.dialogVisible = false // 关闭新增弹窗
                                this.productId = ''
                                this.inits()  //刷新页面
                                this.$emit('success')
                                this.$message.success('添加成功')
                            } else {
                                this.$message.error('添加失败')
                            }
                        })
                    }else{
                      // 编辑提交
                updateRecommend({ ...this.form,
                  productId: this.productId}).then(res=>{
                       if (res.success) {
                                this.isEditOpen = false // 关闭编辑弹窗
                                this.dialogVisible = false // 关闭新增弹窗
                                this.productId = ''
                                this.inits()  //刷新页面
                                this.$emit('success')
                                this.$message.success('添加成功')
                            } else {
                                this.$message.error('添加失败')
                            }
                  })
                    }
                })
                .catch((rej) => {
                    console.log('取消')
                })
        },
    
  },
};
</script>
<style lang="scss" scoped>
.market_main {
  .card {
    margin: 30px;
  }

  .table_img {
    width: 100px;
    height: 100px;
  }
}
</style>
