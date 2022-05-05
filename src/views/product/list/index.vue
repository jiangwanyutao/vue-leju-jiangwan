<template>
  <div class="margin_40">
    <el-collapse>
      <el-collapse-item title="商品管理介绍" name="1">
        <div class="title">
          商品管理模块可以对客户端的商品进行增删改查等相关操作,来控制客户端商品的列表展示和商品详情
        </div>
      </el-collapse-item>
    </el-collapse>
    <!-- 商品查询 -->
    <el-collapse style="margin-top: 30px">
      <el-collapse-item title="条件查询" name="1">
        <el-form
          :model="search"
          label-width="80px"
          :inline="false"
          class="search"
          size="normal"
        >
          <el-row :gutter="10">
            <el-col class="searchItem" :span="6" :offset="0">
              <el-form-item label="商品名称" size="mini">
                <el-input
                  v-model="search.name"
                  class="search-input"
                  size="mini"
                  placeholder="商品名称/模糊查询"
                />
              </el-form-item>
            </el-col>
            <el-col class="searchItem" :span="6" :offset="0">
              <el-form-item label="商品货号" size="mini">
                <el-input
                  v-model="search.productSn"
                  class="search-input"
                  size="mini"
                  placeholder="商品货号"
                />
              </el-form-item>
            </el-col>
            <el-col class="searchItem" :span="6" :offset="0">
              <el-form-item label="品牌" size="mini">
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
              </el-form-item>
            </el-col>
            <el-col class="searchItem" :span="6" :offset="0">
              <el-form-item label="上架状态" size="mini">
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
              </el-form-item>
            </el-col>

            <el-col class="searchItem" :span="6" :offset="0">
              <el-form-item label="审核状态" size="mini">
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
              </el-form-item>
            </el-col>
            <el-col style="float: right" :span="4" :offset="0">
              <el-button type="default" size="mini" @click="doReset"
                >重置
              </el-button>
              <el-button type="primary" size="mini" @click="doSearch"
                >搜索</el-button
              >
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <el-card class="card" shadow="never">
      <div slot="header">
        <el-button type="primary" size="mini" @click="addProduct"
          >新增</el-button
        >
        <el-button
          type="primary"
          size="mini"
          :loading="downloadLoading"
          @click="handleDownload"
        >
          导出商品列表excel文件
        </el-button>
      </div>
      <!-- 商品列表 -->

      <el-table :data="productList" border style="width: 100%">
        <el-table-column type="index" label="序号" fixed="left" />
        <!-- 商品列表内容 -->
        <el-table-column label="商品图片" width="150">
          <template slot-scope="scope">
            <img
              v-if="scope.row.pic"
              style="width: 100px; height: 100px"
              :src="scope.row.pic"
              class="avatar"
            />
          </template>
        </el-table-column>
        <el-table-column align="center" label="商品名称" width="350">
          <template slot-scope="scope">
            <p>{{ scope.row.name }}</p>
            <p>品牌: {{ scope.row.brandName }}</p>
            <p>{{ scope.row.description }}</p>
          </template>
        </el-table-column>

        <el-table-column align="center" label="商品价格" width="150">
          <template slot-scope="scope">
            <p>原价: {{ scope.row.originalPrice }}</p>
            <p>现价: {{ scope.row.price }}</p>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="productCategoryName"
          label="商品类别"
          width="150"
        />
        <!-- doing -->
        <el-table-column align="center" label="标签" :width="180">
          <template slot-scope="scope">
            <p>
              最新:
              <el-switch
                v-model="scope.row.newStatus"
                size="small"
                :active-value="1"
                :inactive-value="0"
                @change="switchCode('newStatus', scope.row)"
              />
            </p>
            <p>
              推荐:
              <el-switch
                v-model="scope.row.recommendStatus"
                size="small"
                :active-value="1"
                :inactive-value="0"
                @change="switchCode('recommendStatus', scope.row)"
              />
            </p>
          </template>
        </el-table-column>
        <el-table-column align="center" label="标签2" :width="180">
          <template slot-scope="scope">
            <p>
              发布:
              <el-switch
                v-model="scope.row.publishStatus"
                size="small"
                :active-value="1"
                :inactive-value="0"
                @change="switchCode('publishStatus', scope.row)"
              />
            </p>
            <p>
              审核:
              <el-switch
                v-model="scope.row.verifyStatus"
                size="small"
                :active-value="1"
                :inactive-value="0"
                @change="switchCode('verifyStatus', scope.row)"
              />
            </p>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="keywords" label="sku" width="150">
          <template slot-scope="scope">
            <el-button type="text" size="default" @click="skuDetail(scope.row)"
              >编辑sku</el-button
            >
          </template>
        </el-table-column>
        <el-table-column align="center" prop="weight" label="重量" width="80" />
        <el-table-column align="center" prop="sort" label="排序" width="150" />

        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="goEdit(scope.row)"
              >编辑</el-button
            >
            <el-button type="text" size="small" @click="goDelete(scope.row)"
              ><span style="color: red">删除</span></el-button
            >
          </template>
        </el-table-column>
      </el-table>

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

    <!-- ----------------------------------- -->
    <el-dialog :visible.sync="dialog" width="65%" title="sku列表" @close="clear">
      <div slot="footer" class="dialog-footer">
        <el-button
          style="margin-bottom: 20px"
          type="primary"
          size="default"
          @click="addSku"
          >新增</el-button
        >
        <el-table size="mini" :data="skuList" border stripe>
          <el-table-column type="index" label="#" fixed="left" />

          <el-table-column label="图片" :width="120">
            <template slot-scope="scope">
              <el-upload
                style="width: 100px; height: 100px"
                :action="uploadUrl"
                :headers="headers"
                :show-file-list="false"
                :on-success="handleUploadSucc"
                @click.native="getTableItem(scope.row)"
              >
                <img
                  v-if="scope.row.pic"
                  style="width: 100px; height: 100px"
                  :src="scope.row.pic"
                  class="avatar"
                />
                <i
                  v-else
                  style="width: 100px; height: 100px; margin-top: -31px"
                  class="el-icon-plus avatar-uploader-icon"
                />
              </el-upload>
            </template>
          </el-table-column>
          <el-table-column label="颜色" :width="160">
            <template slot-scope="scope">
              <el-input v-model="scope.row.spData[0].value" size="mini" />
            </template>
          </el-table-column>
          <el-table-column label="大小" :width="160">
            <template slot-scope="scope">
              <el-input
                v-if="scope.row.spData[1]"
                v-model="scope.row.spData[1].value"
                size="mini"
              />
            </template>
          </el-table-column>
          <el-table-column label="库存" :width="200">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.stock"
                size="mini"
                placeholder="自定义库存"
              />
            </template>
          </el-table-column>
          <el-table-column label="预警库存" :width="200">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.lowStock"
                size="mini"
                placeholder="预警库存"
              />
            </template>
          </el-table-column>
          <el-table-column label="锁定库存" :width="200">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.lockStock"
                size="mini"
                placeholder="锁定库存"
              />
            </template>
          </el-table-column>
          <el-table-column label="sku编码" :width="200">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.skuCode"
                size="mini"
                placeholder="自定义sku编码"
              />
            </template>
          </el-table-column>
          <el-table-column label="价格" :width="160">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.price"
                size="mini"
                placeholder="价格,单位:分"
              />
            </template>
          </el-table-column>
          <el-table-column label="销量" :width="160">
            <template slot-scope="scope">
              <el-input v-model="scope.row.sale" size="mini" />
            </template>
          </el-table-column>

          <el-table-column fixed="right" label="操作" :width="160">
            <template slot-scope="scope">
              <span v-if="scope.row.id">
                <el-button
                  style="color: red"
                  size="mini"
                  type="text"
                  @click="removeSku(scope.row)"
                  >删除
                </el-button>
                <el-button size="mini" type="text" @click="editSku(scope.row)"
                  >修改编辑
                </el-button>
              </span>
              <span v-else>
                <el-button
                  style="color: red"
                  size="mini"
                  type="text"
                  @click.native.prevent="deleteRow(scope.$index,skuList)"
                  >删除
                </el-button>
                <el-button
                  size="mini"
                  type="text"
                  @click="saveNewSku(scope.row)"
                  >保存
                </el-button>
              </span>
            </template>
          </el-table-column>
        </el-table>

        <el-button style="margin-top: 20px" @click="dialog = false"
          >取 消</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  productsByPage,
  findAllBrand,
  del,
  switchNewStatus,
  switchPreviewStatus,
  switchPublishStatus,
  switchRecommandStatus,
  switchVerifyStatus,
  updateProductAndSkus,
  productSkusDetail,
} from "@/api/product/list/index";
import {delSku,updateSkuInfo,addProductSkus} from "@/api/product/list/sku"
import mixins from "@/mixins/index";
export default {
  mixins: [mixins],
  data() {
    return {
      brandList: [],
      search: {
        productSn: "",
        publishStatus: "",
        verifyStatus: "",
        name: "",
      },
      productList: [],
      searchForm: [],
      downloadLoading: false,
      dialog: false,
      skuList: [],
      productId: "",
      tempTableObj: {}, // 暂时存放的选中sku对象, 用于上传图片返显示
    };
  },
  methods: {
    // 初始化页面
    init() {
      const sendSearch = {};
      for (const key in this.searchForm) {
        // 如果搜索框有的内容
        if (this.searchForm[key] || this.searchForm[key] + "" === "0") {
          console.log("searhc==", this.searchForm[key]);
          sendSearch[key] = this.searchForm[key];
        }
      }
      productsByPage(this.page.currentPage, this.page.size, {
        ...sendSearch,
      }).then((res) => {
        console.log(res);
        this.productList = res.data.rows;
        this.page.total = res.data.total;
      });
    },
    // 获取品牌列表
    getBrandList() {
      findAllBrand()
        .then((res) => {
          this.brandList = res.data.items;
        })
        .catch((rej) => {
          console.log("error", rej);
        });
    },
    // 切换状态
    switchCode(key, item) {
      var id = item.id;
      // 暂存状态，修改失败的时候反选回去
      var tempStatus = item[key] === 0 ? 1 : 0;
      // 根据key 选择接口
      switch (key) {
        case "newStatus":
          switchNewStatus({
            productId: id,
            status: item[key],
          })
            .then((res) => {
              if (res.success) {
                this.$message.success("修改状态成功");
              } else {
                item[key] = tempStatus;
                this.$message.error("修改状态失败");
              }
            })
            .catch((rej) => {
              item[key] = tempStatus;
              this.$message.error("修改状态失败");
            });
          break;
        case "previewStatus":
          switchPreviewStatus({
            productId: id,
            status: item[key],
          })
            .then((res) => {
              if (res.success) {
                this.$message.success("修改状态成功");
              } else {
                item[key] = tempStatus;
                this.$message.error("修改状态失败");
              }
            })
            .catch((rej) => {
              item[key] = tempStatus;
              this.$message.error("修改状态失败");
            });
          break;
        case "publishStatus":
          switchPublishStatus({
            productId: id,
            status: item[key],
          })
            .then((res) => {
              if (res.success) {
                this.$message.success("修改状态成功");
              } else {
                item[key] = tempStatus;
                this.$message.error("修改状态失败");
              }
            })
            .catch((rej) => {
              item[key] = tempStatus;
              this.$message.error("修改状态失败");
            });
          break;
        case "recommendStatus":
          switchRecommandStatus({
            productId: id,
            status: item[key],
          })
            .then((res) => {
              if (res.success) {
                this.$message.success("修改状态成功");
              } else {
                item[key] = tempStatus;
                this.$message.error("修改状态失败");
              }
            })
            .catch((rej) => {
              item[key] = tempStatus;
              this.$message.error("修改状态失败");
            });
          break;
        case "verifyStatus":
          switchVerifyStatus({
            productId: id,
            status: item[key],
          })
            .then((res) => {
              if (res.success) {
                this.$message.success("修改状态成功");
              } else {
                item[key] = tempStatus;
                this.$message.error("修改状态失败");
              }
            })
            .catch((rej) => {
              item[key] = tempStatus;
              this.$message.error("修改状态失败");
            });
          break;
        default:
          break;
      }
    },
    // 重置搜索栏
    doReset() {
      this.search = {
        gname: "",
        pcode: "",
        brandId: "",
        price: "",
      };
      this.searchForm = {};
      this.init();
    },
    // 搜索按钮
    doSearch() {
      this.page.currentPage = 1;
      this.searchForm = Object.assign({}, this.search);
      this.init();
    },
    // 删除
    goDelete(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          del(row.id)
            .then((res) => {
              if (res.success) {
                this.init();
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
    // 新增商品
    addProduct() {
      this.$router.push({ name: "productaddlist" });
    },
    // 编辑
    goEdit(row) {
      // 路由跳转
      this.$router.push({ name: "productaddlist", params: { id: row.id } });
    },
    // 上传图片赋值
    getTableItem(value) {
      this.tempTableObj = value;
    },
     // 返显 图片
    handleTableSuccess(res, file) {
            this.skuList.forEach((item) => {
                if (item === this.tempTableObj) {
                    item.pic = res.data.fileUrl
                }
            })
        },
    // 编辑sku  弹窗
    skuDetail(row) {
      this.dialog = !this.dialog;
      this.productId = row.id;
      productSkusDetail(row.id).then((res) => {
        console.log(res);
         res.data.skus.forEach((item) => {
                        this.skuList.push({
                            ...item,
                            spData: JSON.parse(item.spData)
                        })
                    })
      });
    },
     // 每次关闭弹窗清除信息
    clear() {
      this.skuList = this.$options.data().skuList;
    },
    // 新增sku
    addSku() {
      const obj = {
        productId: this.productId,
        lockStock: "",
        lowStock: "",
        stock: "",
        pic: "",
        price: "",
        sale: "",
        skuCode: "",
        spData: [
          { key: "颜色", value: "" },
          { key: "容量", value: "" },
        ],
      };
      this.skuList.push(obj);
    },
    // 素材上传成功
    handleUploadSucc(res, file, fileList) {
      console.log(res);
      if (res.success) {
        // this.$refs.materialUpload.clearFiles();
        this.skuList.forEach((item) => {
          if (item === this.tempTableObj) {
            item.pic = res.data.fileUrl;
          }
        });
      } else {
        this.$message.error("素材上传失败");
      }
    },
     // 删除sku
        removeSku(row) {
            this.$confirm(
                `是否删除sku?`,
                '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }
            )
            .then(() => {
                    delSku(row.id).then(res => {
                        if (res.success) {
                            this.$message.success('删除sku成功')
                            this.$router.go(0);
                            this.dialog = !this.dialog;
                        } else {
                            this.$message.error('删除sku失败')
                        }
                    })
                    this.$router.go(0);
                })
                .catch((rej) => {
                    console.log('quxiao')
                })
        },
        // 编辑
        editSku(row) {
            const obj = {
                id: row.id,
                lockStock: row.lockStock,
                lowStock: row.lowStock,
                stock: row.stock,
                pic: row.pic,
                price: row.price,
                productId: row.productId,
                sale: row.sale,
                skuCode: row.skuCode,
                spData: JSON.stringify(row.spData)
            }
           this.dialog = !this.dialog;
            updateSkuInfo(obj).then(res => {
                if (res.success) {
                    this.$message.success('修改sku成功')
                } else {
                    this.$message.error('修改sku失败')
                }
                this.dialog = false
                this.$router.go(0);
            })
        },
          //删除sku
    deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      //保存新增sku
      saveNewSku(row) {
            this.dialog = true
           addProductSkus({
                ...row,
                spData: JSON.stringify(row.spData)
            })
                .then(res => {
                    if (res.success) {
                        this.$message.success('新增成功')
                    } else {
                        this.$message.error('新增失败')
                    }
                })
            this.dialog = false
      },
    //导出excell
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const tHeader = ["商品名称", "商品品牌", "商品价格"];
        const filterVal = ["name", "brandName", "price"];
        const list = this.productList;
        const data = this.formatJson(filterVal, list);
          console.log(data);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "商品列表",
          autoWidth: true,
          bookType: "xlsx",
        });
        this.downloadLoading = false;
      });
    },
    // 处理二维数组
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          return v[j];
        })
      );
    },
  },
  computed: {},
  created() {
    this.init();
    this.getBrandList();
  },
  mounted() {},
};
</script>

<style scoped lang="scss">
.margin_40 {
  .title {
    padding-left: 20px;
    font-size: 16px;
  }
  ::v-deep .el-collapse-item__header {
    padding-left: 20px;
    font-size: 16px;
  }

  .search {
    ::v-deep .el-form-item {
      label {
        font-weight: normal;
      }
    }
  }
  .card {
    margin: 30px 0px 30px 0px;
  }
  .search-main {
    .search-input {
      width: 90%;
    }
  }
  .table_img {
    width: 100px;
    height: 100px;
  }
}
</style>
