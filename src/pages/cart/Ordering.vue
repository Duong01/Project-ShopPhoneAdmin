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
          <td>{{ formatDate(item.createDate) }}</td>
          <td>
            Dự kiến giao hàng {{ calculateDeliveryDate(item.createDate) }}
          </td>
          <td>{{ item.status }}</td>
          <td>
            <button class="btn btn-success" @click="submitOrder(item)">Xác nhận</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p style="font-weight: bold; text-align: center;">{{text}}</p>
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
    // Date Time
    formatDate(dateString) {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
    // Date Time
    calculateDeliveryDate(dateString) {
      const date = new Date(dateString);
      date.setDate(date.getDate() + 3); // Cộng thêm 3 ngày
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
    calculateDelivery(createDate) {
      const deliveryDate = new Date(createDate); // Tạo một đối tượng ngày từ ngày đặt hàng
      deliveryDate.setDate(deliveryDate.getDate()); // Thêm 3 ngày vào ngày đặt hàng
      return deliveryDate.toISOString().slice(0, 10); // Trả về ngày giao hàng dự kiến dưới dạng YYYY-MM-DD
    },
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