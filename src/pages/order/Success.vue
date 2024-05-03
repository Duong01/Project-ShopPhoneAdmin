<template>
  <div class="ordering" v-loading="this.$store.state.isLoading">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col">Mã đơn hàng</th>
          <th scope="col">Ngày đặt</th>
          <th scope="col">Ngày giao</th>
          <th scope="col">Tình trạng</th>
          <th scope="col">Đánh giá</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in order" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.id }}</td>
          <td>{{ calculateDelivery(item.createDate) }}</td>
          <td>{{ calculateDeliveryDate(item.createDate) }}</td>
          <td>{{ item.status }}</td>
          <td>
            <el-badge :value="1" class="item">
              <el-button round @click="getOrderDetail(item)"
                ><el-icon><Star /></el-icon
              ></el-button>
            </el-badge>
          </td>
        </tr>
      </tbody>
    </table>
    <el-dialog
      v-model="dialogTableVisible"
      title="Đánh giá sản phẩm"
      border
      align="center"
      width="1200"
    >
      <div class="product-review-page">
        <div class="product-info" v-for="item in order_details" :key="item.id">
          <!-- Thông tin sản phẩm -->
          <img
            :src="`http://localhost:8085/Files/${item.productImage}`"
            alt="Product Image"
            class="product-image"
          />
          <div class="product-details">
            <h3>{{ item.productName }}</h3>
            <p>Giá: {{ item.productPrice }}</p>
            <!-- Hiển thị đánh giá sao trung bình của sản phẩm -->
            <div class="average-rating">
              <span class="demonstration">Lượt đánh giá</span>
              <el-rate
                v-model="value"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value} star"
              />
            </div>
          </div>
        </div>

        <div class="review-form">
          <h2>Đánh giá sản phẩm</h2>
          <!-- Form đánh giá sản phẩm -->
          <textarea
            v-model="reviewText"
            placeholder="Viết đánh giá của bạn..."
          ></textarea>
          <div class="rating">
            <!-- Chọn số sao -->
            <span class="demonstration">Đánh giá &nbsp;&nbsp;</span>
            <el-rate v-model="rate" />
          </div>
          <el-button type="primary" round @click="submitReview"
            >Gửi đánh giá</el-button
          >
        </div>
      </div>
    </el-dialog>
    <div style="text-align: center; font-weight: bold">{{ text }}</div>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import axios from "axios";
export default {
  name: "SuccessPage",
  data() {
    return {
      order: [],
      order_details: [],
      text: "",
      name: "Success",
      value: 4.7,
      rate: "",
      reviewText: "",
      dialogTableVisible: false,
    };
  },
  created() {
    this.getAll();
  },
  computed: {
    getEmpInfor() {
      let emp = JSON.parse(localStorage["us"]);
      if (emp != undefined) return emp.id;
      return "";
    },
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
          `http://localhost:8181/api/order/listorderbystatus?userId=${this.getEmpInfor}`
        )
        .then((res) => {
          if (res.status == 200) {
            this.order = res.data.filter((order) => order.status == "Success");
            this.$store.state.isLoading = false;
          }
          if (this.order == '') {
            this.text = "Không có đơn hàng nào cần sử lý";
          }
        });
      this.$store.state.isLoading = true;
    },
    getOrderDetail(item) {
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
    },
    submitReview() {
      ElMessage({
        type: "success",
        message: "Success",
      });

      this.dialogTableVisible = false;
    },
  },
};
</script>

<style scoped>
.product-review-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-info {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.product-image {
  width: 200px;
  height: 200px;
  object-fit: cover;
  margin-right: 20px;
}

.product-details {
  max-width: 400px;
}

.average-rating {
  display: flex;
  align-items: center;
}

.average-rating .stars {
  color: gold;
  margin-right: 5px;
}

.review-form {
  margin-bottom: 20px;
  max-width: 400px;
}

.review-form textarea {
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.rating {
  margin-bottom: 10px;
}

.rating .star {
  color: #ccc;
  cursor: pointer;
}

.rating .star:hover,
.rating .star.active {
  color: gold;
}

.user-reviews {
  max-width: 600px;
}

.review {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
}

.review p {
  margin-bottom: 5px;
}

.review .rating .fa-star {
  color: gold;
}
</style>
