<template>
  <div>
    <div class="admin-left" >
      <p>DANH MỤC SẢN PHẨM</p>
      <div class="list">
        <router-link to="/product/admin">Admin</router-link>
      </div>
      <div class="list">
        <router-link to="/product/employee">Employee</router-link>
      </div>
      <div class="list">
        <router-link to="/product/security">Security</router-link>
      </div>
    </div>
    <div class="admin-right">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductPage'

}
</script>
<style scoped>
.admin-left{
  width: 20%;
  min-height: 100px;
  float: left;
  border-radius: 10px;
  border: 1px solid #3333;
}
.admin-right{
  width: 75%;
  min-height: 100px;
  float: left;
}
label{
  float: left;
}
</style>
