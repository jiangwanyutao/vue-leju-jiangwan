import {
  getToken
} from '@/utils/myauth'

export default {
  data() {
    return {
      start: 1,
      limit: 10,
      page: {
        currentPage: 1,
        size: 10,
        total: 0,
        pageSizes: [10, 20, 30, 40]
      },
      loadingOption: {
        background: 'rgba(255,255,255,.9)',
        text: '拼了老命加载中.....',
        spinner: 'el-icon-loading'
      },
      uploadUrl: '/lejuAdmin/material/uploadFileOss' // 上传素材公用接口
    }
  },
  methods: {
      //   分页size改变
      handleSizeChange(val) {
          this.page.size = val;
          this.page.currentPage = 1;
          this.init();
        },
        handleCurrentChange(val) {
          this.page.currentPage = val;
          this.init();
        },
  },
  computed: {
    headers() {
      const token = getToken()
      const headers = {
        token: token
      }
      return headers
    }
  }
}
