<template>
  <div class="cart" v-loading="this.$store.state.isLoading" v-if="show">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col">{{ $t("Tên sản phẩm") }}</th>
          <th scope="col">{{ $t("Số lượng") }}</th>
          <th scope="col">{{ $t("Màu sắc") }}</th>
          <th scope="col">{{ $t("Dung lượng") }}</th>
          <th scope="col">{{ $t("Giá sản phẩm") }}</th>
          <th scope="col">{{ $t("Hình ảnh") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in cart" :key="item.id" ref="list">
          <td>{{ index + 1 }}</td>
          <td>{{ item.productName }}</td>
          <td>
            <div class="count">{{ item.qty }}</div>
          </td>
          <td>
            <div class="count">{{ item.color }}</div>
          </td>
          <td>
            <div class="count">{{ item.capacity }}</div>
          </td>
          <td>{{ Number(item.productPrice).toLocaleString() }}đ</td>
          <td>
            <img
              width="100"
              height="100"
              :src="`http://localhost:8085/Files/${item.productImage}`"
              alt="No image"
            />
          </td>
          <td>
            <el-button type="danger" plain @click="DeleteCate(item)"
              ><el-icon><Delete /></el-icon> Delete</el-button
            >
          </td>
        </tr>
      </tbody>
    </table>
    <div style="text-align: center; font-weight: bold">{{ text }}</div>
    <div>
      <b style="float: right; margin: 0 40px"
        >{{ $t("Tổng tiền") }}: {{ this.cartTotal.toLocaleString() }}đ</b
      >
    </div>
    <br />
    <hr />
    <button
      type="button"
      class="btn btn-success"
      style="text-align: center"
      @click="buy"
    >
      {{ $t("Đặt hàng") }}
    </button>
  </div>
  <div v-else>
    <p>Bạn chưa đăng nhập</p>
  </div>
</template>

<script>
import axios from "axios";
import { markRaw } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'
export default {
  name: "CartPage",
  data() {
    return {
      cart: [],
      picked: "", 
      dialogFormVisible: false,
      count: 0,
      timenow: "",
      text: "",
      dem: 0,
    };
  },
  created() {
    this.getAll(), 
    this.getNow();
    // this.getOrder()
  },
  computed: {
    getEmpInfor() {
      let emp = JSON.parse(localStorage["us"]);
      if (emp != undefined) return emp.id;
      return "";
    },
    cartTotal() {
      return this.cart
        .map((item) => item.productPrice * item.qty)
        .reduce((total, amount) => total + amount, 0);
    },
    show() {
      return localStorage.getItem("us") != undefined
    
    },
  },
  methods: {
    getAll() {
      axios.get(`http://localhost:8181/api/cart/showcartbyuserid?userId=${this.getEmpInfor}`
        )
        .then((res) => {
          if (res.data != null) {
            this.cart = res.data;
            this.$store.state.isLoading = false;
          }
          if (res.data.length == 0) {
            this.text = "Giỏ hàng trống";
          }
          this.count = res.data.length;
        });
      this.$store.state.isLoading = true;
    },
    // getOrder() {
    //   axios.get(`http://localhost:8181/api/order/listorderbyid?userId=${this.getEmpInfor}`)
    //     .then((res) => {
    //       if (res.status == 200) {
    //         this.order = res.data;
    //       }
    //       this.dem = res.data.length;
    //     });
    // },
    DeleteCate(item) {
      ElMessageBox.confirm(
    'proxy will permanently delete the file. Continue?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
      icon: markRaw(Delete)
    }
  )
    .then(() => {
      axios.delete(`http://localhost:8181/api/cart/deletecart?id=${item.id}`)
          .then((res) => {
            if (res.data == true && res.status == 200) {
              this.getAll();
            }
          });
      ElMessage({
        type: 'success',
        message: 'Delete completed',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })

    },
    buy() {
      if (this.count > 0) {
        this.$router.push('/thanhtoan')
        
      } else {
        alert("Không có sản phẩm nào");
      }
    },
    getNow() {
      var today = new Date();
      var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      // var time =
      //   today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      // var dateTime = date+'T'+ time;
      this.timenow = date;
    },
  },
};
</script>

<style scoped>
.nav {
  display: block;
  margin-top: 10px;
}
.nav_left {
  float: left;
  margin: 0 10px;
}
.nav_right {
  float: left;
  margin: 0 10px;
}
img {
  object-fit: cover;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
