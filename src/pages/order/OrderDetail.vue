<template>
  <div class="order" v-loading="this.$store.state.isLoading">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Product Name</th>
          <th scope="col">Image</th>
          <th scope="col">Product Price</th>
          <th scope="col">Qty</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in order_details" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.productName }}</td>
          <td>
            <img width="100" height="100" :src="`http://localhost:8085/Files/${item.productImage}`" alt="No image">
          </td>
          <td>{{ Number(item.productPrice).toLocaleString() }}</td>
          <td>{{ item.qty }}</td>
        </tr>
      </tbody>
    </table>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'OrderDetail',
  data(){
    return{
      order_details: []
    }
  },
  created(){
    this.getAll()
  },
  methods: {
    getAll(){
        axios.get(`http://localhost:8181/api/orderdetail/listorderdetail?orderId=${this.$route.params.id}`)
        .then(res =>{
            if(res.status == 200){
              this.order_details = res.data
              this.$store.state.isLoading = false
            }
        })
        .catch( err =>{
          alert('Co loi',err)
        })
        this.$store.state.isLoading = true
    }
  }
}
</script>

<style>

</style>