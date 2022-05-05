<template>
  <div
    v-loading="pageLoading"
    :element-loading-text="loadingOption.text"
    :element-loading-spinner="loadingOption.spinner"
    :element-loading-background="loadingOption.background"
    class="orderDetail_main"
  >
    <el-card shadow="never" class="card">
      <!-- 订单信息 -->
      <div class="table-main">
        <div class="table-title">
          订单信息:
          <span style="margin-left: 10px">
            <el-tag
              v-if="status === 0"
              type="danger"
              size="small"
              effect="dark"
            >
              {{ statusList[status].name }}
            </el-tag>
            <el-tag
              v-else-if="status === 1"
              size="small"
              type="warning"
              effect="dark"
            >
              {{ statusList[status].name }}
            </el-tag>
            <el-tag v-else-if="status === 2" size="small">
              {{ statusList[status].name }}
            </el-tag>
            <el-tag v-else-if="status === 3" size="small" type="info">
              {{ statusList[status].name }}
            </el-tag>
          </span>
        </div>
        <!-- 退单详情 -->
        <div class="orderlist">
          <span>订单:{{ detailObj.orderSn }} <span @click="goOrderDetail" style="color:blue; cursor: pointer;">查看订单详情</span> </span
          >
          <span>退单人姓名:{{detailObj.returnName  }}</span>
          <span>退单理由:{{ detailObj.reason }}</span>
          <span>退单描述:{{ detailObj.description }}</span>
        </div>
         <div class="orderlist">
          <span>申请时间::{{ detailObj.createTime }}</span>
        </div>
        <div v-if="imgList.length > 0" class="img_main">
          <div class="left">退单图片:</div>
          <div class="right">
            <el-image
              v-for="(item, index) in imgList"
              :key="index"
              style="width: 100px; height: 100px; margin-right: 20px"
              :src="item"
              :preview-src-list="imgList"
            />
          </div>
        </div>
      </div>
      <el-divider />

      <!-- 退货商品 -->
      <div class="table-main">
        <div class="table-title">退货商品:</div>
        <el-table :data="productList" border style="width: 100%">
          <!-- 商品列表内容 -->
          <el-table-column label="商品图片" width="250">
            <template slot-scope="scope">
              <!-- <router-link></router-link> -->
              <img :src="scope.row.productPic" class="table_img" />
            </template>
          </el-table-column>
          <el-table-column align="center" label="商品描述">
            <template slot-scope="scope">
              <p>{{ scope.row.productName }}</p>
              <p>品牌: {{ scope.row.productBrand }}</p>
            </template>
          </el-table-column>

          <el-table-column align="center" label="商品价格" width="250">
            <template slot-scope="scope">
              <span>{{ scope.row.productRealPrice}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="productAttr"
            label="商品属性"
            width="250"
          >
            <template slot-scope="scope">
              <p>{{ scope.row.productAttr[0].key }} : {{ scope.row.productAttr[0].value }}</p>
              <p v-if=" scope.row.productAttr[1]">{{ scope.row.productAttr[1].key }} : {{ scope.row.productAttr[1].value }}</p>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="productCount"
            label="商品数量"
            width="250"
          />

          <el-table-column align="center" prop="returnAmount" label="总计">
            <template slot-scope="scope">
              <span>{{ scope.row.returnAmount }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 用户信息 -->
      <div class="table-main">
        <div class="table-title">用户信息:</div>
 <div class="orderlist">
          <span>联系人: {{ detailObj.returnName }}</span>
          <span>联系电话: {{ detailObj.returnPhone }}</span>
        </div>
      </div>
      <el-divider />

      <!-- 费用信息 -->
      <div class="table-main">
        <div class="table-title">费用信息:</div>
<div class="orderlist">
          <span>退单金额: <span style="color:red;">{{ detailObj.returnAmount }}元</span> </span>
          <span>运费金额: 0</span>
        </div>
        <div
          v-if="status === 0"
          :style="{
            width: '100%',
            margin: '10px auto',
            fontSize: '16px',
          }"
        >
          <!-- 处理是否退货信息的表单 -->
          <el-form
            ref="handleForm"
            :model="handleForm"
            :rules="handleRules"
            size="mini"
            class="form-lable"
          >
            <el-row :gutter="20">
              <el-col :span="8" :offset="0">
                <el-form-item prop="returnAmount" label="退款金额">
                  <el-input-number
                    v-model="handleForm.returnAmount"
                    class="myInput"
                    placeholder=""
                    size="mini"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="0">
                <el-form-item prop="handleMan" label="处理人">
                  <el-input
                    v-model="handleForm.handleMan"
                    class="myInput"
                    type="text"
                    placeholder=""
                    size="mini"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="0">
                <el-form-item prop="handleNote" label="处理备注">
                  <el-input
                    v-model="handleForm.handleNote"
                    class="myInput"
                    type="text"
                    placeholder=""
                    size="mini"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <el-divider v-if="status > 0" />

      <!-- 处理结果信息 -->
      <div v-if="status !== 0" class="table-main">
        <div class="table-title">处理结果:</div>
       <div class="orderlist">
          <span>处理人:{{ detailObj.handleMan }}</span
          >
          <span>处理备注:{{detailObj.handleNote}}</span>
          <span>退单时间:{{detailObj.handleTime}}</span>
        </div>
      </div>

      <div
        v-if="status === 1"
        :style="{
          width: '100%',
          margin: '10px auto',
          fontSize: '16px',
        }"
      >
        <el-form
          ref="receiveForm"
          :model="receiveForm"
          :rules="receiveRules"
          size="mini"
          class="form-lable"
        >
          <el-row :gutter="20">
            <el-col :span="6" :offset="0">
              <el-form-item label="收货人" prop="receiveMan">
                <el-input
                  v-model="receiveForm.receiveMan"
                  class="myInput"
                  type="text"
                  placeholder=""
                  size="mini"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item label="收货备注" prop="receiveNote">
                <el-input
                  v-model="receiveForm.receiveNote"
                  class="myInput myInput2"
                  type="text"
                  placeholder=""
                  size="mini"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <el-divider v-if="status > 1" />

      <div v-if="status === 2" class="table-main">
        <div class="table-title">收货信息:</div>
  <div class="orderlist">
          <span>退单收货人:{{detailObj.receiveMan}}</span>
          <span>退单收货备注:{{detailObj.receiveNote}}</span>
          <span>退单收货时间:{{detailObj.receiveTime}}</span>
        </div>
      </div>
      <div class="button_main">

        <el-button
          v-if="status === 0"
          type="primary"
          style="width: 150px"
          size="small"
          @click="agreeReturn"
          >同意退款
        </el-button>
        <el-button
          v-if="status === 1"
          type="primary"
          style="width: 150px"
          size="small"
          @click="receiveReturn"
          >确认收货
        </el-button>
        <el-button
          v-if="status === 0"
          style="width: 150px"
          size="small"
          @click="rejectReturn"
          >拒绝退款
        </el-button>

      </div>
    </el-card>
  </div>
