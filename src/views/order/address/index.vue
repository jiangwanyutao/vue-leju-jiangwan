<template>
  <!-- 地址渲染 -->
  <div class="address p_bottom">
    <el-card class="box-card margin_30">
      <div slot="header" class="clearfix">
        <el-button
          style="float: left"
          size="small"
          type="primary"
          @click="dialogFormVisible = true"
          >新增</el-button
        >
      </div>
      <el-dialog
        title="地址详情"
        :visible.sync="dialogFormVisible"
        @close="clear"
      >
        <el-form :model="form" :rules="rules">
          <el-form-item
            label="发货方地址"
            :label-width="formLabelWidth"
            prop="addressName"
          >
            <el-input
              v-model="form.addressName"
              autocomplete="off"
              size="mini"
              class="width_300"
              placeholder="发货方地址"
            ></el-input>
          </el-form-item>
          <el-form-item label="发货人姓名" :label-width="formLabelWidth">
            <el-input
              v-model="form.name"
              autocomplete="off"
              size="mini"
              class="width_300"
              placeholder="发货人姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="发货人手机号" :label-width="formLabelWidth">
            <el-input
              v-model="form.phone"
              autocomplete="off"
              size="mini"
              class="width_300"
              placeholder="发货人手机号"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮政编码" :label-width="formLabelWidth">
            <el-input
              v-model="form.postCode"
              autocomplete="off"
              size="mini"
              class="width_300"
              placeholder="邮政编码"
            ></el-input>
          </el-form-item>
          <el-form-item label="收货地址" :label-width="formLabelWidth">
            <el-cascader
              size="mini"
              :options="options"
              class="width_300"
              v-model="selectedOptions"
              @change="handleChange"
            >
            </el-cascader>
          </el-form-item>
          <el-form-item label="详细地址" :label-width="formLabelWidth">
            <el-input
              v-model="form.detailAddress"
              autocomplete="off"
              size="mini"
              class="width_300"
              placeholder="详细地址"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 列表渲染 -->
      <el-table :data="list" border style="width: 100%">
        <el-table-column type="index" label="#" width="50" fixed="left">
        </el-table-column>
        <el-table-column prop="addressName" label="地址名称" width="120">
        </el-table-column>
        <el-table-column prop="sendStatus" label="默认发货地址" width="150">
          <template slot-scope="scope">
            默认发货地址:
            <el-switch
              v-model="scope.row.sendStatus"
              :active-value="1"
              :inactive-value="0"
              @change="switchStatus('sendStatus', scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="收货人姓名" width="120">
        </el-table-column>
        <el-table-column prop="phone" label="收货人电话" width="120">
        </el-table-column>
        <el-table-column prop="detailAddress" label="收货人地址" width="220">
             <template slot-scope="scope">
            <p>
              {{ scope.row.province }}
              {{ scope.row.city }}
              {{ scope.row.region }}
            </p>
            <p>
              {{ scope.row.detailAddress }}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="receiveStatus" label="默认收货地址" width="120">
          <template slot-scope="scope">
            默认收货地址:<el-switch
              v-model="scope.row.receiveStatus"
              :active-value="1"
              :inactive-value="0"
              @change="switchStatus('receiveStatus', scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="200">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text" size="small"
              >编辑</el-button
            >
            <el-button
              type="text"
              size="small"
              style="color: red"
              @click="goDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import {
  addressList,
  save,
  setReceiveOne,
  setSendOne,
  companyAddress,
  update
} from "@/api/order/index";
// 导入三级地址列表  npm 搜索 element-china-area-data
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode,
} from "element-china-area-data";
export default {
  data() {
    return {
      list: [],
      dialogFormVisible: false,
      formLabelWidth: "100px",
      form: {
        addressName: "",
        city: "",
        cityCode: "",
        createTime: "",
        detailAddress: "",
        id: "",
        modifyTime: "",
        name: "",
        phone: "",
        postCode: "",
        province: "",
        receiveStatus:"",
        region: "",
        sendStatus: "",
      },
      selectedOptions: "",
      options: regionDataPlus,
      rules: {
        addressName: [
          { required: true, message: "发货地址不能为空", trigger: "blur" },
        ],
      },
      num: 0,
    };
  },
  methods: {
    //   初始化页面
    init() {
      addressList().then((res) => {
        // console.log(res);
        this.list = res.data.items;
      });
    },
    // 修改默认发货状态
    switchStatus(statusName, row) {
      // 暂存原来的状态
      var tempStatus = row[statusName] === 0 ? 1 : 0;
      // 传参
      var params = {};
      params[statusName] = row[statusName];
      params.id = row.id;
      // 发货地址
      if (statusName === "sendStatus") {
        setSendOne(params).then((res) => {
          if (res.success) {
            this.$message.success("修改状态成功");
            this.init();
          } else {
            // 重置switch 变回原来的状态
            row[statusName] = tempStatus;
            this.$message.error("修改状态失败");
          }
        });
      } else {
        setReceiveOne(params).then((res) => {
          if (res.success) {
            this.$message.success("修改状态成功");
            this.init();
          } else {
            // 重置switch 变回原来的状态
            row[statusName] = tempStatus;
            this.$message.error("修改状态失败");
          }
        });
      }
    },
    // 提交修改地址或者新增地址
    submit() {
      // 判断是编辑
      if(!this.form.addressName){
          return
      }
      if (this.num == 1) {
        // console.log("我是编辑");
      
         update(this.form).then((res) => {
          console.log(res);
          //   关闭弹窗
          this.dialogFormVisible = !this.dialogFormVisible;
          this.init();
        });
      } else {
        // console.log("我是提交");
        save(this.form).then((res) => {
          console.log(res);
          //   关闭弹窗
          this.dialogFormVisible = !this.dialogFormVisible;
          this.init();
        });
      }
    },
    // 每次关闭弹窗清除信息
    clear() {
      this.form = this.$options.data().form;
      this.selectedOptions = "";
    },
    // 点击编辑按钮
    edit(val) {
      // 更改模态窗口
      this.dialogFormVisible = !this.dialogFormVisible;
      this.form = val;
      this.selectedOptions = val.cityCode.split(",");
      this.num = 1;
    },
    // 新增地址列表或者编辑地址列表
    handleChange(e) {
      console.log(e);
      this.form.province = CodeToText[e[0]];
      this.form.city = CodeToText[e[1]];
      this.form.region = CodeToText[e[2]];
      this.form.cityCode = e.join(",");
    },
    //删除地址
    goDelete(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          companyAddress(row.id)
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
          console.log(rej);
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

<style scoped lang="scss"></style>
