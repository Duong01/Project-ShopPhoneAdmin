import { createRouter, createWebHistory } from 'vue-router'
// import api from "@/model/api.js"
import store from "@/store"

// component
const Home = () => import('@/components/Home')
const Product = () => import('@/components/Product')
const ProductDetail = () => import('@/components/ProductDetail')
const AddCart = () => import('@/components/AddCart.vue')
const PersonalInformation = () => import('@/components/PersonalInformation.vue')
import Layout from '@/components/Layout'
import Test from '@/components/Test'

// pages
// Categories
const Iphone = () => import('@/pages/categories/phone/Iphone')
const SamSung = () => import('@/pages/categories/phone/SamSung')
const Oppo = () => import('@/pages/categories/phone/Oppo')
const Xiaomi = () => import('@/pages/categories/phone/Xiaomi')
const LoudSpeaker = () => import('@/pages/categories/PhoneAaccessories/LoudSpeaker')
const EarPhone = () => import('@/pages/categories/PhoneAaccessories/EarPhone')
const Charger = () => import('@/pages/categories/PhoneAaccessories/Charger')
const ChargerCable = () => import('@/pages/categories/PhoneAaccessories/ChargerCable')
const StickGimbal = () => import('@/pages/categories/PhoneAaccessories/StickGimbal')
const Stand = () => import('@/pages/categories/PhoneAaccessories/Stand')
const Hook = () => import('@/pages/categories/PhoneAaccessories/Hook')
const Waterproof = () => import('@/pages/categories/PhoneAaccessories/Waterproof')

// Cart
const Cart = () => import('@/pages/cart/Cart')
const Thanhtoan = () => import('@/pages/cart/Thanhtoan')


// Order
const Order = () => import('@/pages/order/Order')
const Processing = () => import('@/pages/order/Processing')
const Processed = () => import('@/pages/order/Processed')
const Ordering = () => import('@/pages/order/Ordering')
const Success = () => import('@/pages/order/Success')

// Footer
const TinTuc = () => import('@/pages/footer/tintuc')
const TuyenDung = () => import('@/pages/footer/tuyendung')
const GioiThieu = () => import('@/pages/footer/gioithieu')
const BaoHanh = () => import('@/pages/footer/baohanh')
const LienHe = () => import('@/pages/footer/lienhe')



const OrderDetail = () => import('@/pages/order/OrderDetail')

import Exams from '@/pages/exams/Exams'
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/exams',
    name: 'Exams',
    component: Exams
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
  {
    path: '/login',
    name: "login",
    component: () => import('@/pages/login/Login'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/pages/register/Register')
  },
  {
    path: '/',
    component: Layout,
    redirect: "/home",
    children: [{
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/addcart/:id',
      name: 'AddCart',
      component: AddCart
    },
    {
      path: '/product',
      name: 'Product',
      component: Product,
      redirect: '/product/iphone',
      children: [{
        path: 'iphone',
        name: 'Iphone',
        component: Iphone
      },
      {
        path: 'samsung',
        name: 'SamSung',
        component: SamSung
      },
      {
        path: 'oppo',
        name: 'Oppo',
        component: Oppo
      },
      {
        path: 'xiaomi',
        name: 'Xiaomi',
        component: Xiaomi
      },
      {
        path: 'earphone',
        name: 'EarPhone',
        component: EarPhone
      },
      {
        path: 'charger',
        name: 'Charger',
        component: Charger
      },
      {
        path: 'loudspeaker',
        name: 'LoudSpeaker',
        component: LoudSpeaker
      },
      {
        path: 'chargercable',
        name: 'ChargerCable',
        component: ChargerCable
      },
      {
        path: 'stickgimbal',
        name: 'StickGimbal',
        component: StickGimbal
      },
      {
        path: 'stand',
        name: 'Stand',
        component: Stand
      },
      {
        path: 'hook',
        name: 'Hook',
        component: Hook
      },
      {
        path: 'waterproof',
        name: 'Waterproof',
        component: Waterproof
      }
      ]
    },
    {
      path: '/personalinformation',
      name: 'PersonalInformation',
      component: PersonalInformation,
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart,
      meta: { requiresAuth: true }
    },
    {
      path: '/thanhtoan',
      name: 'Thanhtoan',
      component: Thanhtoan,
      meta: { requiresAuth: true }
    },
    {
      path: '/tintuc',
      name: 'TinTuc',
      component: TinTuc,
    },
    {
      path: '/tuyendung',
      name: 'TuyenDung',
      component: TuyenDung,
    },
    {
      path: '/gioithieu',
      name: 'GioiThieu',
      component: GioiThieu,
    },
    {
      path: '/baohanh',
      name: 'BaoHanh',
      component: BaoHanh,
    },
    {
      path: '/lienhe',
      name: 'LienHe',
      component: LienHe,
    },
    {
      path: '/order',
      name: 'Order',
      redirect: '/order/processing',
      component: Order,
      meta: { requiresAuth: true },
      children: [{
        path: 'orderDetail/:id',
        name: 'OrderDetail',
        component: OrderDetail
      },
      {
        path: 'processing',
        name: 'Processing',
        component: Processing
      },
      {
        path: 'processed',
        name: 'Processed',
        component: Processed
      },
      {
        path: 'ordering',
        name: 'Ordering',
        component: Ordering
      },
      {
        path: 'success',
        name: 'Success',
        component: Success
      }
    ]
    },
    {
      path: '/ProductDetail/:id',
      name: 'ProductDetail',
      component: ProductDetail
    }
    
    ]
  }
  ]
  const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  })


  // router.beforeEach((to, from, next)=>{
    // if ( to.name !== 'Login' && to.meta.requireAuth==true
    //  ){
    //   api.CheckSession((dat)=>{
    //       // current emp infor
    //       store.commit("setEmpInfor", dat.data.data);
    //       next();
    //     },(er)=>{
    //       // session timeout or not login
    //       if(er?.response?.status == 401)
    //       {
    //         console.error(er.response.data);
    //         next({
    //           name: 'Login',
    //           params:{}
    //         })
    //       }
    //     })

    // } 
    // if ((store.state.empInfor.email ==null ||store.state.empInfor.email ==""|| store.state.empInfor.email == undefined ) && localStorage.getItem('us') == undefined) {
      // next({name: 'register'},{name: "login"})
    //   next({name:'Home'})
    // }
    // else {
    //   next();
    // }
  // })
  router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
      // Nếu route yêu cầu đăng nhập nhưng người dùng chưa đăng nhập,
      // chuyển hướng đến trang đăng nhập
      next('/login');
    } else {
      // Nếu người dùng đã đăng nhập hoặc route không yêu cầu đăng nhập,
      // cho phép truy cập
      next();
    }
  });
  export default router