import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
//
export const constantRoutes = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: '主页',
        icon: 'dashboard'
      }
    }]
  },

  {
    path: '/auth',
    component: Layout,
    redirect: '/auth',
    name: 'auth',
    meta: {
      title: '权限管理',
      icon: 'el-icon-s-custom'
    },
    children: [{
        path: 'user',
        name: 'user',
         component: () => import('@/views/auth/user/index'),
        meta: {
          title: '账户管理',
          icon: 'el-icon-user'
        }
      },
      {
        path: 'role',
        name: 'role',
         component: () => import('@/views/auth/role/index'),
        meta: {
          title: '角色管理',
          icon: 'el-icon-message-solid'
        }
      },
      {
        path: 'permission',
        name: 'permission',
         component: () => import('@/views/auth/permission/index'),
        meta: {
          title: '资源管理',
          icon: 'el-icon-s-operation'
        }
      }
    ]
  },
  // 注册用户管理
  {
    path: '/registered',
    component: Layout,
    redirect: '/registered',
    name: 'registered',
    meta: {
      title: '注册用户管理',
      icon: 'daa'
    },
    alwaysShow: true,
    children: [{
      path: 'users',
      name: 'users',
      component: () => import('@/views/registered/users/index'),
      meta: {
        title: '用户列表',
        icon: 'dab',
        activeMenu: '/registered/users'
      }
    }]
  },
  {
    path: '/content',
    component: Layout,
    redirect: '/content/article', //打开内容页面直接重定向第一个页面
    name: 'Content',
    alwaysShow: true, // 当子路由只有一个时候,也让他展开
    meta: {
      title: '内容管理',
      icon: 'el-icon-folder'
    },
    //子路由
    children: [{
        path: 'article',
        name: 'contentArticle',
        component: () => import('@/views/content/article/index'),
        meta: {
          title: '文章列表',
          icon: 'el-icon-tickets'
        }
      },
      {
        path: 'addArticle',
        name: 'contentaddArticle',
        hidden: true,
        component: () =>
          import('@/views/content/article/detail/index'),
        meta: {
          title: '新增文章',
          icon: 'el-icon-tickets',
          activeMenu: '/content/article',
          componentUrl: '@/views/content/article/detail/index'
        }
      },
      {
        path: 'editArticle/:id',
        name: 'editArticle',
        hidden: true,
        component: () =>
          import('@/views/content/article/detail/index'),
        meta: {
          title: '编辑文章',
          icon: 'el-icon-tickets',
          activeMenu: '/content/article',
          componentUrl: '@/views/content/article/detail/index'
        }
      },
      {
        path: 'materialList',
        name: 'materialList',
        component: () =>
          import('@/views/content/material/index'),
        meta: {
          title: '素材列表',
          icon: 'el-icon-picture-outline',
          componentUrl: '@/views/content/material/index'
        }
      },
    ]
  },
  // 商品管理
  {
    path: '/product',
    component: Layout,
    redirect: '/product/productlist',
    name: 'Product',
    alwaysShow: true,
    meta: {
      title: '商品管理',
      icon: 'el-icon-s-shop'
    },
    children: [{
        path: 'list',
        name: 'productlist',
        component: () => import('@/views/product/list/index'),
        meta: {
          title: '商品列表',
          icon: 'bab',
          activeMenu: '/Product/list',
        }
      },
      {
        path: 'addlist',
        name: 'productaddlist',
        hidden: true,
        component: () => import('@/views/product/addlist/index'),
        meta: {
          title: '新增列表',
          icon: 'bab',
          activeMenu: '/Product/list',
        }
      },
      {
        path: 'kind',
        name: 'ProductKind',
        component: () => import('@/views/product/kind/index'),
        meta: {
          title: '商品分类',
          icon: 'el-icon-menu',
        }
      },
      {
        path: 'brand',
        name: 'brand',
        component: () => import('@/views/product/brand/index'),
        meta: {
          title: '品牌管理',
          icon: 'bad'
        }
      }
    ]
  },
   // 营销管理
   {
     path: '/market',
     component: Layout,
     redirect: '/market/lists',
     name: 'market',
     meta: {
       title: '营销管理',
       icon: 'eaa'
     },
     alwaysShow: true,
     children: [{
         path: 'lists',
         name: 'lists',
         component: () => import('@/views/market/lists/index'),
         meta: {
           title: '限时活动',
           icon: 'eab'
         }
       },
       {
         path: 'advertisement',
         name: 'advertisement',
         component: () => import('@/views/market/advertisement/index'),
         meta: {
           title: '广告列表',
           icon: 'el-icon-document'
         }
       }
     ]
   },
//订单管理
  {
    path: '/order',
    component: Layout,
    redirect: '/order/address',
    name: 'Order',
    alwaysShow: true,
    meta: {
      title: '订单管理',
      icon: 'el-icon-tickets'
    },
    children: [
      {
        path: 'orderlist',
        name: 'orderlist',
        component: () => import('@/views/order/orderlist/index'),
        meta: {
          title: '订单列表',
          icon: 'el-icon-s-claim'
        }
      },
        {
          path: 'detail/:id',
          name: 'orderdetail',
          hidden:true,
          component: () => import('@/views/order/detail/index'),
          meta: {
            title: '订单详情',
            icon: 'el-icon-s-claim'
          }
      },
      {
        path: 'orderbrank',
        name: 'orderbrank',
        component: () => import('@/views/order/orderbrank/index'),
        meta: {
          title: '退单列表',
          icon: 'el-icon-s-release'
        }
      },
       {
         path: 'backDetail/:id',
         name: 'backDetail',
         hidden: true,
         component: () => import('@/views/order/backDetail/index'),
         meta: {
           title: '退单详情',
           icon: 'el-icon-s-claim'
         }
       }, {
      path: 'address',
      name: 'OrderAddress',
      component: () => import('@/views/order/address/index'),
      meta: {
        title: '地址管理',
        icon: 'el-icon-school'
      }
    }]
  },
  // 个人中心
  {
    path: '/personal',
    component: Layout,
    redirect: '/personal/home',
    name: 'personal',
    meta: {
      title: '个人中心',
      icon: 'get'
    },
    alwaysShow: true,
    children: [{
        path: 'home',
        name: 'home',
        component: () => import('@/views/personal/home/index'),
        meta: {
          title: '个人主页',
          icon: 'aab'
        }
      },
      {
        path: 'set',
        name: 'set',
         component: () => import('@/views/personal/set/index'),
        meta: {
          title: '个人设置',
          icon: 'shez'
        }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
