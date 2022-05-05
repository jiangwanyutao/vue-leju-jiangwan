<template>
  <div class="addGoods">
    <!-- 进度条 -->
    <div class="step_main">
      <el-steps class="step-bar" :active="step" finish-status="success">
        <el-step title="商品基本信息" />
        <el-step title="添加库存信息" />
        <el-step title="添加移动端详情" />
      </el-steps>
    </div>
    <el-card class="box-card">
      <div class="main margin_30">
        <el-form
          ref="form"
          :model="form"
          label-width="80px"
          :inline="false"
          size="normal"
          :rules="rules"
        >
          <!-- ----------------------------------------------------------------------------------- -->
          <div v-if="step == 1" class="basic">
            <p>基本信息</p>
            <el-divider />
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="商品名称 " prop="product.name">
                  <el-input
                    v-model="form.product.name"
                    class="width_300"
                    size="mini"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8"
                ><el-form-item label="商品编码 " prop="product.productSn">
                  <el-input
                    v-model="form.product.productSn"
                    class="width_300"
                    size="mini"
                  /> </el-form-item
              ></el-col>
              <el-col :span="8">
                <el-form-item label="商品分类">
                  <el-select
                    v-model="form.product.productCategoryId"
                    placeholder=""
                    clearable
                    filterable
                    @change="getKindName"
                  >
                    <el-option
                      v-for="item in kindList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="商品品牌">
              <el-select
                v-model="form.product.brandId"
                placeholder=""
                clearable
                filterable
                @change="getfindAllBrand"
              >
                <el-option
                  v-for="item in findAllBrand"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="商品描述">
              <el-input
                v-model="form.product.description"
                class="width_300"
                size="mini"
                type="textarea"
                :rows="1"
                placeholder="商品描述"
              />
            </el-form-item>
            <!-- ----------------------------------------------------------- -->
            <p>商品属性</p>
            <el-divider />

            <el-row :gutter="20">
              <el-col :span="8">
                商品原价:
                <el-input-number
                  v-model="form.product.originalPrice"
                  :min="1"
                  size="medium"
                ></el-input-number>
              </el-col>
              <el-col :span="8">
                <el-form-item label="促销类型" size="small">
                  <el-select
                    v-model="form.product.promotionType"
                    class="myInput"
                    placeholder="促销类型"
                    clearable
                    disabled
                  >
                    <el-option
                      v-for="(item, index) in promotionTypeList"
                      :key="index"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                活动价格:<el-input-number
                  :disabled="true"
                  v-model="form.product.originalPrice"
                ></el-input-number>
              </el-col>
            </el-row>
            重量(kg):<el-input-number
              v-model="form.product.weight"
              :min="1"
              style="margin-top: 10px"
            ></el-input-number>
            <el-row class="margin_t">
              <el-col :span="12">
                审核状态 :
                <el-switch
                  v-model="form.product.verifyStatus"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0"
                >
                </el-switch>
              </el-col>
              <el-col :span="12">
                是否上架 :
                <el-switch
                  v-model="form.product.publishStatus"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0"
                >
                </el-switch>
              </el-col>
            </el-row>
            <el-form-item label="缩略图" prop="product.pic">
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :headers="headers"
                :show-file-list="false"
                :on-success="handleImgSuccess"
              >
                <img
                  v-if="form.product.pic"
                  :src="form.product.pic"
                  class="avatar"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <p>其他信息</p>
            <el-divider />
            <el-row class="margin_t">
              <el-col :span="8">
                推荐状态 :
                <el-switch
                  v-model="form.product.recommendStatus"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0"
                >
                </el-switch
              ></el-col>
              <el-col :span="8">
                新品状态 :
                <el-switch
                  v-model="form.product.newStatus"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0"
                >
                </el-switch
              ></el-col>
              <el-col :span="8">
                预告商品 :
                <el-switch
                  v-model="form.product.previewStatus"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0"
                >
                </el-switch
              ></el-col>
            </el-row>
            <el-row :gutter="20" class="margin_t">
              <el-col :span="8">
                <el-form-item label="搜索关键词">
                  <el-input
                    v-model="form.product.keywords"
                    class="width_300"
                    size="mini"
                    placeholder="关键词"
                  /> </el-form-item
              ></el-col>
              <el-col :span="8"
                ><el-form-item label="库存预警">
                  <el-input-number
                    v-model="form.product.lowStock"
                    :min="1"
                    size="medium"
                  ></el-input-number> </el-form-item
              ></el-col>
              <el-col :span="8">
                <el-form-item label="商品排序">
                  <el-input-number
                    v-model="form.product.sort"
                    :min="1"
                    size="medium"
                  ></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24" class="el-cols">
                产品服务:
                <el-checkbox-group
                  v-model="serviceIds"
                  style="padding-left: 10px"
                >
                  <el-checkbox label="1" name="type">无忧退货</el-checkbox>
                  <el-checkbox label="2" name="type">快速退款</el-checkbox>
                  <el-checkbox label="3" name="type">免费包邮</el-checkbox>
                </el-checkbox-group>
              </el-col>
            </el-row>
          </div>
          <!-- ------------------------------------------------------------------------------------- -->
          <div v-else-if="step == 2" class="sku">
            <h3>商品sku信息</h3>
            <el-divider />
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="标题" prop="product.detailTitle">
                  <el-input
                    v-model="form.product.detailTitle"
                    class="width_300"
                    size="mini"
                  /> </el-form-item
              ></el-col>
              <el-col :span="8">
                <el-form-item label="副标题" prop="product.subTitle">
                  <el-input
                    v-model="form.product.subTitle"
                    class="width_300"
                    size="mini"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <div class="imagescol margin_t">
              <span style="margin-right: 20px">画册图片:</span>
              <el-upload
                :action="uploadUrl"
                :headers="headers"
                list-type="picture-card"
                :file-list="fileList"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="handleImg"
                :limit="5"
                :on-exceed="handleExceed"
              >
                <i class="el-icon-plus"></i>
                <div slot="tip" class="el-upload__tip">
                  只能上传jpg/png文件,且不超过500kb,
                  <span style="color: red">不能超过5张!</span>
                </div>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="" />
              </el-dialog>
            </div>

            <el-form-item label="sku设置" class="margin_t">
              <el-row v-if="colorList.length > 0" :gutter="20">
                <el-col :span="24" :offset="0">
                  颜色：<el-checkbox
                    v-for="item in colorList"
                    :key="item.value"
                    v-model="item.isSelected"
                    >{{ item.value }}
                    <el-button
                      size="mini"
                      type="text"
                      style="color: red; margin-left: 10px"
                      @click="delParam(item, 'colorList')"
                      >删除</el-button
                    >
                  </el-checkbox>
                </el-col>
              </el-row>
              <el-row v-if="sizeList.length > 0" :gutter="20">
                <el-col :span="24" :offset="0">
                  大小:
                  <el-checkbox
                    v-for="item in sizeList"
                    :key="item.value"
                    v-model="item.isSelected"
                    style="margin-left: 5px"
                    >{{ item.value }}
                    <el-button
                      size="mini"
                      type="text"
                      style="color: red; margin-left: 10px"
                      @click="delParam(item, 'sizeList')"
                      >删除</el-button
                    >
                  </el-checkbox>
                </el-col>
              </el-row>
              <div class="content">
                <div class="left">
                  <el-input
                    v-model="iptColor"
                    placeholder="例如:土豪金"
                    size="mini"
                    clearable
                  />
                  <el-button
                    class="colorBtn"
                    type="primary"
                    size="mini"
                    @click="addColor"
                    >创建颜色选项</el-button
                  >
                  <el-input
                    v-model="iptSize"
                    size="mini"
                    placeholder="例如:64g"
                    clearable
                  />
                  <el-button type="primary" size="mini" @click="addSize"
                    >创建大小选项</el-button
                  >
                </div>
                <div class="right">
                  <el-button type="primary" size="mini" @click="addSku"
                    >生成sku</el-button
                  >
                  <el-button type="primary" size="mini" @click="ceatedsku"
                    >新增sku</el-button
                  >
                </div>
              </div>
            </el-form-item>
            <!-- sku列表选项 -->
            <el-table :data="form.pmsSkuStockList" border stripe>
              <el-table-column label="#" type="index" fixed="left">
              </el-table-column>
              <el-table-column label="图片">
                <template v-slot="scope">
                  <el-upload
                    class="upload-demo"
                    action="http://leju.bufan.cloud/lejuAdmin/material/uploadFileOss"
                    :on-success="(el) => aa(el, scope.row)"
                    :headers="token"
                  >
                    <img
                      v-if="scope.row.pic"
                      :src="scope.row.pic"
                      style="width: 100px; height: 100px"
                    />
                    <!-- <el-button v-else size="small" type="primary" @click="btnEvents(scope.row)">点击上传</el-button>
                   -->
                    <el-button
                      v-else
                      size="small"
                      type="primary"
                      @click="btnEvents(scope.row)"
                      >点击上传</el-button
                    >
                  </el-upload>
                </template>
              </el-table-column>
              <el-table-column prop="" label="颜色">
                <template v-slot="scope">
                  <!-- {{ scope.row.spData | filterColor }} -->

                  <el-input v-model="scope.row.spData[0].value" size="mini" />
                </template>
              </el-table-column>
              <el-table-column prop="" label="大小">
                <template v-slot="scope">
                  <!-- {{ scope.row.spData | filterSize }} -->
                  <el-input
                    v-if="scope.row.spData[1]"
                    v-model="scope.row.spData[1].value"
                    size="mini"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="stock" label="库存">
                <template v-slot="scope">
                  <el-input
                    v-model="scope.row.stock"
                    placeholder="自定义库存"
                    size="normal"
                    clearable
                  />
                </template>
              </el-table-column>
              <el-table-column label="预警库存">
                <template v-slot="scope">
                  <el-input
                    v-model="scope.row.lowStock"
                    placeholder="预警库存"
                    size="normal"
                    clearable
                  />
                </template>
              </el-table-column>
              <el-table-column label="锁定库存">
                <template v-slot="scope">
                  <el-input
                    v-model="scope.row.lockStock"
                    placeholder="锁定库存"
                    size="normal"
                    clearable
                  />
                </template>
              </el-table-column>
              <el-table-column label="sku编码">
                <template v-slot="scope">
                  <el-input
                    v-model="scope.row.skuCode"
                    placeholder="sku编码"
                    size="normal"
                    clearable
                  />
                </template>
              </el-table-column>
              <el-table-column label="价格">
                <template v-slot="scope">
                  <el-input
                    v-model="scope.row.price"
                    placeholder=""
                    size="normal"
                    clearable
                  />
                </template>
              </el-table-column>
              <el-table-column label="销量">
                <template v-slot="scope">
                  <el-input
                    v-model="scope.row.sale"
                    placeholder="销量啊喂,当然是越多越好了"
                    size="normal"
                    clearable
                  />
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    @click.native.prevent="
                      deleteRow(scope.$index, form.pmsSkuStockList)
                    "
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- --------------------------------------------------------------------------- -->
          <div v-else class="info">
            <p>详情描述</p>
            <el-divider />
            <!-- 富文本 -->
            商品详情:
            <TEditor v-model="form.product.detailMobileHtml" ref="tin" />
            <el-form-item label="备注" size="small">
              <el-input
                v-model="form.product.note"
                type="textarea"
                class="myInput"
                placeholder="备注"
              />
            </el-form-item>
          </div>
          <div class="bottom_main">
            <el-button
              v-show="step > 1"
              class="submit_button"
              size="small"
              @click="preBtn"
              >返回上一步
            </el-button>
            <el-button
              v-show="step < 3"
              size="small"
              class="submit_button"
              type="primary"
              @click="nextBtn('form')"
              >{{ nextBtnText }}
            </el-button>
            <el-button
              v-show="step == 3"
              size="small"
              class="submit_button"
              type="primary"
              @click="onSubmit"
              >提交保存</el-button
            >
          </div>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import TEditor from "@/components/Tinymce/index";
