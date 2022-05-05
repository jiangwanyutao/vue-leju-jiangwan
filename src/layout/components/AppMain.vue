<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
     <span v-if="CopyrightShow" class="global-footer-copyright">
      <span style="margin-bottom:8px">
        Element-UI <a href="https://github.com/PanJiaChen/vue-element-admin" style="margin:0 10px"> <svg-icon icon-class="github" class="github" /></a> Element-admin
      </span>
      <span>Copyright© 2021-2022 江晚正愁余<a href="https://jwyt.xyz" style="margin:0 10px"> <svg-icon icon-class="linkhome" class="github" /></a> 豫ICP备2021037402号-1 </span> 
    </span>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
   data() {
        return {
            CopyrightShow: true
        }
    },
  computed: {
    key() {
      return this.$route.path
    }
  },
   watch: {
        $route(route) {
            if (route.path === '/dashboard') {
                this.CopyrightShow = false
            } else {
                this.CopyrightShow = true
            }
        }
    },
    created() {
        if (this.key === '/dashboard') {
            this.CopyrightShow = false
        } else {
            this.CopyrightShow = true
        }
    }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
.global-footer-copyright {
  margin-top: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
  cursor: pointer;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
