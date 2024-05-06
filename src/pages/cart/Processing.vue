<template>
  <div class="processing" v-loading="this.$store.state.isLoading">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col">Mã đơn hàng</th>
          <th scope="col">Ngày đặt</th>
          <th scope="col">Ngày giao</th>
          <th scope="col">Giá sản phẩm</th>
          <th scope="col">Tình trạng</th>
          <th scope="col">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in order" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.id }}</td>
          <td>{{ calculateDelivery(item.createDate) }}</td>
          <td>
            Dự kiến giao hàng {{ calculateDeliveryDate(item.createDate) }}
          </td>
          <td>{{ Number(item.price).toLocaleString() }}đ</td>
          <td>{{ item.status }}</td>
          <td>
            <button class="btn btn-danger" plain @click="DeleteOrder(item)">
              Hủy đơn hàng
            </button>
            <button class="btn btn-success" @click="submitOrder(item)">
              Xác nhận
            </button>
            <button class="btn btn-primary" @click="showDetail(item)">
              Detail
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <p style="font-weight: bold; text-align: center">{{ text }}</p>
    <button class="btn btn-success">Xác nhận tất cả</button>
    
  </div>
  <!-- Dialog -->
  <el-dialog
    v-model="dialogTableVisible"
    title="Chi tiết đơn hàng"
    border
    align="center"
    width="1200"
  >
    <el-steps
      style="max-width: 600px"
      :space="200"
      :active="active"
      align-center
      finish-status="success"
    >
      <el-step :active="1" title="Đang xác nhận" />
      <el-step title="Đã xử lý" />
      <el-step title="Đang vận chuyển" />
      
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
</template>

<script>
import axios from "axios";
import { ElMessage, ElMessageBox } from "element-plus";

export default {
  name: "ProcessingPage",
  data() {
    return {
      order: [],
      order_details: [],
      order_details1: [],
      dialogTableVisible: false,
      text: "",
      name: "Processing",
      active: 0,
      qtyProduct: 0,
      productId: 0,
      qty: 0,
      id: 0,
    };
  },
  created() {
    this.getAll();
  },
  methods: {
    // Date Time
    calculateDeliveryDate(createDate) {
      const deliveryDate = new Date(createDate); // Tạo một đối tượng ngày từ ngày đặt hàng
      deliveryDate.setDate(deliveryDate.getDate() + 3); // Thêm 3 ngày vào ngày đặt hàng
      return deliveryDate.toISOString().slice(0, 10); // Trả về ngày giao hàng dự kiến dưới dạng YYYY-MM-DD
    },
    calculateDelivery(createDate) {
      const deliveryDate = new Date(createDate); // Tạo một đối tượng ngày từ ngày đặt hàng
      deliveryDate.setDate(deliveryDate.getDate()); // Thêm 3 ngày vào ngày đặt hàng
      return deliveryDate.toISOString().slice(0, 10); // Trả về ngày giao hàng dự kiến dưới dạng YYYY-MM-DD
    },
    getAll() {
      axios
        .get(
          `http://localhost:8181/api/order/listorderbyid?status=${this.name}`
        )
        .then((res) => {
          if (res.status == 200) {
            this.order = res.data;
            this.$store.state.isLoading = false;
          }
          if (res.data.length == 0) {
            this.text = "Không có đơn hàng nào cần sử lý";
          }
          // this.$store.state.isLoading = true;
        });
    },
    DeleteOrder(item) {
      ElMessageBox.confirm(
        "Are you sure you want to cancel your order?",
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )

        .then(() => {
          axios
            .delete(
              `http://localhost:8181/api/orderdetail/deleteorderdetail?orderId=${item.id}`
            )
            .then(() => {})
            .catch(() => {});
          axios
            .delete(`http://localhost:8181/api/order/deleteorder?id=${item.id}`)
            .then((res) => {
              if (res.data == true && res.status == 200) {
                ElMessage({
                  type: "success",
                  message: "Delete completed",
                });
                this.getAll();
              }
            })
            .catch(() => {
              ElMessage({
                type: "error",
                message: "Delete error",
              });
            });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Delete canceled",
          });
        });
    },
    submitOrder(item) {
      axios.put('http://localhost:8181/api/order/updateorder',{id: item.id, status: 'Prosessed'})
      .then(res => {
        if(res.data == 'ok' && res.status == 200){
            alert('Đơn hàng đang được giao hàng')
            location.reload()
            this.getAll()
        }
      });

      axios
        .get(
          `http://localhost:8181/api/orderdetail/listorderdetail?orderId=${item.id}`
        )
        .then((res) => {
          this.order_details1 = res.data[0]
          this.id = this.order_details1.productId
          this.qty = this.order_details1.qty
          // Find Product By Id
          axios.get(`http://localhost:8181/api/products/searchproductbyId?id=${this.id}`)
          .then(productRp =>{
            this.qtyProduct = productRp.data.map(p => p.qty)
          
          // Update Qty
              axios
                .put(`http://localhost:8181/api/products/updateqtyproduct`, {
                  id: this.id,
                  qty: this.qtyProduct - this.qty,
                })
                .then(() => {
                })
                .catch(() => {
                  console.log("loi");
                });
            })
        });
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
  },
};
</script>

<style></style>
