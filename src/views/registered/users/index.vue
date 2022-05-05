<template>
  <div class="margin_40">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>注册用户列表</span>
      </div>
      <el-table :data="list" border style="width: 100%">
        <el-table-column
          fixed="left"
          prop="date"
          label="序号"
          type="index"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="120" align="center" >
        </el-table-column>
        <el-table-column prop="icon" label="头像" width="120" align="center">
            <template slot-scope="scope">
          <img class="innerImg" :src="scope.row.icon" alt="" />
        </template>
        </el-table-column>
        
        <el-table-column prop="nickname" label="昵称" width="120" align="center">
        </el-table-column>
        <el-table-column prop="realname" label="真实姓名" width="100" align="center">
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="120" align="center">
             <template slot-scope="scope">
            <span>{{ scope.row.sex === 1 ? '男' : '女' }}</span>
          </template>
             </el-table-column>
             <el-table-column prop="phone" label="电话" width="100" align="center"></el-table-column>
             <el-table-column prop="email" label="邮箱" width="100" align="center"></el-table-column>
             <el-table-column prop="birthday" label="生日" width="100" align="center"></el-table-column>
             <el-table-column prop="createTime" label="注册时间" width="120" align="center"></el-table-column>
      </el-table>
    </el-card>
      <el-pagination
      :current-page="page.currentPage"
      :page-sizes="page.pageSizes"
      :page-size="page.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      class="margin_30"
    />
  </div>
</template>

<script>
import { findMembersByPage } from "@/api/registered/index";
import mixin from "@/mixins/index";
export default {
  mixins: [mixin],
  data() {
    return {
      list: [],
    };
  },
  methods: {
    init() {
      findMembersByPage(this.page.currentPage, this.page.size).then((res) => {
        console.log(res);
        this.list = res.data.rows;
        this.page.total = res.data.total;
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
.margin_40{
   
    .innerImg{
        width: 60px;
        height: 60px;
         border-radius: 50%;
    }
}
</style>