import {
  productSkusDetail,
  addProductAndSkus,
  findAllBrand,
  updateProductAndSkus,
} from "@/api/product/list/index";
import { getAllCategory } from "@/api/product/kind/index";
import { getToken } from "@/utils/myauth";
import mixins from "@/mixins/index";
export default {
  mixins: [mixins],
  components: {
    TEditor,
  },
  data() {
    return {
      id: "",
      step: 1,
      token: {
        token: getToken(),
      },
      current: {},
      kindList: [], //分类列表
      findAllBrand: [], //品牌列表
      dialogImageUrl: "", //sku图片列表
      dialogVisible: false, //sku查看大图
      iptColor: "", //sku颜色
      iptSize: "", //sku尺寸
      colorList: [],
      sizeList: [],
      show: false, //sku显示
      fileList: [], //画册反选
      // 类型列表
      promotionTypeList: [
        { name: "没有促销使用原价", id: 0 },
        { name: "使用促销价", id: 1 },
        { name: "使用会员价", id: 2 },
        { name: "使用阶梯价格", id: 3 },
        { name: "使用满减价格", id: 4 },
        { name: "限时购", id: 5 },
      ],
      serviceIds: [], // 产品服务
      form: {
        // Sku  存储sku数据
        pmsSkuStockList: [],
        // product 商品基本信息部分
        product: {
          albumPics: [],
          brandId: "",
          brandName: "",
          createTime: "",
          deleteStatus: "",
          description: "",
          detailDesc: "",
          detailHtml: "",
          detailMobileHtml: "",
          detailTitle: "",
          feightTemplateId: "",
          giftGrowth: "",
          giftPoint: "",
          id: "",
          keywords: "",
          lowStock: "",
          modifyTime: "",
          name: "",
          newStatus: "",
          note: "",
          originalPrice: "",
          pic: "",
          previewStatus: "",
          price: "",
          productAttributeCategoryId: "",
          productCategoryId: "",
          productCategoryName: "",
          productSn: "",
          promotionEndTime: "",
          promotionPerLimit: "",
          promotionPrice: "",
          promotionStartTime: "",
          promotionType: "",
          publishStatus: "",
          recommendStatus: "",
          sale: "",
          sort: "",
          stock: "",
          subTitle: "",
          unit: "",
          usePointLimit: "",
          verifyStatus: "",
          weight: "",
          serviceIds: [],
        },
      },
      rules: {
                'product.name': [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
                'product.productSn': [{ required: true, message: '请输入商品编码', trigger: 'blur' }],
                'product.pic': [{ required: true, message: '请上传缩略图' }],
                'product.detailTitle': [{ required: true, message: '请填写标题', trigger: 'blur' }],
                'product.subTitle': [{ required: true, message: '请填写副标题', trigger: 'blur' }]
            },
    };
  },
  computed: {
    // 点击下一步按钮显示内容
    nextBtnText() {
      let text = "";
      switch (this.step) {
        case 1:
          text = "下一步,填写库存信息";
          break;
        case 2:
          text = "下一步,填写移动端详情";
          break;
        default:
          break;
      }
      return text;
    },
  },
  created() {
    this.id = this.$route.params.id;
    if (this.id) {
      this.getproductSkusDetail();
    }
    this.init();
  },
  mounted() {},
  methods: {
    //   如果是编辑进入
    getproductSkusDetail() {
      productSkusDetail(this.id)
        .then((res) => {
          // console.log("我我我我我", res);
          this.form.product = res.data.product;
          // 转化sku格式
          res.data.skus.forEach((item) => {
            this.form.pmsSkuStockList.push({
              ...item,
              spData: JSON.parse(item.spData),
            });
          });
          // 处理sku画册
          if (this.form.product.albumPics) {
            const imgArr = this.form.product.albumPics.split(",");
            imgArr.forEach((item) => {
              this.fileList.push({
                url: item,
              });
            });
          }
          // 处理产品服务
          if (
            this.form.product.serviceIds &&
            this.form.product.serviceIds.length > 0
          ) {
            this.serviceIds = this.form.product.serviceIds.split(",");
          }
        })
        .catch((error) => {
          this.$message.error(error);
        });
    },
    init() {
      //   获取乐居分类列表
      getAllCategory().then((res) => {
        // console.log(res);
        this.kindList = res.data.items.find(
          (ele) => ele.category.name == "乐居"
        ).children;
      });
      //   获取品牌分类
      findAllBrand().then((res) => {
        // console.log(res);
        this.findAllBrand = res.data.items;
      });
    },
    // 上传缩略图
    handleImgSuccess(res, file, fileList) {
      console.log(res);
      if (res.success) {
        this.form.product.pic = res.data.fileUrl;
      } else {
        this.$message.error("素材上传失败");
      }
    },
    // 上传画册图片
    handleImg(res, file, fileList) {
      console.log(res);
      if (res.success) {
        // this.form.product.albumPics.push({ url: res.data.fileUrl });
        this.fileList.push({ url: res.data.fileUrl })
        this.$message.success("上传成功");
      } else {
        this.$message.error("素材上传失败");
      }
    },
    // 移除画册图片
    handleRemove(file, fileList) {
      this.form.product.albumPics = this.form.product.albumPics.filter(
        (item) => {
          return item.url != file.url;
        }
      );
    },
    // 点击画册图片，查看大图
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //超出图片选择
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制上传超过 5 个文件，本次上传选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    // 提交保存
    saveGoods() {
      addProductAndSkus(this.form).then((res) => {
        console.log(res);
      });
    },
     //删除sku
    deleteRow(index, rows) {
        rows.splice(index, 1);
      },
    btnEvents(val) {
      console.log(val);
      this.current = val;
    },
    tableEvents(val) {
      console.log(val);
    },
    aa(val, val1) {
      console.log(val, val1);
      val1.pic = val.data.fileUrl;
    },
    getUploadImg(val) {
      console.log(val);
      this.current.pic = val.data.fileUrl;
    },
    // 添加sku
    addSku() {
      // 判断选中颜色
      if (this.colorList.length <= 0 && this.sizeList.length <= 0) {
        this.$message.error("请选中颜色大小");
        return;
      }
      this.$confirm("此操作将清空sku列表,并生成新的列表, 是否继续?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.form.pmsSkuStockList = [];
        this.show = !this.show;
        // 判断选中了那些颜色
        var selectedColor = this.colorList.filter((ele) => ele.isSelected);
        // 判断选中了大小
        var selectedSize = this.sizeList.filter((ele) => ele.isSelected);
        selectedColor.forEach((ele) => {
          selectedSize.forEach((el) => {
            var obj = {
              createTime: "",
              id: "",
              lockStock: "",
              lowStock: "",
              modifyTime: "",
              pic: "",
              price: "",
              productId: "",
              promotionPrice: "",
              sale: "",
              skuCode: "",
              spData: [
                { key: "颜色", value: ele.value },
                { key: "容量", value: el.value },
              ],
              stock: "",
            };
            this.form.pmsSkuStockList.push(obj);
          });
        });
        this.$message({
          type: "success",
          message: "创建成功!",
        });
      });
    },
    // 新增sku
    ceatedsku() {
       // 判断选中颜色
      if (this.colorList.length <= 0 && this.sizeList.length <= 0) {
        this.$message.error("请选中颜色大小");
        return;
      }
      var obj = {
        createTime: "",
        id: "",
        lockStock: "",
        lowStock: "",
        modifyTime: "",
        pic: "",
        price: "",
        productId: "",
        promotionPrice: "",
        sale: "",
        skuCode: "",
        spData: [
          { key: "颜色", value: "" },
          { key: "容量", value: "" },
        ],
        stock: "",
      };
      this.form.pmsSkuStockList.push(obj);
    },
    // 删除sku尺寸
    delParam(val, dellist) {
      console.log(val, dellist);
      this[dellist] = this[dellist].filter((item) => item.value != val.value);
      //   console.log(index);
    },
    // 添加颜色
    addColor() {
      this.colorList.push({
        value: this.iptColor,
        isSelected: false,
      });
      this.iptColor = "";
    },
    // 添加大小
    addSize() {
      this.sizeList.push({
        value: this.iptSize,
        isSelected: false,
      });
      this.iptSize = "";
    },
    // 设置乐居分类
    getKindName(e) {
      console.log(e);
      this.form.product.productCategoryName = this.kindList.find(
        (ele) => ele.id == e
      ).name;
    },
    // 设置商品品牌
    getfindAllBrand(e) {
      this.form.product.brandName = this.findAllBrand.find(
        (ele) => ele.id == e
      ).name;
    },
    // 上一步
    preBtn() {
      this.step--;
    },
    // 下一步
    nextBtn(formName) {
        // this.step++;
     this.$refs[formName].validate((valid) => {
        if (valid) {
          // 验证成功要做的事
          this.step++;
        } else {
          // 不成功出现显示
          if (this.form.name == "" || this.form.pic == "") {
            // 标题或者内容为空时
            this.$message.error("请填写通知名称或缩略图");
          } else {
            // 标题或者内容超出时
            this.$message.error("请按提示填写正确内容");
          }
          return false;
        }
      });
    },
    onSubmit() {
          const subSkuList = [];
          // 将 skulist处理成后台需要的列表
          this.form.pmsSkuStockList.forEach((item) => {
            subSkuList.push({
              ...item,
              spData: JSON.stringify(item.spData),
            });
          });
          // 改变sku提交的类型
          this.form.pmsSkuStockList = subSkuList
        //  改变服务类型
        this.form.product.serviceIds=this.serviceIds.join(',')
          if (!this.id) {
            //改变产品画册
          const albumPicsArr = this.fileList.map(item => item.url)
            // for(var i=0 ; i<5;i++) {
         this.form.product.albumPics = albumPicsArr.join(','),
           // 新增提交接口
          addProductAndSkus(this.form)
              .then((res) => {
                if (res.success) {
                  this.$message.success("新增成功");
                  this.$router.push({ name: "productlist" });
                }
              })
              .catch((rej) => {
                console.log(rej);
                this.$message.error("添加失败");
              });
                // }
          } else {
            // 编辑=======
           updateProductAndSkus(this.form)
              .then((res) => {
                if (res.success) {
                  this.$message.success("修改成功");
                  this.$router.push({ name: "productlist" });
                }
              })
              .catch((rej) => {
                console.log(rej);
                this.$message.error("添加失败");
              });
          }
    },
  },
};
</script>

<style scoped lang="scss">
.addGoods {
  .step_main {
    width: 100%;
    background-color: #fff;
    margin-bottom: 30px;
    overflow: hidden;
    .step-bar {
      width: 60%;
      margin: 30px auto;
    }
  }
  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      .colorBtn {
        margin-right: 10px;
      }
    }
  }
  .avatar-uploader {
    border: 2px soild #8c939d;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    margin-left: 20px;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  ::v-deep .el-form-item__label {
    font-size: 13px;
  }
  .el-cols {
    display: flex;
  }
  .imagescol {
    display: flex;
  }
  .bottom_main {
    margin-top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
  }
}
</style>
