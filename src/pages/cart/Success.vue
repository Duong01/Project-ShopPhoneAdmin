<template>
  <div class="processing">
    <div class="nav_right">
        <el-input
          v-model="searchQuery"
          style="width: 600px; border-radius: 10px"
          clearable
          placeholder="Search"
          class="input-with-select"
        >
          <template #prepend>
            <el-button
              type="primary"
              style="background-color: #409eff; color: #fff"
              @click="search"
            >
              <el-icon style="vertical-align: middle">
                <Search />
              </el-icon>
              <span style="vertical-align: middle">
                {{ $t("Tìm kiếm") }}
              </span>
            </el-button>
          </template>
        </el-input>
      </div>
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
            {{ calculateDeliveryDate(item.createDate) }}
          </td>
          <td>{{ item.status }}</td>
          <td>
            <button class="btn btn-primary" @click="showDetail(item)">
              Detail
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Detail -->
    <el-dialog
    v-model="dialogTableVisible"
    title="Chi tiết đơn hàng"
    border
    align="center"
    width="1200"
  >
    <el-steps
      style="max-width: 700px"
      :space="200"
      :active="active"
      align-center
      finish-status="success"
    >
      <el-step :active="1" title="Đang xác nhận" />
      <el-step title="Đã xử lý" />
      <el-step title="Đang vận chuyển" />
      <el-step title="Vận chuyển thành công" />
    </el-steps>
    <br />
    <el-table :data="order_details">
      <el-table-column prop="orderId" label="Mã đơn hàng" width="120" />
      <el-table-column prop="productId" label="Mã sản phẩm" width="120" />
      <el-table-column prop="productName" label="Tên sản phẩm" width="120" />
      <el-table-column prop="productPrice" label="Giá sản phẩm" width="120">
        <template v-slot="scope">
          <p>{{ Number(scope.row.productPrice).toLocaleString() }}đ</p>
        </template>
      </el-table-column>
      <el-table-column prop="qty" label="Số lượng" width="120" />
      <el-table-column prop="productImage" label="Hình ảnh" width="120">
        <template v-slot="scope">
          <img
            :src="`http://localhost:8085/Files/${scope.row.productImage}`"
            alt="Hình ảnh"
            style="max-width: 100px; max-height: 100px"
          />
        </template>
      </el-table-column>
      <el-table-column prop="userName" label="Họ tên" width="120" />
      <el-table-column prop="userAddress" label="Địa chỉ" width="150" />
      <el-table-column prop="userPhone" label="SDT" width="120" />
    </el-table>
  </el-dialog>
    <p style="font-weight: bold; text-align: center;">{{text}}</p>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: "SuccessPage",
  data() {
    return {
      order: [],
      order_details: [],
      text: '',
      name: 'Success',
      searchQuery: '',
      dialogTableVisible: false,

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
            this.text = 'Không có sản phẩm nào được giao thành công'
            }
        })
    },
    search(){
      axios.get(`http://localhost:8181/api/order/orderid?id=${this.searchQuery}`)
      .then(res =>{
        if(res.status == 200){
          this.order = res.data;
        }
      })
      .catch(() =>{})
    },
    showDetail(item) {
      this.dialogTableVisible = true;
      axios
        .get(
          `http://localhost:8181/api/orderdetail/listorderdetail?orderId=${item.id}`
        )
        .then((res) => {
          if (res.status == 200) {
            this.order_details = res.data;
          }
        })
        .catch((err) => {
          alert("Co loi", err);
        });
      if (item.status == "Processing") {
        this.active = 1;
      }
      if (item.status == "Processed") {
        this.active = 2;
      }
      if (item.status == "Ordering") {
        this.active = 3;
      }
      if (item.status == "Success") {
        this.active = 4;
      }
    },
  }
}
</script>

<style scoped>
.el-input-group {
  display: inline-flex;
  width: 100%;
  flex-direction: row-reverse;
  margin-left: 30px;
}
.nav_right, .nav_left{
  margin: 10px;
}
</style>
