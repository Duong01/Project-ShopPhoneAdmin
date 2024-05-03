<template>
<div class="order" v-if="show">
  <div class="content">
      <div class="navbox">
        <el-menu
          mode="horizontal"
          style="display: flex;"
          :default-active="$route.path"
          :ellipsis="false"
          router>
          <el-menu-item index="/order/processing">{{$t('Chờ xác nhận')}}  </el-menu-item>
          <el-menu-item index="/order/processed">{{$t('Chờ lấy hàng')}}</el-menu-item>
          <el-menu-item index="/order/ordering">{{$t('Chờ vận chuyển')}}</el-menu-item>
          <el-menu-item index="/order/success">{{$t('Đã hoàn thành')}}</el-menu-item>
        </el-menu>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="content">
      <router-view/>
    </div>
</div>
<div v-else>
  <p>Bạn chưa đăng nhập</p>
</div>
</template>

<script>
// import axios from 'axios'
export default {
  name: 'OrderPage',
  data(){
    return{
     
    }
  },
  computed: {
    show() {
      return localStorage.getItem("us") != undefined
    },
  }
  
}
</script>

<style scoped>
ul.el-menu.el-menu--horizontal {
  --el-menu-level: 0;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
}
  .navbox {
    /* padding-top: 40px; */
    display: flex;
    justify-content: center;
  }
    .subnavigator{
      border-bottom: 0;
    }
      .el-menu-item{
        padding: 0 10px;
        color: #4d555d;
        font-size: 16px;
        border-bottom: 0;
        height: 25px;
        line-height: 25px;
      
    }
    .el-divider{
      margin-top: 20px;
    }
  
</style>
