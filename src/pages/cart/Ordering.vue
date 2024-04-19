<template>
  <div class="processing">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col">Mã đơn hàng</th>
          <th scope="col">Ngày đặt</th>
          <th scope="col">Ngày giao</th>
          <th scope="col">Tình trạng</th>
          <th scope="col">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item, index in order" :key="index">
          <td>{{ index +1 }}</td>
          <td>{{ item.id }}</td>
          <td>{{ item.createDate }}</td>
          <td>Dự kiến 3 ngày sau khi đơn hàng được xử lý</td>
          <td>{{ item.status }}</td>
          <td>
            <button class="btn btn-success" @click="submitOrder(item)">Xác nhận</button>
          </td>
        </tr>
      </tbody>
    <p style="font-weight: bold;">{{text}}</p>
    </table>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: "OrderingPage",
  data() {
    return {
      order: [],
      text: '',
      name: 'Ordering'
    }
  },
  created() {
    this.getAll()
  },
  methods: {
    getAll() {
        axios.get(`http://localhost:8181/api/order/listorderbyid?status=${this.name}`)
        .then((res) => {
          if(res.status == 200){
            this.order = res.data
          }
          if(res.data.length == 0){
            this.text = 'Không có đơn hàng đang giao'
            }
        })
    },
    submitOrder(item){
      axios.put('http://localhost:8181/api/order/updateorder',{id: item.id, status: 'Success'})
      .then(res => {
        if(res.data == 'ok' && res.status == 200){
            alert('Giao hàng thành công')
          location.reload()
          this.getAll()
        }
      })
    }
  }
}
</script>

<style>

</style>