<template>
  <!-- 需要引入mixin-->
  <div class="detail">
        <!-- card body -->
        <!-- 商品信息 -->
 <div class="table-main" v-if="info.orderBase">
      <el-steps :active="activeStep" align-center class="margin_4" >
      <el-step title="待付款" :description="info.orderBase.createTime" />
      <el-step title="待发货" :description="info.orderBase.paymentTime"/>
      <el-step title="已发货" :description="info.orderBase.deliveryTime"/>
      <!-- 订单状态为退货4  已完成不能显示 -->
      <el-step v-if="info.orderBase.status !=4" title="已完成" :description="info.orderBase.receiveTime"/>
      <!-- 订单状态为已完成3  退货不能显示 -->
      <el-step v-if="info.orderBase.status !=3" title="退货" :description="info.orderBase.finishTime" />
    </el-steps>
        <el-divider />
          <div class="table-title">
            订单信息:
            <span style="margin-left:10px" v-if="info.orderBase.createTime">
              <el-tag v-if="info.orderBase.status === 0" type="danger" size="small" effect="dark">
                待付款
              </el-tag>
              <el-tag
                v-else-if="info.orderBase.status === 1"
                size="small"
                type="warning"
                effect="dark"
              >待发货</el-tag>
              <el-tag v-else-if="info.orderBase.status === 2" size="small"> 已发货 </el-tag>
              <el-tag v-else-if="info.orderBase.status === 3" size="small" effect="dark">已完成</el-tag>
              <el-tag
                v-else-if="info.orderBase.status === 4"
                size="small"
                type="info"
                effect="dark"
              >退货</el-tag>
              <el-tag v-else type="info" size="small"> 无效订单 </el-tag>
            </span>
           <div class="orderlist">
             <span style="color:red;">订单金额:{{info.orderBase.totalAmount}}</span>
             <span>订单编号:{{info.orderBase.orderSn}}</span>
             <span>用户账号:{{info.orderBase.memberUsername}}</span>
             <span>备注:{{info.orderBase.totalAmount}}</span>
           </div>
            <div class="orderlist">
             <span>下单时间:{{info.orderBase.createTime}}</span>
             <span>付款时间:{{info.orderBase.paymentTime}}</span>
             <span>发货时间:{{info.orderBase.deliveryTime}}</span>
             <span> 收货时间:{{info.orderBase.receiveTime}}</span>
           </div>
          </div>
        </div>
        <el-divider />
        <!-- 收货人信息 -->
        <div class="table-main">
          <div class="table-title">收货人信息:</div>
           <div class="orderlist" v-if="info.orderBase">
             <span>收货人:{{info.orderBase.receiverName}}</span>
             <span>用户姓名:{{info.orderBase.memberUsername}}</span>
             <span>手机号码:{{info.orderBase.receiverPhone}}</span>
             <span>邮政编码:{{info.orderBase.receiverPostCode}}</span>
           </div>
           <div class="orderlist" v-if="info.orderBase">
             <span>地市:{{info.orderBase.receiverProvince }}{{info.orderBase.receiverCity }}</span>
             <span>详细地址:{{info.orderBase.receiverDetailAddress}}</span>
           </div>
        </div>
        <el-divider />

        <div class="table-main">
          <div class="table-title">商品信息:</div>
          <el-table style="margin-top: 20px" :data="orderItemList" border>
            <el-table-column prop="productName" label="商品名称" align="center" />
            <el-table-column
              prop="productName"
              label="商品图片"
              width="200px"
              align="center"
            >
              <template slot-scope="scope">
                <img
                  style="width: 100px; height: 100px"
                  :src="scope.row.productPic"
                  alt=""
                >
              </template>
            </el-table-column>
            <el-table-column
              prop="isReturn"
              label="是否退货"
              width="250px"
              align="center"
            >
              <template slot-scope="scope">
                <span
                  v-if="scope.row.isReturn == 1"
                  style="color: red; cursor: pointer"
                  @click="goReturn(scope.row)"
                >是</span>
                <span v-else>否</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="productBrand"
              label="品牌"
              width="200px"
              align="center"
            />
            <el-table-column
              prop="productPrice"
              label="价格"
              width="200px"
              align="center"
            />
            <el-table-column
              prop="productQuantity"
              label="商品数量"
              width="200px"
              align="center"
            />

            <el-table-column
              fixed="right"
              prop="totalPrice"
              label="小计"
              width="250px"
              align="center"
            />
          </el-table>
        </div>
 <el-divider />
        <!-- 费用信息 -->
        <div class="table-main">
          <div class="table-title">费用信息:</div>
           <div class="orderlist" v-if="info.orderBase">
             <span>运费金额:0</span>
             <span>订单总金额:{{info.orderBase.totalAmount}}</span>
             <span>实际金额:{{info.orderBase.payAmount}}</span>
             <span>
              促销优化金额:{{info.orderBase.promotionAmount ?info.orderBase.promotionAmount  : 0}}</span>
           </div>
        </div>
         <el-divider />
        <!-- 物流信息 -->
        <div v-if="activeStep >= 3" class="table-main">
          <div class="table-title">
            物流信息:
             <span
              style="color: gray"
            >{{ info.orderBase.deliveryCompany }} [
              {{ info.orderBase.deliverySn }} ]</span>
          </div>
          <el-table
            :data="expressData"
            border
            stripe
            style="width: 100%; margin-top: 25px"
          >
            <el-table-column prop="AcceptTime" label="时间" width="180" />
            <el-table-column prop="AcceptStation" label="状态" />
            <el-table-column prop="Remark" label="备注" width="450" />
          </el-table>
        </div>
 <el-divider />
        <!-- ===================================== -->
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          class="form-lable"
          :inline="false"
          size="mini"
        >

        <el-row :gutter="0"  v-if="activeStep === 2">
  <el-col :span="6">
     <el-form-item prop="deliveryCompany" label="物流公司">
                <el-select
                  v-model="form.deliveryCompany"
                  class="myInput"
                  size="mini"
                  placeholder="请选择物流公司"
                  clearable
                >
                  <el-option
                    v-for="(item,index) in options"
                    :key="index"
                    :label="item.name"
                    :value="item.name"
                  />
                </el-select>
              </el-form-item></el-col>
  <el-col :span="6">  <el-form-item prop="deliverySn" label="物流单号">
                <el-input
                  v-model="form.deliverySn"
                  class="myInput-el"
                  placeholder=""
                  size="mini"
                />
              </el-form-item></el-col>
