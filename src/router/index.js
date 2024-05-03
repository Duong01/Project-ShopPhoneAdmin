import { createRouter, createWebHistory } from 'vue-router'
// import api from "@/model/api.js"
import store from "@/store"

// component
const Home = () => import('@/components/Home')
// const Mail = () => import('@/components/Mail.vue')
import Layout from '@/components/Layout'

// pages
const ProductManagement = () => import('@/pages/product/ProductManagement')
const CategoriesManagement = () => import('@/pages/categories/CategoriesManagement')
const CartManagement = () => import('@/pages/cart/CartManagement')
const HoaDon = () => import('@/pages/cart/Hoadon')
const Processing = () => import('@/pages/cart/Processing')
const Processed = () => import('@/pages/cart/Processed')
const Ordering = () => import('@/pages/cart/Ordering')
const Success = () => import('@/pages/cart/Success')
const UsersManagement = () => import('@/pages/users/UsersManagement')

const routes = [
    {
      path: '/login',
      name: "login",
      component: () => import('@/pages/login/Login')
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
        path: '/hoadon/:id',
        name: 'HoaDon',
        component: HoaDon
      },
      {
        path: '/productmanagement',
        name: 'ProductManagement',
        component: ProductManagement,
      },
      {
        path: '/categoriesmanagement',
        name: 'CategoriesManagement',
        component: CategoriesManagement
      },
      {
        path: '/usersmanagement',
        name: 'UsersManagement',
        component: UsersManagement,
      },
      {
        path: '/cartmanagement',
        name: 'CartManagement',
        component: CartManagement,
        redirect: '/cartmanagement/processing',
        children:[{
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
        }]
      }
      ]
    }
  
]
  const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  })


  router.beforeEach((to, from, next) => {
    if ((store.state.empInfor.email ==null ||store.state.empInfor.email ==""|| store.state.empInfor.email == undefined ) && localStorage.getItem('us') == null && to.name!="login") {
      next({ name: "login" })
    }
    else
      next()
  })

  export default router