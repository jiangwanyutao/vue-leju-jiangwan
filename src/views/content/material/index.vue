<template>
  <div
    v-loading="pageLoading"
    :element-loading-text="loadingOption.text"
    :element-loading-spinner="loadingOption.spinner"
    :element-loading-background="loadingOption.background"
    class="category_main p_bottom"
  >
    <el-card shadow="never" class="card">
      <div slot="header">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="headers"
          :show-file-list="false"
          :on-success="handleImgSuccess"
        >
          <el-button size="small" type="primary">点击上传素材</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </div>
      <el-row :gutter="20">
        <el-col
          v-for="item in materialList"
          :key="item.id"
          style="margin-bottom: 20px; width: 20%"
        >
          <el-card shadow="always">
            <div slot="header">
              <span class="materil_text"> 创建时间:{{ item.createTime }}</span>
            </div>
            <!-- 大图展示 -->
            <el-image
              :preview-src-list="imgList"
              style="width: 100%; height: 250px"
              :src="item.ossUrl"
              alt=""
            />
            <div class="flexRight">
              <el-button
                type="danger"
                size="mini"
                style="width: 90px; margin-top: 20px"
                @click="goDel(item.id)"
                >刪除</el-button
              >
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    <el-pagination
      :current-page="page.currentPage"
      :page-sizes="page.pageSizes"
      :page-size="page.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      class="margin_30"
    />
  </div>
</template>

<script>
import { findMaterialByPage, delMaterial } from "@/api/content/material/index";
import mixin from "@/mixins/index";

export default {
  name: "MaterialList",
  mixins: [mixin],
  data() {
    return {
      pageLoading: false,
      imgList: [], // 大图预览列表
      materialList: [], // 素材列表
    };
  },
  created() {
    this.getMaterialList();
  },
  methods: {
    goDel(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delMaterial(id).then((res) => {
            if (res.success) {
              this.getMaterialList();
              this.$message.success("成功删除");
            } else {
              this.$message.error(res.message);
            }
          });
        })
        .catch((rej) => {
          console.log(rej);
        });
    },
    // 获取素材列表
    getMaterialList() {
      this.pageLoading = true;
      findMaterialByPage(this.page.currentPage, this.page.size).then((res) => {
        if (res.success) {
          this.imgList = res.data.rows.map((ele) => ele.ossUrl); // 获取当前页大图列表
          this.materialList = res.data.rows;
          this.page.total = res.data.total;
        } else {
          this.$message.error("获取列表失败");
        }
        this.pageLoading = false;
      });
    },
    // 素材上传成功
    handleImgSuccess(res, file, fileList) {
      console.log(res);
      if (res.success) {
        this.$refs.materialUpload.clearFiles();
        this.getMaterialList();
      } else {
        this.$message.error("素材上传失败");
      }
    },
    //   分页size改变
    handleSizeChange(val) {
      this.page.size = val;
      this.page.currentPage = 1;
      this.getMaterialList();
    },
    handleCurrentChange(val) {
      this.page.currentPage = val;
      this.getMaterialList();
    },
  },
};
</script>

<style lang="scss" scoped>
.category_main {
  min-height: 1000px;
  .card {
    margin: 30px;
  }
  .materil_text {
    font-size: 14px;
  }
  .flexRight {
    display: flex;
    flex-direction: row-reverse;
  }
}
</style>
