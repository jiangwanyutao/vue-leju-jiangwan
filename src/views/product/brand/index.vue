<template>
  <div class="brand_main">
    <el-card class="card" shadow="never">
      <div slot="header">
        <el-button type="primary" size="small" @click="goAdd">新增</el-button>
      </div>
      <!-- ------------------------------新增弹窗------------------------ -->
      <el-dialog width="65%" title="品牌详情" :visible.sync="open">
        <el-form
          ref="form"
          :rules="rules"
          :inline="true"
          class="demo-form-inline"
          :model="form"
          label-width="150px"
        >
          <el-form-item
            size="mini"
            style="width: 45%"
            prop="name"
            label="品牌名称"
          >
            <el-input
              v-model="form.name"
              class="item_input"
              placeholder="品牌名称"
            />
          </el-form-item>
          <el-form-item size="mini" style="width: 45%" label="首字母">
            <el-input
              v-model="form.firstLetter"
              class="item_input"
              placeholder="首字母"
            />
          </el-form-item>

          <el-form-item size="mini" style="width: 45%" label="排序">
            <el-input
              v-model="form.sort"
              class="item_input"
              placeholder="排序"
            />
          </el-form-item>
          <el-form-item size="mini" style="width: 45%" label="产品数量">
            <el-input
              v-model="form.productCount"
              class="item_input"
              placeholder="产品数量"
            />
          </el-form-item>

          <br />
           <el-form-item size="mini" style="width: 45%" label="品牌故事">
            <el-input
              v-model="form.brandStory"
              class="item_input"
              placeholder="品牌故事"
            />
          </el-form-item>
          <el-form-item size="mini" style="width: 45%" label="是否展示">
            <el-switch
              v-model="form.showStatus"
              :active-value="1"
              :inactive-value="0"
              class="item_input"
            />
          </el-form-item>
          <el-form-item size="mini" style="width: 45%" label="是否为品牌制造商">
            <el-switch
              v-model="form.factoryStatus"
              :active-value="1"
              :inactive-value="0"
              class="item_input"
            />
          </el-form-item>
          <el-form-item size="mini" style="width: 45%" label="上传专区大图">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="headers"
              :show-file-list="false"
              :on-success="handleBigPicSuccess"
            >
              <img v-if="form.bigPic" :src="form.bigPic" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
          <el-form-item size="mini" style="width: 45%" label="上传Logo">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="headers"
              :show-file-list="false"
              :on-success="handleLogoSuccess"
            >
              <img v-if="form.logo" :src="form.logo" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="open = false">取 消</el-button>
          <el-button :loading="couldNext" type="primary" @click="onSubmit"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <!-- 品牌列表 -->

      <el-table
        v-loading="loading"
        :data="brandList"
        border
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" fixed="left" />

        <el-table-column
          align="center"
          prop="name"
          label="品牌名称"
          width="150"
        />

        <el-table-column align="center" label="展示状态" :width="180">
          <template slot-scope="scope">
            <p>
              是否展示:
              <el-switch
                v-model="scope.row.showStatus"
                size="small"
                :active-value="1"
                :inactive-value="0"
                @change="switchCode(scope.row)"
              />
            </p>
          </template>
        </el-table-column>

        <el-table-column align="center" label="logo" width="200">
          <template slot-scope="scope">
            <!-- <router-link></router-link> -->
            <img :src="scope.row.logo" class="table_img" />
          </template>
        </el-table-column>
        <el-table-column align="center" label="专区大图" width="200">
          <template slot-scope="scope">
            <!-- <router-link></router-link> -->
            <img :src="scope.row.bigPic" class="table_img" />
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="brandStory"
          label="品牌故事"
          width="150"
        />
        <el-table-column
          align="center"
          prop="createTime"
          label="创建时间"
          width="300"
        />
        <el-table-column align="center" prop="sort" label="排序" width="150" />
        <el-table-column
          align="center"
          prop="productCommentCount"
          label="产品评论数量"
          width="150"
        />
        <el-table-column
          align="center"
          prop="productCount"
          label="产品数量"
          width="150"
        />
        <el-table-column align="center" label="是否品牌制造商" width="150">
          <template slot-scope="scope">
            <p>{{ scope.row.factoryStatus === 1 ? "是" : "不是" }}</p>
          </template>
        </el-table-column>

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
  </div>
