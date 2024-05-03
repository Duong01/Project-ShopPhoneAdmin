<template>
  <main role="main">
    <!-- Block content - Đục lỗ trên giao diện bố cục chung, đặt tên là `content` -->
    <div class="container mt-4">
      <div class="text-center">
        <i class="fa fa-credit-card fa-4x" aria-hidden="true"></i>
        <h2>Thanh toán</h2>
        <p class="lead">
          Vui lòng kiểm tra thông tin Khách hàng, thông tin Giỏ hàng trước khi
          Đặt hàng.
        </p>
      </div>

      <div class="row">
        <div class="col-md-4 order-md-2 mb-4">
          <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-muted">Giỏ hàng</span>
            <span
              style="
                color: #fff;
                width: 30px;
                height: 30px;
                border-radius: 30px;
                background-color: #cccccc;
              "
              class="badge badge-secondary badge-pill"
              >{{ count }}</span
            >
          </h4>
          <ul class="list-group mb-3">
            <li
              class="list-group-item d-flex justify-content-between lh-condensed"
              v-for="item in cart"
              :key="item.id"
            >
              <div class="text-left">
                <h6 class="my-0">{{ item.productName }}</h6>
                <small class="text-muted"
                  >{{ Number(item.productPrice).toLocaleString() }} x
                  {{ item.qty }}</small
                >
              </div>
              <div>
                <span class="text-right"
                  >{{
                    Number(item.productPrice * item.qty).toLocaleString()
                  }}đ</span
                >
              </div>
              <hr />
            </li>
            <li class="list-group-item d-flex justify-content-between">
              <span>{{ $t("Vận chuyển") }}</span>
              <strong>
                <el-tag size="small">Miễn phí vận chuyển</el-tag> <br>
                 <p style="font-size: 12px; border: 1px solid #ccc; font-weight: normal;">Tới: {{ user.address }}</p>
              </strong>
            </li>
            <li class="list-group-item d-flex justify-content-between">
              <span>{{ $t("Tổng tiền") }}</span>
              <strong>{{ cartTotal.toLocaleString() }}đ</strong>
            </li>
          </ul>
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              placeholder="Mã khuyến mãi"
            />
            <div class="input-group-append">
              <button type="submit" class="btn btn-secondary">Xác nhận</button>
            </div>
          </div>
        </div>

        <div style="text-align: left" class="col-md-8 order-md-1">
          <h4 class="mb-3">Thông tin khách hàng</h4>

          <div class="row">
            <div class="col-md-12">
              <label for="kh_ten">Họ tên</label>
              <input
                type="text"
                class="form-control"
                name="kh_ten"
                id="kh_ten"
                :value="user.fullname"
                readonly=""
              />
            </div>
            <div class="col-md-12">
              <label for="kh_diachi">Địa chỉ</label>
              <input
                type="text"
                class="form-control"
                name="kh_diachi"
                id="kh_diachi"
                :value="user.address"
                readonly=""
              />
            </div>
            <div class="col-md-12">
              <label for="kh_dienthoai">Điện thoại</label>
              <input
                type="text"
                class="form-control"
                name="kh_dienthoai"
                id="kh_dienthoai"
                :value="user.phone"
                readonly=""
              />
            </div>
            <div class="col-md-12">
              <label for="kh_email">Email</label>
              <input
                type="text"
                class="form-control"
                name="kh_email"
                id="kh_email"
                :value="user.email"
                readonly=""
              />
            </div>
            <div class="col-md-12">
              <label for="kh_ngaysinh">Ngày sinh</label>
              <input
                type="text"
                class="form-control"
                name="kh_ngaysinh"
                id="kh_ngaysinh"
                :value="user.dob"
                readonly=""
              />
            </div>
          </div>

          <h4 class="mb-3">Hình thức thanh toán</h4>

          <div class="d-block my-3">
            <div class="custom-control custom-radio">
              <input
                id="httt-1"
                name="httt_ma"
                type="radio"
                v-model="radio"
                class="custom-control-input"
                required=""
                value="Thanh toán khi nhận hàng"
              />
              <label class="custom-control-label" for="httt-1"
                >Thanh toán khi nhận hàng</label
              >
            </div>
            <div class="custom-control custom-radio">
              <input
                id="httt-2"
                name="httt_ma"
                type="radio"
                v-model="radio"
                class="custom-control-input"
                required=""
                value="Chuyển khoản"
              />
              <label class="custom-control-label" for="httt-2"
                >Chuyển khoản</label
              >
            </div>
            <div class="custom-control custom-radio">
              <input
                id="httt-3"
                name="httt_ma"
                type="radio"
                v-model="radio"
                class="custom-control-input"
                required=""
                value="Ship COD"
              />
              <label class="custom-control-label" for="httt-3">Ship COD</label>
            </div>
          </div>
          <hr class="mb-4" />
          <button
            class="btn btn-primary btn-lg btn-block"
            type="button"
            @click="buy"
            name="btnDatHang"
          >
            Đặt hàng
          </button>
        </div>
      </div>
    </div>
    <!-- End block content -->
  </main>
