<template>
  <div class="order-main">
    <!-- 搜索框 -->
    <el-card class="card" shadow="never">
      <div slot="header">
        <span>条件查询</span>
      </div>
      <el-form ref="searchForm" class="search-form" :model="searchForm" label-width="100px" size="mini">
        <el-row :gutter="6">
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

            <el-form-item label="退单状态">
              <el-select
                v-model="searchForm.status"
                class="search-input"
                size="small"
                clearable
                placeholder="退单状态"
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
          <el-col :span="6" :offset="20">
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
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- 退单列表 -->
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
          width="250"
        >
          <template slot-scope="scope">
            <span> {{ scope.row.orderSn }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="退单状态" width="150">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="danger" effect="dark">{{
              statusList[scope.row.status].name
            }}</el-tag>
            <el-tag
              v-else-if="scope.row.status === 1"
              type="warning"
              effect="dark"
            >{{ statusList[scope.row.status].name }}</el-tag>
            <el-tag v-else-if="scope.row.status === 2">{{
              statusList[scope.row.status].name
            }}</el-tag>
            <el-tag v-else-if="scope.row.status === 3" type="info">{{
              statusList[scope.row.status].name
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="描述"
          prop="description"
          width="150"
        />
        <el-table-column
          align="center"
          label="退单原因"
          prop="reason"
          width="150"
        />
        <el-table-column
          align="center"
          label="商品名称"
          width="150"
          prop="productName"
        />
        <el-table-column
          align="center"
          label="商品属性"
          width="190"
          prop="productAttr"
        >
          <template  slot-scope="scope">
            <p v-if="scope.row.productAttr[0]">{{scope.row.productAttr[0].key}} :{{ scope.row.productAttr[0].value}}</p>
            <p v-if="scope.row.productAttr[1]">{{ scope.row.productAttr[1].key }} :{{  scope.row.productAttr[1].value }}</p>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="商家备注"
          width="150"
          prop="handleNote"
        />
        <el-table-column
          align="center"
          label="添加时间"
          prop="createTime"
          width="250"
        />

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
import mixin from '@/mixins/index'
import {findReturnApply} from "@/api/order/orderbrank/index"
export default {
    name: 'OrderBack',
    mixins: [mixin],
    data() {
        return {
            loading: false,
            statusList: [
                { name: '待处理', id: 0 },
                { name: '退货中', id: 1 },
                { name: '已完成', id: 2 },
                { name: '已拒绝', id: 3 }
            ], // 秒杀类型列表
            searchForm: {
                orderSn: '', // 订单编号
                status: '' // 订单状态
            },
            orderList: [], // 订单列表
        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            this.loading = true
             this.orderList=[];
           findReturnApply(this.page.currentPage, this.page.size, this.searchForm)
                .then((res) => {
                    if (res.success) {
                       this.orderList=res.data.rows
                        this.page.total = res.data.total
                        this.getproductAttr()
                         console.log(this.orderList);
                    }
                    this.loading = false
                })
        },
        getproductAttr(){
               this.orderList.forEach((item) => {
                                item.productAttr=JSON.parse(item.productAttr)                   
                            });
        },
        goEdit(row) {
            this.$router.push({ name: 'backDetail', params: { id: row.id }})
        },
        doReset() {
            this.searchForm = this.$options.data().searchForm
        },
        // 点击搜索按钮
        doSearch() {
            this.orderList=[];
            this.init()
        },
    }
}
</script>

<style  scoped lang="scss">
.order-main {
  .search-form{
    ::v-deep .el-form-item{
      label{
          font-weight: normal;
        }
    }
  }
  .card {
    margin: 30px;
  }
  .table_img {
    width: 100px;
    height: 100px;
  }
  .searchBtn_wrapper {
    // margin-top: 20px;
    display: flex;
    flex-direction: row-reverse;
  }
}
</style>