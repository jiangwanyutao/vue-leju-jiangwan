<template>
  <div class="user-main">

    <div class="container">
      <el-card class="card" shadow="never">
        <div slot="header">
          <el-button type="primary" size="small" @click="goAdd">新增角色</el-button>
        </div>
        <el-table :data="roleList" border stripe>
          <el-table-column
            label="#"
            type="index"
            width="50"
            fixed
          />
          <el-table-column
            label="角色名称"
            prop="roleName"
            width="200"
            fixed
          />
          <el-table-column
            label="角色编码"
            prop="roleCode"
            width="200"
          />

          <el-table-column
            label="备注"
            prop="remark"
          />
          <el-table-column
            label="添加时间"
            prop="createTime"
            width="200"
          />
          <el-table-column
            label="操作"
            prop="nickName"
            width="300"
          >
            <template slot-scope="scope">
              <el-button type="success" size="mini" @click="goEdit(scope.row.id)">编辑</el-button>
              <el-button type="error" size="mini" @click="goDel(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          style="margin-top: 30px;text-align:right;"
          :current-page.sync="page.start"
          :page-sizes="page.sizes"
          :page-size="page.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
          @size-change="sizeChange"
          @current-change="currentChange"
        />

      </el-card>

    </div>
    <RoleForm ref="roleForm" :menu-list="menuList" @refresh="getRoleList" />

  </div>
</template>

<script>
import {findRolesByPage,findAllPermissions,removeRole} from '@/api/auth/role/index'
import RoleForm from './components/RoleForm'
export default {
    name: 'AuthUser',
    components: {
        RoleForm
    },
    data() {
        return {
            search: {
                username: 'abc'
            },
            roleList: [],
            page: {
                start: 1,
                limit: 10,
                sizes: [10, 20, 30, 40],
                total: 0
            },
            menuList: []
        }
    },
    created() {
        this.getRoleList()
        this.getAllMenuList()
    },
    methods: {
      // 新增
        goAdd() {
            this.$refs.roleForm.openDialog()
        },
        // 编辑
        goEdit(id) {
            this.$refs.roleForm.openDialog(id)
        },
        // 获取用户分页
        getRoleList() {
            findRolesByPage(this.page.start, this.page.limit)
                .then(res => {
                    if (res.success) {
                        this.roleList = res.data.rows
                        this.page.total = res.data.total
                    } else {
                        this.$message.error(res.message)
                    }
                })
        },
        doReset() {
            // 重置表单  前提:prop属性必须存在
            this.$refs.searchForm.resetFields()
        },
        doSearch() {
        },
        sizeChange(v) {
          this.page.limit = v;
          this.getRoleList();
        },
        currentChange(v) {
          this.page.start = v;
          this.getRoleList();
        },
        // 初始化所有菜单备用
        getAllMenuList() {
            // 获取所有左侧菜单栏菜单！！！
            findAllPermissions().then((res) => {
                if (res.success) {
                    this.menuList = res.data.menus
                } else {
                    this.$message.error('获取数据失败!')
                }
                this.loading = false
            })
        },
        goDel(id) {
            this.$confirm('确认删除角色?')
                .then(res => {
                   removeRole(id)
                        .then(res => {
                            if (res.success) {
                                this.$message.success('删除成功!')
                                this.getRoleList()
                            } else {
                                this.$message.error('删除失败')
                            }
                        })
                })
        }

    }
}
</script>

<style lang="scss" scoped>
  .user-main{
    .card{
      margin: 30px;
    }
    .avatar-img{
      width: 120px;
      height: 80px;
    }
  }
</style>
