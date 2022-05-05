<template>
  <div class="detail p_bottom">
    <!-- 我是新增页面 -->
    <div
      v-loading="pageLoading"
      :element-loading-text="loadingOption.text"
      :element-loading-spinner="loadingOption.spinner"
      :element-loading-background="loadingOption.background"
      class="article_main"
    >
      <el-card shadow="never" class="card">
        <div slot="header">
          <span>{{ $route.params.id ? "编辑" : "新增" }}文章</span>
        </div>
        <!-- card body -->
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="120px"
          :inline="true"
          size="normal"
        >
          <el-form-item prop="author" size="small" label="作者">
            <el-input
              v-model="form.author"
              placeholder="作者姓名"
              class="form_ipt"
              style="width: 250px"
            />
          </el-form-item>
          <el-form-item size="small" prop="title" label="标题">
            <el-input
              v-model="form.title"
              placeholder="文章标题"
              class="form_ipt"
              style="width: 250px"
            />
          </el-form-item>
          <el-form-item size="small" style="margin-left: 40px" label="是否显示">
            <el-switch
              v-model="form.isShow"
              :active-value="1"
              :inactive-value="0"
            />
          </el-form-item>
          <br />
          <el-form-item size="small" label="摘要">
            <el-input
              v-model="form.summary"
              placeholder="摘要"
              :autosize="{ minRows: 3, maxRows: 3 }"
              type="textarea"
              class="form_ipt_long"
              style="width: 800px"
            />
          </el-form-item>
          <br />
          <el-form-item size="small" label="封面图片">
            <el-upload
              ref="materialUpload"
              class="upload-demo"
              :action="uploadUrl"
              :headers="headers"
              :on-success="handleUploadSucc"
            >
              <el-button size="small" type="primary">点击上传素材</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
            <img
              v-if="form.coverImg"
              :src="form.coverImg"
              class="uploadImg"
              alt=""
            />
          </el-form-item>
          <br />
          <el-form-item
            size="small"
            style="display: block; width: 100%"
            label="切换富文本类型"
          >
            <el-radio-group v-model="form.editorType" @change="toggleEditType">
              <el-radio :label="0">富文本</el-radio>
              <el-radio :label="1">markdown</el-radio>
            </el-radio-group>
            <span class="warin">
              <i class="el-icon-warning" />
              注意!切换编辑器会清空编辑内容
            </span>
          </el-form-item>
          <!-- 给富文本新增图片 -->
          <el-upload
            v-show="form.editorType === 0"
            ref="innerUpload"
            class="upload-demo"
            :action="uploadUrl"
            :headers="headers"
            :on-success="handleInnerImg"
          >
            <el-button style="margin-bottom: 5px" type="primary" size="small"
              >插入图片↓</el-button
            >
          </el-upload>
          <!-- 富文本 -->
          <div v-if="form.editorType === 0">
            <TEditor v-model="form.content1" ref="tin" />
          </div>
          <!-- markdown -->
          <div v-if="form.editorType === 1">
            <mavon-editor
              ref="mavon"
              @imgAdd="imgAdd"
              v-model="form.content2"
              @change="getMarkDownHtml"
            />
          </div>

          <div class="flexCenter">
            <el-form-item size="small">
              <el-button :loading="loading" type="primary" @click="onSubmit">{{
                id ? "立即修改" : "立即新增"
              }}</el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import mixin from "@/mixins/index";
import {
  addArticle,
  updateArticle,
  productArticle,
  upload,
} from "@/api/content/article/index";
import TEditor from "@/components/Tinymce/index";

export default {
  name: "detail",
  mixins: [mixin],
  components: {
    TEditor,
  },
  data() {
    return {
      id: "",
      pageLoading: false,
      loading: false,
      rules: {
        author: [
          { required: true, message: "请输入作者姓名", trigger: "blur" },
          { min: 2, max: 20, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        title: [{ required: true, message: "请输入文章标题", trigger: "blur" }],
      },
      form: {
        author: "",
        collectCount: "",
        content1: "",
        content2: "",
        coverImg: "",
        createTime: "",
        editorType: 0, // 0富文本  1 markdown
        id: "",
        isShow: 1,
        modifyTime: "",
        summary: "",
        title: "",
        viewCount: "",
        zanCount: "",
      },
    };
  },
  methods: {
    // 页面编辑加载
    getArticleDetail() {
      this.pageLoading = true;
      productArticle(this.id).then((res) => {
        if (res.success) {
          this.form = res.data.productArticle;
          // 是否展示转换为1或者0
          this.form.isShow = this.form.isShow ? 1 : 0;
          // 渲染富文本框和 Markdown内容
          this.$nextTick(() => {
            if (this.form.editorType === 0) {
              this.form.content1 = this.form.content1;
              this.form.content2 = this.form.content1;
            }
          });
        } else {
          this.$message.error("获取文章内容失败");
        }
        this.pageLoading = false;
      });
    },
    // 切换让另一个编辑器内容为空
    toggleEditType(e) {
      if (e) {
        this.form.content1 = this.form.content2 = "";
      }
    },
    // 封面照片上传
    handleUploadSucc(res) {
      if (res.success) {
        // this.$refs.materialUpload.clearFiles();
        this.form.coverImg = res.data.fileUrl;
      } else {
        this.$message.error("素材上传失败");
      }
    },
    // 在富文本内插入圖片
    handleInnerImg(res) {
      if (res.success) {
        this.$refs.innerUpload.clearFiles();
        // 调取封装的方法
        this.$refs.tin.imageSuccessCBK(res.data.fileUrl);
      } else {
        this.$message.error("素材上传失败");
      }
    },
    //markdown插入图片
    getMarkDownHtml(val, val1) {
      console.log(val, val1);
      this.form.content2 = val1;
    },
    // markdown上传图片
    imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      const formData = new FormData();
      formData.append("file", $file);
      upload(formData).then((res) => {
        this.$refs.mavon.$img2Url(pos, res.data.fileUrl);
      });
    },
    // 提交按钮
    onSubmit() {
      // 不能为空
      // console.log(!this.form.content1);
      if (!this.form.content1 && !this.form.content2) {
        this.$message.warning("文章内容不能为空");
        return;
      }
      // 判断rules
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;
          if (!this.id) {
            addArticle({ ...this.form }).then((res) => {
              if (res.success) {
                console.log(res);
                this.$router.push({ name: "contentArticle" });
              } else {
                this.$message.error("添加失败");
              }
              this.loading = false;
            });
          } else {
            updateArticle({ ...this.form }).then((res) => {
              if (res.success) {
                console.log(res);
                this.$router.push({ name: "contentArticle" });
              } else {
                this.$message.error("修改失败");
              }
              this.loading = false;
            });
          }
        } else {
          this.$message.warning("请填写必要信息");
        }
      });
    },
  },
  computed: {},
  // 页面加载判断是否编辑或新增
  created() {
    this.id = this.$route.params.id;
    // console.log(this.id);
    if (this.id) {
      this.getArticleDetail();
    }
  },
  mounted() {},
};
</script>

<style scoped lang="scss">
.warin {
  color: red;
  margin-left: 10px;
}
.uploadImg {
  width: 100px;
  height: 100px;
}
</style>
