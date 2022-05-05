<template>
  <div class="order-main">
    <!-- 搜索框 -->
    <el-card class="card" shadow="never">
      <div slot="header">
        <span>条件查询</span>
      </div>
      <el-form ref="searchForm" class="searchForm" :model="searchForm" label-width="100px" size="mini">
        <el-row :gutter="20">
          <el-col :span="6" :offset="0">
            <el-form-item label="订单编号">

              <el-input
                v-model="searchForm.orderSn"
                style="width: 200px"
                placeholder="请填写订单编号"
                size="mini"
                clearable
              />
            </el-form-item>

          </el-col>
          <el-col :span="6" :offset="0">
            <el-form-item label="订单类型">
              <el-select
                v-model="searchForm.orderType"
                class="search-input"
                size="mini"
                clearable
                placeholder="订单类型"
              >
                <el-option
                  v-for="item in orderTypeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>

            </el-form-item>

          </el-col>
          <el-col :span="6" :offset="0">
            <el-form-item label="支付方式">
              <el-select
                v-model="searchForm.payType"
                class="search-input"
                size="mini"
                clearable
                placeholder="支付方式"
              >
                <el-option
                  v-for="item in payTypeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>

            </el-form-item>

          </el-col>
          <el-col :span="6" :offset="0">
            <el-form-item label="订单状态">
              <el-select
                v-model="searchForm.status"
                class="search-input"
                size="mini"
                clearable
                placeholder="订单状态"
              >
                <el-option
                  v-for="item in statusList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>

          </el-col>
        </el-row>
      </el-form>
      <div class="searchBtn_wrapper">
        <el-button
          style="margin: 0 20px"
          type="default"
          size="mini"
          @click="doReset"
        >重置</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="doSearch"
        >搜索</el-button>
      </div>
      <!-- card body -->
    </el-card>
    <!-- 订单列表 -->
    <el-card class="card" shadow="never">
      <el-table
        v-loading="loading"
        :data="orderList"
        border
        style="width: 100%"
      >
        <el-table-column type="index" label="#" fixed="left" />

        <el-table-column
          align="center"
          label="订单编号"
          prop="orderSn"
          width="300"
        >
          <template slot-scope="scope">
            <!-- <router-link></router-link> -->
            <span> {{ scope.row.orderSn }}</span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="支付方式"
          prop="payType"
          width="200"
        >
          <template slot-scope="scope">
            <!-- <router-link></router-link> -->
            <el-button
              v-if="scope.row.payType === 0"
              type="info"
              size="mini"
              effect="dark"
            >未支付</el-button>
            <img
              v-else-if="scope.row.payType === 1"
              style="width: 30px; height:30px"
              src="../../../icons/svg/alipay.png"
            >
           <img
              v-else
              style="width: 30px; height:30px"
              src="../../../icons/svg/weixin.png"
            >
          </template>
        </el-table-column>
        <el-table-column align="center" label="订单状态" width="200">
          <template slot-scope="scope">
            <!-- <router-link></router-link> -->
            <el-tag
              v-if="scope.row.status === 0"
              type="danger"
              effect="dark"
            >待付款</el-tag>
            <el-tag
              v-else-if="scope.row.status === 1"
              type="warning"
              effect="dark"
            >待发货</el-tag>
            <el-tag v-else-if="scope.row.status === 2">已发货</el-tag>
            <el-tag
              v-else-if="scope.row.status === 3"
              effect="dark"
            >已完成</el-tag>
            <el-tag
              v-else-if="scope.row.status === 4"
              type="info"
              effect="dark"
            >退货</el-tag>
            <el-tag v-else type="info">无效订单</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="添加时间"
          prop="createTime"
          width="300"
        />
        <el-table-column
          align="center"
          label="用户账号"
          prop="memberUsername"
          width="200"
        />
        <el-table-column align="center" label="订单类型" width="200">
          <template slot-scope="scope">
            <!-- <router-link></router-link> -->
            <el-tag
              v-if="scope.row.orderType === 1"
              type="warning"
            >秒杀订单</el-tag>
            <el-tag v-else type="success">正常订单</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="备注" width="200" prop="note" />
        <el-table-column fixed="right" align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              type="primary"
              style="width: 150px"
              size="mini"
              @click="goEdit(scope.row)"
            >
              <i
                style="margin-right: 6px"
                class="el-icon-view"
              />查看订单</el-button>
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
import {findOrdersByPage} from "@/api/order/orderlist/index"
import mixin from '@/mixins/index'
export default {
    name: 'Order',
    mixins: [mixin],
    data() {
        return {
            loading: false,
            orderTypeList: [
                { name: '正常订单', id: 0 },
                { name: '秒杀订单', id: 1 }
            ], // 秒杀类型列表
            payTypeList: [
                { name: '未支付', id: 0 },
                { name: '支付宝', id: 1 },
                { name: '微信', id: 2 }
            ], // 秒杀类型列表
            statusList: [
                { name: '待付款', id: 0 },
                { name: '待发货', id: 1 },
                { name: '已发货', id: 2 },
                { name: '已完成', id: 3 },
                { name: '退货', id: 4 },
                { name: '无效订单', id: 5 }
            ], // 秒杀类型列表
            searchForm: {
                orderSn: '', // 订单编号
                orderType: '', // 订单类型
                payType: '', // 支付类型
                status: '' // 订单状态
            },
            search: {
                orderSn: '', // 订单编号
                orderType: '', // 订单类型
                payType: '', // 支付类型
                status: '' // 订单状态
            },
            orderList: [] // 订单列表
        }
    },
    computed: {},
    created() {
        this.init()
    },
    methods: {
    // 获取api
        init() {
            // 发送的搜索框信息,如果没有信息, 则不传
            this.loading = true
            const sendSearch = {}
            for (const key in this.search) {
                // 如果搜索框有的内容
                if (this.search[key] || this.search[key] + '' === '0') {
                    sendSearch[key] = this.search[key]
                }
            }
           findOrdersByPage(this.page.currentPage, this.page.size, {
                    ...sendSearch
                })
                .then((res) => {
                    if (res.success) {
                        this.orderList = res.data.rows
                        this.page.total = res.data.total
                    } else {
                        this.$message.error('列表请求失败')
                    }
                    this.loading = false
                })
                .catch((rej) => {
                    this.loading = false
                    this.$message.error('列表请求失败')
                })
        },
        // 重置搜索栏
        doReset() {
            this.searchForm = this.$options.data().searchForm
            this.search = this.$options.data().search
            this.init()
        },
        // 点击搜索按钮
        doSearch() {
            this.page.currentPage = 1
            this.search = Object.assign({}, this.searchForm)
            this.init()
        },
        // 编辑
        goEdit(row) {
            // 路由跳转
            this.$router.push({ name: 'orderdetail', params: { id: row.id }})
        },
    }
}
</script>

<style  scoped lang="scss">
.order-main {
  .searchForm{
    ::v-deep .el-form-item{
      label{
          font-weight: normal;
        }
    }
  }
  .card {
    margin: 30px;
  }
  .search-main {
    .search-input {
      width: 200px;
    }
  }
  .table_img {
    width: 100px;
    height: 100px;
  }
  .searchBtn_wrapper {
    margin-top: 20px;
    display: flex;
    flex-direction: row-reverse;
  }
}
</style>
