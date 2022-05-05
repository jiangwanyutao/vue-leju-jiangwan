<template>
  <div class="ads_main">
    <el-card class="card" shadow="never">
      <div slot="header">
        <el-button
          type="primary"
          size="small"
          @click="goAdd"
        >新增</el-button>
      </div>
      <!-- 品牌列表 -->

      <el-table
        v-loading="loading"
        :data="adsList"
        border
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" fixed="left" />

        <el-table-column align="center" label="广告图片" width="200">
          <template slot-scope="scope">

            <img :src="scope.row.pic" class="table_img">
          </template>
        </el-table-column>
        <el-table-column align="center" label="时间" width="250">
          <template slot-scope="scope">
            <p>开始时间:{{ scope.row.startTime }}</p>
            <p>结束时间:{{ scope.row.endTime }}</p>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          prop="name"
          label="广告名称"
          width="250"
        />
        <el-table-column
          align="center"
          prop="clickCount"
          label="点击数"
          width="150"
        />
        <el-table-column
          align="center"
          prop="orderCount"
          label="下单数"
          width="150"
        />
        <el-table-column
          align="center"
          prop="type"
          label="轮播位置"
          width="150"
        >
          <template slot-scope="scope">
            <p v-if="scope.row.type===0">首页轮播</p>
            <p v-else>其他</p>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="url"
          label="链接地址"
          width="150"
        />
        <el-table-column
          align="center"
          prop="note"
          label="备注"
          width="150"
        />

        <el-table-column align="center" label="上下线状态" :width="180">
          <template slot-scope="scope">
            <p>
              {{ scope.row.status===1?"上线":"下线" }}
            </p>
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="goEdit(scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              size="small"
              @click="goDelete(scope.row)"
            ><span style="color: red">删除</span></el-button>
          </template>
        </el-table-column>
      </el-table>
<!-- --------------------------------------------------------------------------------------------------------------------- -->
  <el-dialog width="65%" title="广告详情" :visible.sync="open" @close="clear">
      <el-form
        ref="form"
        :rules="rules"
        :inline="true"
        class="demo-form-inline"
        :model="form"
        label-width="100px"
      >
        <el-form-item size="mini" style="width: 45%" prop="name" label="广告名称">
          <el-input
            v-model="form.name"
            class="item_input"
            placeholder="广告名称"
          />
        </el-form-item>
        <el-form-item size="mini" style="width: 45%" label="备注">
          <el-input v-model="form.note" class="item_input" placeholder="备注" />
        </el-form-item>

        <el-form-item size="mini" style="width: 45%" label="排序">
          <el-input v-model="form.sort" class="item_input" placeholder="排序" />
        </el-form-item>
        <el-form-item size="mini" style="width: 45%" label="产品数量">
          <el-input
            v-model="form.productCount"
            class="item_input"
            placeholder="产品数量"
          />
        </el-form-item>
        <el-form-item size="mini" style="width: 45%" label="链接">
          <el-input v-model="form.url" class="item_input" placeholder="链接" />
        </el-form-item>

        <el-form-item size="mini" style="width: 45%" label="首页轮播位置">
          <el-select
            v-model="form.type"
            class="search-input item_input"
            size="small"
            clearable
            placeholder="订单状态"
          >
            <el-option label="APP首页轮播" value="0" />
            <el-option label="1" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item style="width: 45%" label="开始时间">
          <el-date-picker
            v-model="form.startTime"
            type="datetime"
            placeholder="开始时间"
            value-format="yyyy-MM-dd HH:mm:ss"
          />

        </el-form-item>
        <el-form-item style="width: 45%" label="结束时间">
          <el-date-picker
            v-model="form.endTime"
            type="datetime"
            placeholder="结束时间"
            value-format="yyyy-MM-dd HH:mm:ss"
          />

        </el-form-item>
        <el-form-item size="mini" style="width: 45%" label="上下线状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="0"
            class="item_input"
          />
        </el-form-item>

        <el-form-item size="mini" style="width: 45%" label="图片">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :headers="headers"
            :show-file-list="false"
            :on-success="handleBigPicSuccess"
          >
            <img v-if="form.pic" :src="form.pic" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="open = false">取 消</el-button>
        <el-button
          size="small"
          :loading="couldNext"
          type="primary"
          @click="onSubmit"
        >确 定</el-button>
      </div>
    </el-dialog>
    </el-card>
  </div>