</template>

<script>
import { orderReturn,
} from "@/api/order/backDetail";
import mixin from "@/mixins/index";
export default {
  name: "OrderBackDetail",
  mixins: [mixin],
  data() {
    return {
      pageLoading: false,
      id: "", // id
      status: -1, // 订单状态
      detailObj: {}, // 接口获取到的详情对象
      orderTableData: [], //
      userTableData: [], //
      costData: [], //
      resultData: [], //
      receiveData: [], //
      productList: [], // 商品数组
      imgList: [],
      statusList: [
        { name: "待处理", id: 0 },
        { name: "退货中", id: 1 },
        { name: "已完成", id: 2 },
        { name: "已拒绝", id: 3 },
      ],
      // 秒杀类型列表
      handleForm: {
        returnAmount: 0, // 退款金额
        handleNote: "", // 退款备注
        handleMan: "", // 处理人
      },
      receiveForm: {
        receiveNote: "", // 收穫備注
        receiveMan: "", // 收货人
      },
      handleRules: {
        handleMan: [{ required: true, message: "处理人姓名", trigger: "blur" }],
        handleNote: [
          { required: true, message: "处理人备注", trigger: "blur" },
        ],
      },
      receiveRules: {
        receiveMan: [
          { required: true, message: "收货人姓名", trigger: "blur" },
        ],
        receiveNote: [
          { required: true, message: "收货人备注", trigger: "blur" },
        ],
      },

      // 拒绝或者接受备注
    };
  },
  computed: {},
  created() {
    this.id = this.$route.params.id;
    this.init();
  },
  methods: {
    init() {
      this.pageLoading = true;
      orderReturn(this.id).then((res) => {
        if (res.success) {
          this.detailObj = res.data.orderReturnApply;
          this.status = this.detailObj.status;
          // 初始化退货照片数组
          this.initImgs();
          // // 初始化商品信息
          this.initProductTable();
          // // 初始化收货信息
          // this.initReceiveObj();
        }
        this.pageLoading = false;
      });
    },
    // 初始化商品信息
    initProductTable() {
      const obj = {
        productPic: this.detailObj.productPic, // 商品图片
        productName: this.detailObj.productName, // 商品名字
        productAttr: JSON.parse(this.detailObj.productAttr) , // 属性
        productCount: this.detailObj.productCount, // 数量
        productBrand: this.detailObj.productBrand, // 品牌
        productRealPrice: this.detailObj.productRealPrice, // 价格
        returnAmount: this.detailObj.returnAmount, // 总计
      };
      this.productList.push(obj);
    },
    // 处理退货照片
    initImgs() {
      if (this.detailObj.proofPics) {
        this.imgList = this.detailObj.proofPics.split(",");
      }
    },
    // 同意退款
    agreeReturn() {
      this.$refs.handleForm.validate((valid) => {
        if (valid) {
         agreeApply(this.id, {
              id: this.id,
              handleMan: this.handleForm.handleMan,
              handleNote: this.handleForm.handleNote,
              returnAmount: this.handleForm.returnAmount,
            })
            .then((res) => {
              if (res.success) {
                this.$message.success("成功");
                // window.location.reload()
                this.init();
              } else {
                this.$message.error("请求失败");
              }
            });
        } else {
          this.$message.warning("请填写必要信息");
        }
      });
    },
    // 确认收货
    receiveReturn() {
      this.$refs.receiveForm.validate((valid) => {
        if (valid) {
         receiveProduct(this.id, {
              id: this.id,
              receiveMan: this.receiveForm.receiveMan,
              receiveNote: this.receiveForm.receiveNote,
            })
            .then((res) => {
              if (res.success) {
                this.$message.success("成功");
                window.location.reload();
              } else {
                this.$message.error("请求失败");
              }
            });
        } else {
          this.$message.warning("请填写必要信息");
        }
      });
    },
    // 拒绝退款
    rejectReturn() {
      this.$refs.handleForm.validate((valid) => {
        if (valid) {
         rejectApply(this.id, {
              id: this.id,
              handleMan: this.handleForm.handleMan,
              handleNote: this.handleForm.handleNote,
            })
            .then((res) => {
              if (res.success) {
                this.$message.success("成功");
                window.location.reload();
              } else {
                this.$message.error("请求失败");
              }
            });
        } else {
          this.$message.warning("请填写必要信息");
        }
      });
    },
    // 跳转查看订单详情页面
    goOrderDetail() {
      this.$router.push({
        name: "orderdetail",
        params: { id: this.detailObj.orderId },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.orderDetail_main {
  min-height: 900px;
  .orderlist{
    display: flex;
    // width: 100%;
    height: 30px;
    justify-content: flex-start;
    align-items: center;
    margin: 20px 20px;
    span{
      // width: 800px;
      margin: 20px;
    }

  }
  .form-lable {
    ::v-deep .el-form-item {
      label {
        font-weight: normal;
      }
    }
  }
  .flexCenter {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .card {
    margin: 30px;
  }
  .table-main {
    margin: 20px 0;
    .table-title {
      color: rgba(0, 0, 0, 0.85);
      font-weight: 700;
      font-size: 16px;
      margin-bottom: 20px;
    }
  }
  .button_main {
    margin: 40px auto;
    display: flex;
    width: 100%;
    justify-content: center;
  }
  .table_img {
    width: 100px;
    height: 100px;
  }
  .myInput {
    width: 70%;
    margin-left: 10px;
  }
  .myInput2 {
    width: 60%;
  }
  .img_main {
    width: 100%;
    overflow: hidden;
    font-size: 14px;
    margin-bottom: 20px;
    .left {
      float: left;
      width: 5%;
    }
    .right {
      position: relative;
      overflow: hidden;
      float: left;
      width: 90%;
      margin-left: 20px;
      img {
        float: left;
        width: 150px;
        height: 150px;
        margin: 10px;
      }
    }
  }
}
</style>