</template>

<script>
import {
  findAllBrand,
  delBrand,
  switchShowStatus,
  addBrand,
  updateBrand,
} from "@/api/product/brand/index";
import mixin from "@/mixins/index";
export default {
  name: "ProductBrand",
  mixins: [mixin],
  data() {
    return {
      brandList: [],
      loading: false,
      couldNext: false,
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
      open: false,
      form: {
        detailObj: "", // 编辑时获取的Obj
        bigPic: "", // 大图专区
        logo: "", // logo
        name: "", // 名称
        firstLetter: "", // 首字母
        sort: "", // 排序
        productCount: "", // 产品数量
        productCommentCount: "", // 产品评价熟料
        showStatus: 1, // 是否展示
        factoryStatus: 1, // 是否品牌制造商
        brandStory:""
      },
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      // this.loading = true
      findAllBrand(this.page.currentPage, this.page.size).then((res) => {
        if (res.success) {
          this.brandList = res.data.items;
          this.page.total = res.data.items.length;
          // this.loading = false
        } else {
          // this.loading = false
          this.$message.error("获取列表失败");
        }
      });
    },
    // 清除搜索
    doReset() {
      this.form = this.$options.data().form;
    },
    // 搜索按钮
    doSearch() {
      console.log("搜索", this.page.currentPage);
      // this.page.currentPage = 1
      // this.getBrandList()
    },
    // 是否展示品牌
    switchCode(item) {
      // console.log(item.factoryStatus)
      var tempStatus = item.showStatus === 0 ? 1 : 0;
      switchShowStatus({
        id: item.id + "",
        status: item.showStatus,
      })
        .then((res) => {
          if (res.success) {
            this.$message.success("修改状态成功");
          } else {
            this.$message.error("修改状态失败");
            item.showStatus = tempStatus;
          }
        })
        .catch((res) => {
          item.showStatus = tempStatus;
          this.$message.error("修改状态失败");
        });
    },
    // 删除
    goDelete(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delBrand(row.id)
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
          console.log("ss", rej);
        });
    },
    // 新增品牌
    goAdd() {
      this.open = !this.open;
    },
    // 编辑
    goEdit(item) {
      console.log(item);
      this.form = item;
      this.open = true;
      this.detailObj = true;
    },
    // 大图上传成功
    handleBigPicSuccess(res, file) {
      if (res.success) {
        this.form.bigPic = res.data.fileUrl;
        this.$message.success("上传成功");
      } else {
        this.$message.error("上传失败");
      }
    },
    // logo上传成功
    handleLogoSuccess(res, file) {
      if (res.success) {
        this.form.logo = res.data.fileUrl;
        this.$message.success("上传成功");
      } else {
        this.$message.error("上传失败");
      }
    },
    // 新增或者编辑提交
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$confirm(
            `是否确认${this.detailObj ? "修改" : "新增"}品牌?`,
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }
          )
            .then(() => {
              // 填写确定后的业务逻辑
              this.couldNext = true;
              if (!this.detailObj) {
                // 新增品牌时的逻辑
                addBrand({ ...this.form }).then((res) => {
                  if (res.success) {
                    this.open = false;
                    this.$emit("success");
                    // form表单重置
                    this.form = this.$options.data().form;
                    this.init();
                  } else {
                    this.$message.error("添加失败");
                  }
                  this.couldNext = false;
                });
              } else {
                updateBrand({ ...this.form }).then((res) => {
                  if (res.success) {
                    this.open = false;
                    this.$emit("success");
                    // form表单重置
                    this.form = this.$options.data().form;
                    this.init();
                  } else {
                    this.$message.error("修改失败");
                  }
                  this.couldNext = false;
                });
              }
            })
            .catch((rej) => {
              console.log("quxiao");
            });
        } else {
          this.$message.error("请填写必要信息");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.brand_main {
  .card {
    margin: 30px;
  }
  .search-main {
    .search-input {
      width: 200px;
    }
  }
}
.table_img {
  width: 100px;
  height: 100px;
}
.card {
  margin: 30px;
}
.search-main {
  .search-input {
    width: 200px;
  }
}
.avatar {
  width: 100px;
  height: 100px;
}
</style>
