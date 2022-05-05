<template>
  <!-- 文章列表 -->
  <div class="article p_bottom">
    <el-card class="margin_30">
      <div slot="header" class="clearfix">
        <span>条件查询</span>
      </div>
      <el-form ref="form" label-width="100px" size="small" :model="search">
        <el-row :gutter="20">
          <el-col :span="6" :offset="0">
            <el-form-item label="作者">
              <el-input
                class="search-input"
                size="small"
                placeholder="作者"
                v-model="search.author"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="0">
            <el-form-item label="标题">
              <el-input
                class="search-input"
                size="small"
                placeholder="标题"
                v-model="search.title"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="0">
            <el-form-item label="编辑类型">
              <el-select
                class="search-input"
                size="small"
                clearable
                placeholder="编辑类型"
                v-model="search.editorType"
              >
                <el-option label="富文本" :value="0" />
                <el-option label="markDown" :value="1" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="18">
            <el-button type="default" size="mini" @click="doReset"
              >重置
            </el-button>
            <el-button type="primary" size="mini" @click="onSubmit"
              >搜索</el-button
            >
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- 文章列表 -->
    <el-card shadow="never" class="card margin_30">
      <div slot="header">
        <el-button type="primary" size="small" @click="addArticle"
          >新增</el-button
        >
      </div>
      <!-- --------------------------------------- -->
      <el-table :data="list" border style="width: 100%">
        <el-table-column type="index" label="#" width="50" fixed="left" />
        <el-table-column
          prop="title"
          label="文章标题"
          align="center"
          width="200"
        />
        <el-table-column
          prop="coverImg"
          label="展示图片"
          align="center"
          width="200"
        >
          <template v-slot="scope">
            <img style="width: 100px" :src="scope.row.coverImg" alt="" />
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="添加时间"
          align="center"
          width="200"
        />
        <el-table-column
          prop="author"
          label="文章作者"
          align="center"
          width="250"
        />
        <el-table-column label="文章是否展示" align="center" width="200">
          <template v-slot="scope">
            <!-- {{ scope.row }} -->
            <el-switch
              v-model="scope.row.isShow"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="switchCode(scope.row)"
            />
          </template>
        </el-table-column>

        <el-table-column
          prop="editorType"
          label="内容"
          align="center"
          width="200"
        >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.editorType === 0">富文本框</el-tag>
            <el-tag v-else-if="scope.row.editorType === 1">Markdown</el-tag>
          </template>
        </el-table-column>
        <!-- ---------------------------编辑删除 -->
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              style="margin-right: 10px"
              type="text"
              size="small"
              @click="goEdit(scope.row)"
            >
              <i style="margin-right: 6px" class="el-icon-view" />编辑文章
            </el-button>
            <el-button type="text" size="small" @click="goDelete(scope.row)">
              <span style="color: red">删除</span>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="start"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<script>
import {
  findArticles,
  changeShowStatus,
  del,
} from "@/api/content/article/index";
export default {
  data() {
    return {
      start: 1,
      limit: 10,
      search: {
        author: "",
        collectCount: "",
        content1: "",
        content2: "",
        coverImg: "",
        createTime: "",
        editorType: "",
        id: "",
        isShow: "",
        modifyTime: "",
        summary: "",
        title: "",
        viewCount: "",
        zanCount: "",
      },
      list: [],
      total: 0,
    };
  },
  methods: {
    init() {
      findArticles(this.start, this.limit, this.search).then((res) => {
        // console.log(res);
        //改变开关的属性
        res.data.rows.forEach((element) => {
          element.isShow = element.isShow == 1 ? true : false;
        });
        this.list = res.data.rows;
        this.total = res.data.total;
      });
    },
    // 切换每页显示页数
    handleSizeChange(res) {
      // console.log(res);
      this.limit = res;
      this.init();
    },
    //切换第几个页面
    handleCurrentChange(res) {
      // console.log(res);
      this.start = res;
      this.init();
    },
    // 更新文章显示状态
    switchCode(row) {
      // console.log(row);
      // 保存修改前的状态
      var tempStatus = row.isShow  ? 1 : 0;
      changeShowStatus({
        id: row.id,
        isShow: row.isShow  ? 1 : 0,
      }).then((res) => {
        // console.log(res);
        if (res.success) {
          this.$message.success("修改状态成功");
        } else {
          row.isShow = tempStatus;
          this.$message.error("修改状态失败");
        }
      });
    },
    // 搜索文章
    onSubmit() {
      this.init();
    },
    //重置输入框
    doReset() {
      this.search = this.$options.data().search;
      this.init();
    },
    //删除文章
    goDelete(row) {
      // console.log(row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          del(row.id).then((res) => {
            if (res.success) {
              this.init();
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            } else {
              this.$message.error(res.message);
            }
          });
        })
        .catch((rej) => {
          console.log(rej);
        });
    },
    // 新增文章
    addArticle() {
      this.$router.push({ path: "addArticle" });
    },
    // 编辑文章
    goEdit(row) {
      // query传参
      this.$router.push({
        name: "editArticle",
        params: {
          id: row.id,
        },
      });
    },
  },
  computed: {},
  created() {
    this.init();
  },
  mounted() {},
};
</script>

<style scoped lang="scss">
.article {
  // margin-bottom: 30px;
  background-color: #f0f2f5;
}
.el-col-offset-18 {
  margin-left: 0;
}
</style>
