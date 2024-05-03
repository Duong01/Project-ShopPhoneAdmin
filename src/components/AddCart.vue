<template>
  <el-dialog
    v-model="dialogVisible"
    title="Add to cart"
    width="1000px"
    @close="closeDialogAndNavigateBack"
    :close-on-click-modal="false"
  >
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <el-image
            style="
              width: 300px;
              height: 300px;
              border: 1px solid #ccc;
              border-radius: 10px;
            "
            :src="`http://localhost:8085/Files/${productForm.image}`"
            :zoom-rate="1.2"
            :max-scale="7"
            :min-scale="4"
            :initial-index="4"
            fit="cover"
          />
          <p class="text-center">
            Kho: {{ productForm.qty - productForm.soldCount }}
          </p>
        </div>
        <div class="col-md-6 text-left">
          <div class="product_name">
            <h5>{{ productForm.name }}</h5>
          </div>
          <div class="rate">
            <el-rate
              v-model="ratevalue"
              disabled
              show-score
              text-color="#ff9900"
              score-template=" {value}"
            />
            Đã bán: {{ productForm.soldCount }}
          </div>
          <div class="price">
            <p style="text-decoration: line-through">
              {{ Number(productForm.originalPrice).toLocaleString() }}
            </p>
            <p style="color: red; font-size: 20px">
              {{ Number(totalPrice).toLocaleString() }}đ
            </p>
          </div>
          <div class="order">
            Vận chuyển:
            <el-tag size="small">Miễn phí vận chuyển</el-tag>
          </div>
          <div class="sesson">
            Lựa chọn phiên bản:
            <el-form>
              <el-radio-group v-model="radioBG" size="large">
                <el-radio-button label="16GB" value="16GB" />
                <el-radio-button label="32GB" value="32GB" />
                <el-radio-button label="64GB" value="64GB" />
                <el-radio-button label="128GB" value="128GB" />
              </el-radio-group>
            </el-form>
          </div>
          <br />
          Lựa chọn màu:
          <el-form>
            <el-radio-group v-model="radio" size="large">
              <el-radio-button label="Đen" value="Đen" />
              <el-radio-button label="Trắng" value="Trắng" />
              <el-radio-button label="Đỏ" value="Đỏ" />
            </el-radio-group>
            <br />
            <br />
            <el-input-number v-model="num" :min="1" />
          </el-form>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button :plain="true" type="primary" @click="addcart(productForm)">
          Add cart
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { ElMessage } from "element-plus";
import axios from "axios";
import { ref } from "vue";
export default {
  name: "AddCartPage",
  data() {
    return {
      dialogVisible: true,
      productForm: [],
      radio: ref("Đen"),
      radioBG: ref("16GB"),
      num: 1,
      ratevalue: 0,
      price: 0,
      total: 0
    };
  },
  created() {
    this.showProduct();
  },
  methods: {
    showProduct() {
      axios
        .get(
          `http://localhost:8181/api/products/findproductbyid?id=${this.$route.params.id}`
        )
        .then((res) => {
          if (res.status == 200) {
            this.productForm = res.data;
            this.ratevalue = res.data.status;
            this.price = res.data.promotionPrice;
            
          }
        });
    },
    addcart(item) {
      if (this.show) {
        if (item.qty - item.soldCount - this.num < 0) {
          ElMessage({
            message: "Số lượng hàng trong kho không đủ.",
            grouping: true,
            type: "error",
          });
        } else {
          axios
            .post(`http://localhost:8181/api/cart/insertcart`, {
              userId: this.getEmpInfor,
              productId: item.id,
              qty: this.num,
              productName: item.name,
              productPrice: this.totalPrice,
              productImage: item.image,
              color: this.radio,
              capacity: this.radioBG
            })
            .then((res) => {
              if (res.data == "ok" && res.status == 200) {
                ElMessage({
                  message: "Add cart success.",
                  grouping: true,
                  type: "success",
                });
              }
            })
            .catch(() => {
              ElMessage({
                type: "error",
                message: "Add cart error",
              });
            });
        }
        this.dialogVisible = false;
        this.wrapperVisible = false;
      } else {
        ElMessage.error("You are not loggin");
      }
    },
    closeDialogAndNavigateBack() {
      this.dialogVisible = false;
      this.$router.go(-1); // Chuyển hướng người dùng về trang trước đó
    },
  },
  computed: {
    getEmpInfor() {
      let emp = JSON.parse(localStorage["us"]);
      if (emp != undefined) return emp.id;
      return "";
    },
    show() {
      return localStorage.getItem("us") != undefined;
    },
    totalPrice() {
      // Giả sử bạn có một đối tượng giá cố định dựa trên màu và dung lượng
      const prices = {
        '16GB': {
          'Đen': this.price,
          'Trắng': this.price,
          'Đỏ': this.price
        },
        '32GB': {
          'Đen': this.price + 1500000,
          'Trắng': this.price + 1500000,
          'Đỏ': this.price + 1500000
        },
        '64GB': {
          'Đen': this.price + 2500000,
          'Trắng': this.price + 2500000,
          'Đỏ': this.price + 2500000
        },
        '128GB': {
          'Đen': this.price + 3500000,
          'Trắng': this.price + 3500000,
          'Đỏ': this.price + 3500000
        }
      };
      const price = prices[this.radioBG][this.radio];
      return price * this.num;
    }
  },
};
</script>

<style scoped>
.container {
  display: inline-block;
}
.price {
  display: flex;
  justify-content: center;
  text-align: center;
  flex-wrap: nowrap;
  align-items: center;
}
.rate {
  display: flex;
  justify-content: center;
  text-align: center;
  flex-wrap: nowrap;
  align-items: center;
}
.el-rate {
  display: inline-flex;
  align-items: center;
  height: 32px;
  margin: 0 10px;
}
.order {
  margin-bottom: 15px;
}
</style>