</template>

<script>
import {  adsList,
  delAds,
  addAds,
  updateAds} from "@/api/market/advertisement/index"
import mixins from "@/mixins/index"
export default {
    name: 'MarketAdvertisement',
    mixins:[mixins],
    data() {
        return {
            adsList: [],
            loading: false,
            open:false,
             rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' }
                ]
            },
            couldNext: false,
            detailObj: {},
            form: {
                pic: '',
                name: '',
                note: '',
                productCount: '',
                sort: '',
                url: '',
                status: 0,
                type: '1',
                startTime: '',
                endTime: ''
            }
        }
    },
    created() {
        this.getAdsList()
    },
    methods: {
        getAdsList() {
            this.loading = true
           adsList().then(res => {
                if (res.success) {
                    this.loading = false
                    this.adsList = res.data.items
                } else {
                    this.$message.error('获取列表失败')
                    this.loading = false
                }
            })
        },
        goDelete(row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
              delAds(row.id)
                    .then((res) => {
                        if (res.success) {
                            this.getAdsList()
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            })
                        } else {
                            this.$message.error(res.message)
                        }
                    })
                    .catch((res) => {
                        this.$message.error(res.message)
                    })
            }).catch(rej => {
                console.log(rej)
            })
        },
        goAdd() {
           this.open = !this.open
        },
        goEdit(item) {
            this.openDetail(item)
        },
        openDetail(item) {
            this.detailObj = item
            this.open = true
            if (this.detailObj) {
                this.form = item
            } else {
                this.formReset()
            }
        },
        // 大图上传成功
        handleBigPicSuccess(res, file) {
            this.form.pic = res.data.fileUrl
        },
        // 重置表单信息
        formReset() {
            this.form = this.$options.data().form
        },
        clear(){
            this.form = this.$options.data().form
        },
        // 提交
        onSubmit() {
            console.log(this.detailObj);
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.$confirm(
                        `是否确认${this.detailObj.id ? '修改' : '新增'}广告?`,
                        '提示',
                        {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }
                    )
                        .then(() => {
                            this.couldNext = true
                            // 填写确定后的业务逻辑
                            if (!this.detailObj.id) {
                                // 新增广告时的逻辑
                                addAds({
                                        ...this.form
                                        // endTime: this.date[1],
                                        // startTime: this.date[0]
                                    })
                                    .then((res) => {
                                        if (res.success) {
                                            this.open = false
                                            this.$emit('success')
                                            // form表单重置
                                            this.formReset()
                                            this.getAdsList()
                                        } else {
                                            this.$message.error('添加失败')
                                        }
                                        this.couldNext = false
                                    })
                            } else {
                               updateAds({ ...this.form }).then((res) => {
                                    if (res.success) {
                                        this.open = false
                                        this.$emit('success')
                                        this.formReset()
                                        this.getAdsList()
                                    } else {
                                        this.$message.error('修改失败')
                                    }
                                    this.couldNext = false
                                })
                            }
                        })
                        .catch((rej) => {
                            console.log(rej)
                        })
                } else {
                    this.$message.error('请填写必要信息')
                    return false
                }
            })
        }
    
    }
}
</script>
<style lang="scss" scoped>
.ads_main {
  .card {
    margin: 30px;
  }

   .table_img {
    width: 100px;
    height: 100px;
  }
  .ads_main {
  .card {
    margin: 30px;
  }

 
}
  .avatar {
    width: 200px;
    height: 200px;
  }
}
</style>