</el-row>
        </el-form>
        <div class="button_main">
          <!-- v-if="step===1" -->
          <el-button
            v-if="activeStep === 2"
            type="primary"
            style="width: 150px"
            size="small"
            @click="sendOrder"
          >确认发货</el-button>
          
          <div>
            <el-button
              v-if="forceSendShow"
              type="primary"
              style="width: 150px"
              size="small"
              @click="forceFinishOrder"
            >
              强制确认收货
            </el-button>
          </div>
        </div>
     

  </div>
</template>

<script>

import {orderDetail,sendDone,receiveProductsForce}from '@/api/order/orderlist/index'
import mixin from '@/mixins/index'
import kdExpressData from './kdExpress.json'
export default {
    name: 'OrederList',
    mixins: [mixin],
    data() {
        return {
          activeStep: 0,
          info:[],
          forceSendShow:true,
            options: [
                {
                    id: 0,
                    name: '顺丰快递'
                },
                {
                    id: 1,
                    name: '韵达快递'
                },
                {
                    id: 2,
                    name: '中国邮政'
                },
                {
                    id: 3,
                    name: '申通快递'
                },
                {
                    id: 4,
                    name: '中通快递'
                }
            ],
            form: {
                deliverySn: '',
                deliveryCompany: ''
            },
            rules: {
                deliveryCompany: [
                    {
                        required: true,
                        message: '请填写物流公司',
                        trigger: 'change'
                    }
                ],
                deliverySn: [
                    {
                        required: true,
                        message: '请填写物流单号',
                        trigger: 'blur'
                    }
                ]
            },
            orderItemList: [] // 商品列表
        }
    },
    computed: {
        expressData() {
           return kdExpressData.Traces
        }
    },
    created() {
        this.id = this.$route.params.id
        this.init()
    },
    methods: {
    // 去退单列表
        goReturn(row) {
            this.$router.push({
                name: 'backDetail',
                params: { id: row.returnId }
            })
        },
        // 强制确认收货
        forceFinishOrder() {
           receiveProductsForce(this.id)
                .then((res) => {
                    if (res.success) {
                      this.$message.success('关闭订单成功')
                        window.location.reload()
                    } else {
                        this.$message.error('关闭订单失败')
                    }
                })
                .catch((res) => {
                    this.$message.error('关闭订单失败')
                })
        },
        // 确认发货订单窗口
        sendOrder() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    sendDone({
                            orderId: this.id,
                            deliverySn: this.form.deliverySn,
                            deliveryCompany: this.form.deliveryCompany
                        })
                        .then((res) => {
                            if (res.success) {
                                window.location.reload()
                                 this.$message.success('确认订单成功')
                            } else {
                                this.$message.error('确定订单失败')
                            }
                        })
                        .catch((res) => {
                            this.$message.error('确认订单失败')
                        })
                } else {
                    this.$message.warning('请填写必要信息')
                }
            })
        },
        // 获取详情
        init() {
            orderDetail(this.id).then((res) => {
                if (res.success) {
                   this.info = res.data.orderDetail
                    this.activeStep = res.data.orderDetail.orderBase.status + 1
                    this.orderItemList = res.data.orderDetail.orderItems
                      // 判断是否可以强制收货
                    this.judgeForce()
                     this.$message.success('获取数据成功')
                } else {
                    this.$message.error('获取数据失败')
                }
                this.pageLoading = false
            })
        },
        judgeForce() {
            // 循环商品的列表
            this.orderItemList.forEach((element) => {
                // isReturn===1的时候是退货商品 0的时候是正常商品  用来判断显示强制收货按钮
                if (element.isReturn === 0) {
                    this.forceSendShow = false
                }
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.detail{
  width: 100%;
  margin: 30px;
    background-color: #ffffff;
  .table-main{
    padding: 20px;
    .margin_4{
      padding-top: 30px;
      margin: 0 auto;
      width: 80%;
      height: 200px;
    }
  }
  .orderlist{
    display: flex;
    // width: 100%;
    height: 30px;
    justify-content: flex-start;
    align-items: center;
    margin: 5px 5px;
    span{
      width: 400px;
      // margin: 20px;
    }

  }
  .myInput-el{
    width: 75%;
  }
  .button_main {
    margin: 40px auto;
    display: flex;
    width: 100%;
    justify-content: center;
  }
}
</style>
