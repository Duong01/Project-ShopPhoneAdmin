<template>
  <div class="cart">
    <div class="Processing">
      <router-link :to="{name: 'Processing', params: {}}">Processing</router-link>
      <router-link :to="{name: 'Processed', params: {}}">Processed</router-link>
      <router-link :to="{name: 'Ordering', params: {}}">Ordering</router-link>
      <router-link :to="{name: 'Success', params: {}}">Success</router-link>
    </div>
    <div class="details_order">
      <router-view />
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
.nav{
  display: block;
  margin-top: 10px;
}
.nav_left{
  float: left;
  margin: 0 10px;
}
.nav_right{
  float: left;
  margin: 0 10px;
}
th{
  text-align: center;
}
</style>
