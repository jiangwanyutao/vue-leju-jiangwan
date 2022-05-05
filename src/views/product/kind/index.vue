<template>
  <!-- 商品管理 -->
  <div class="kind p_bottom">
         <el-card shadow="never" class="card margin_30">
      <div slot="header">
        <span>分类管理</span>
      </div>
      <!-- 乐居分类 -->
      <div class="title" style="margin-bottom:30px">乐居分类:</div>
      <el-row :gutter="20">
        <el-col
          v-for="item in categoryList"
          :key="item.id"
          style="margin-bottom: 20px"
          :span="6"
          :offset="0"
        >
          <el-card shadow="hover">
            <div slot="header">
              <span>{{ item.name }}</span>
            </div>
<!-- 这里用element自带的上传组件,请求头用自己封装的mixins -->
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="headers"
              :show-file-list="false"
              :on-success="handleImgSuccess"
            >
              <img
                v-if="item.icon"
                style="width: 100%; height: 300px"
                :src="item.icon"
                alt=""
                @click="selectCategory(item)"
              >
              <el-button
                v-else
                type="primary"
                size="small"
                @click="selectCategory(item)"
              >上传图片</el-button>
            </el-upload>
          </el-card>
        </el-col>
      </el-row>
      <!-- 树形table -->
      <div class="title">全部分类:</div>
      <el-table
        :data="tableData"
        style=" margin:30px auto"
        row-key="id"
        border
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column label="菜单名称" width="150" fixed>
          <template slot-scope="scope">
            <span>{{ scope.row.name }} </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="icon" width="200">
          <template slot-scope="scope">
            <img class="innerImg" :src="scope.row.icon" alt="">
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="分类名字"
          prop="name"
          width="180"
        />
        <el-table-column
          align="center"
          label="排序"
          prop="sort"
          width="120"
        />
        <el-table-column align="center" label="显示状态" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.showStatus === 1 ? '显示' : '不显示' }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="导航栏展示" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.navStatus === 1 ? '展示' : '不展示' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="描述"
          prop="description"
        />
        <el-table-column
          align="center"
          label="创建时间"
          prop="createTime"
          width="190"
        />
      </el-table>

    </el-card>
  </div>
</template>

<script>
import { getAllCategory,updateCategory } from "@/api/product/kind/index";
import mixin from '@/mixins/index'
export default {
    name: 'ProductCategory',
    mixins: [mixin],
    data() {
        return {
            categoryList: [],
            selectedItem: {},
            tableData: []
        }
    },
    created() {
        this.getCategoryList()
    },
    methods: {
        // 初始化页面
        getCategoryList() {
           getAllCategory()
                .then((res) => {
                    if (res.success) {
                        this.tableData = res.data.items.map((item) => {
                            var obj = item.category
                            obj.children = item.children
                            return obj
                        })
                        // 这里暂时写死,判断是乐居,然后获取他的子分类
                        res.data.items.forEach((item) => {
                            if (item.category.name === '乐居') {
                                this.categoryList = item.children
                            }
                        })
                    } else {
                        this.$message.error('获取数据失败')
                    }
                })
                .catch((rej) => {
                    this.$message.error('获取数据失败')
                })
        },
        selectCategory(row) {
            this.selectedItem = Object.assign({}, row)
        },
            handleImgSuccess(res) {
              if (!res.success) {
                this.$message.error('上传通用接口失败')
                return
            }
            this.$confirm('确认修改图片?').then(() => {
                updateCategory({
                        id: this.selectedItem.id,
                        level: this.selectedItem.level,
                        parentId: this.selectedItem.parentId,
                        icon: res.data.fileUrl
                    })
                    .then((result) => {
                        console.log('rresultes')
                        if (result.success) {
                            this.$message.success('修改成功!')
                            this.getCategoryList()
                        } else {
                            this.$message.error(result.message)
                        }
                    })
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.kind {
  .card {
    margin: 30px;
    .innerImg {
      width: 60px;
      height: 60px;
    }
    .title{
      color: rgba(0, 0, 0, 0.85);
      font-weight: 700;
      font-size: 16px;
    }
  }
}
</style>