</template>
<script>
import { ElMessage } from "element-plus";
import axios from "axios";
export default {
  name: "ThanhToan",
  data() {
    return {
      radio: "",
      user: [],
      cart: [],
      order: [],
      count: 0,
      idOrder: 0,
      name: "",
      address: "",
      phone: "",
      email: "",
      dob: "",
    };
  },
  created() {
    this.getAll(), this.getCart(), this.getNow();
  },
  methods: {
    getAll() {
      axios
        .get(
          `http://localhost:8181/api/user/finduserbyid?id=${this.getEmpInfor}`
        )
        .then((res) => {
          if (res.status == 200 && res.data != null) {
            this.user = res.data;
          }
        });
    },
    getCart() {
      axios
        .get(
          `http://localhost:8181/api/cart/showcartbyuserid?userid=${this.getEmpInfor}`
        )
        .then((res) => {
          
          if (res.status == 200 && res.data != null) {
            this.cart = res.data;
            // this.soldCount;
            this.count = res.data.length;
          }
        });
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
    buy() {
      if (this.radio == "") {
        ElMessage({
          message: "Check status salary.",
          grouping: true,
          type: "error",
        });
      } else {
        for (let i = 0; i < this.count; i++) {
          axios
            .post(`http://localhost:8181/api/order/inserorder`, {
              produuctName: this.cart[i].productName,
              userId: this.cart[i].userId,
              createDate: this.timenow,
              receivedDate: this.timenow,
              qty: this.cart[i].qty,
              price: this.cart[i].productPrice * this.cart[i].qty,
              status: "Processing",
            })
            .then((res) => {
              console.log(res);
              this.idOrder = res.data.id;
              // axios.put(`http://localhost:8181/api/products/updateqtyproduct`,{
              //   id: this.cart[i].productId,
              //   soldCount:  this.cart[i].qty
              // })
              axios
                .post(
                  `http://localhost:8181/api/orderdetail/insertorderdetail`,
                  {
                    orderId: this.idOrder,
                    productId: this.cart[i].productId,
                    qty: this.cart[i].qty,
                    productPrice: this.cart[i].productPrice,
                    productName: this.cart[i].productName,
                    productImage: this.cart[i].productImage,
                    userName: this.user.fullname,
                    userAddress: this.user.address,
                    userPhone: this.user.phone,
                    userEmail: this.user.email,
                  }
                )
                .then((res) => {
                  if (res.data == "ok" && res.status == 200) {
                    ElMessage({
                      type: "success",
                      message: "Order success",
                    });
                    this.$router.push("/order");
                  }
                })
                .catch(() => {
                  ElMessage({
                    type: "error",
                    message: "Order error",
                  });
                });
            });
        }
        axios.delete(
          `http://localhost:8181/api/cart/deleteallcart?userId=${this.getEmpInfor}`
        );
      }
    },
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
  },
};
</script>
