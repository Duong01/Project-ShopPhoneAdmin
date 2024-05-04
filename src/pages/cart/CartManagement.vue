<template>
  <div class="order">
  <div class="content">
      <div class="navbox">
        <el-menu
          mode="horizontal"
          style="display: flex;"
          :default-active="$route.path"
          :ellipsis="false"
          router>
          <el-menu-item index="/cartmanagement/processing">{{$t('Đang xử lý')}}  </el-menu-item>
          <el-menu-item index="/cartmanagement/processed">{{$t('Đã xử lý')}}</el-menu-item>
          <el-menu-item index="/cartmanagement/ordering">{{$t('Đang vận chuyển')}}</el-menu-item>
          <el-menu-item index="/cartmanagement/success">{{$t('Đã hoàn thành')}}</el-menu-item>
        </el-menu>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="details_order">
      <router-view/>
    </div>
</div>
</template>

<script>
export default {
  name: "CartPage",
  data() {
    return {
    }
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
