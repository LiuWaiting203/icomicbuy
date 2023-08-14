// Composables
import { createRouter, createWebHashHistory, START_LOCATION } from 'vue-router'
import { useUserStore } from '@/store/user'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/FrontLayout.vue'),
    children: [
      {
        path: '',
        name: 'Products',
        component: () => import(/* webpackChunkName: "product" */ '@/views/front/ProductsView.vue'),
        meta: {
          title: '愛買漫 | 商品目錄',
          login: false,
          admin: false
        }
      },
      {
        path: 'seller',
        name: 'Seller',
        component: () => import(/* webpackChunkName: "seller" */ '@/views/front/SellerView.vue'),
        meta: {
          title: '愛買漫 | 販售商品',
          login: true,
          admin: false
        }
      },
      {
        path: 'products/:id',
        name: 'ProductsId',
        component: () => import(/* webpackChunkName: "product-id" */ '@/views/front/ProductsIdView.vue'),
        meta: {
          title: '愛買漫 | 商品',
          login: false,
          admin: false
        }
      },
      {
        path: 'aboutus',
        name: 'AboutUs',
        component: () => import(/* webpackChunkName: "about-us" */ '@/views/front/AboutusView.vue'),
        meta: {
          title: '愛買漫 | 關於我們',
          login: false,
          admin: false
        }
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import(/* webpackChunkName: "cart" */ '@/views/front/CartView.vue'),
        meta: {
          title: '愛買漫 | 購物清單 ',
          login: true,
          admin: false
        }
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "register" */ '@/views/front/LoginView.vue'),
        meta: {
          title: '愛買漫 | 登入',
          login: false,
          admin: false
        }
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import(/* webpackChunkName: "register" */ '@/views/front/RegisterView.vue'),
        meta: {
          title: '愛買漫 | 註冊',
          login: false,
          admin: false
        }
      }
    ]
  },
  {
    path: '/user',
    component: () => import('@/layouts/UserLayout.vue'),
    children: [
      {
        path: 'profile',
        name: 'UserProfile',
        component: () => import(/* webpackChunkName: "user-profile" */ '@/views/user/UserProfileView.vue'),
        meta: {
          title: '愛買漫 | 會員資料',
          login: true,
          admin: false
        }
      },
      {
        path: 'products',
        name: 'UserProducts',
        component: () => import(/* webpackChunkName: "user-products" */ '@/views/user/UserProductsView.vue'),
        meta: {
          title: '愛買漫 | 會員商品管理',
          login: true,
          admin: false
        }
      },
      {
        path: 'orders',
        name: 'UserOrders',
        component: () => import(/* webpackChunkName: "user-orders" */ '@/views/user/UserOrdersView.vue'),
        meta: {
          title: '愛買漫 | 會員訂購紀錄',
          login: true,
          admin: false
        }
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('@/layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'AdminHome',
        component: () => import(/* webpackChunkName: "admin-home" */ '@/views/admin/HomeView.vue'),
        meta: {
          title: '愛買漫 | 管理員後台系統',
          login: true,
          admin: true
        }
      },
      {
        path: 'products',
        name: 'AdminProducts',
        component: () => import(/* webpackChunkName: "admin-products" */ '@/views/admin/ProductsView.vue'),
        meta: {
          title: '愛買漫 | 管理員商品管理',
          login: true,
          admin: true
        }
      },
      {
        path: 'orders',
        name: 'AdminOrders',
        component: () => import(/* webpackChunkName: "admin-orders" */ '@/views/admin/OrdersView.vue'),
        meta: {
          title: '愛買漫 | 管理員訂購紀錄',
          login: true,
          admin: true
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

router.afterEach((to, from) => {
  document.title = to.meta.title
})

router.beforeEach(async (to, from, next) => {
  const user = useUserStore()
  if (from === START_LOCATION) {
    await user.getProfile()
  }
  if (user.isLogin && ['/register', '/login'].includes(to.path)) {
    next('/')
  } else if (to.meta.login && !user.isLogin) {
    next('/login')
  } else if (to.meta.admin && !user.isAdmin) {
    next('/')
  } else {
    next()
  }
})

export default router
