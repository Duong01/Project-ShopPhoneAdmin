<template>
  <div class="detail" v-loading="this.$store.state.isLoading">
    <div class="top" style="height: 30px; line-height: 30px">
      <h1 style="float: left; margin: 0 20px; font-size: 24px">
        {{ products.name }}
      </h1>
      <el-rate
        style="float: left"
        v-model="value"
        disabled
        show-score
        text-color="#ff9900"
        score-template="{value} đánh giá"
      />
    </div>
    <ul>
      <li>
        <div class="detail_left">
          <div class="img">
            <img
              :src="`http://localhost:8085/Files/${products.image}`"
              alt="No image"
            />
          </div>
        </div>
        <div class="price" style="border: 2px solid orange">
          <div class="title" style="">
            <h3 style="color: red" >
              {{ Number(products.promotionPrice).toLocaleString() }}đ
            </h3>
            <el-badge value="hot" class="item">
              <el-button style="background-color: #f28902; color: #fff"
                >{{ $t("Trả góp") }} 0%</el-button
              >
            </el-badge>
          </div>
          <div class="area_price">{{}}</div>
          <div class="area_promo">
            <strong>{{ $t("Khuyến mãi") }}</strong>
            <div class="promo"></div>
            <div class="detailPromo" style="font-size: 14px">
              {{ $t("Khách hàng có thể mua trả góp sản phẩm với") }}
              <span style="font-weight: bold"> {{ $t("lãi suất") }} 0% </span>
              {{ $t("với thời hạn 6 tháng kể từ khi mua hàng") }}.
            </div>
          </div>
          <div class="policy">
            <div>
              <p>
                {{
                  $t(
                    "Trong hộp có: Sạc, Tai nghe, Sách hướng dẫn, Cây lấy sim, Ốp lưng"
                  )
                }}
              </p>
            </div>
            <div>
              <p>{{ $t("Bảo hành chính hãng 12 tháng") }}</p>
            </div>
            <div class="last">
              <p>
                {{
                  $t(
                    "1 đổi 1 trong 1 tháng nếu lỗi, đổi sản phẩm tại nhà trong 1 ngày"
                  )
                }}.
              </p>
            </div>
          </div>
          <div class="area_order">
            <router-link :to="{name: 'AddCart',params: {id: products.id}}">
              <button
                
                style="
                  border-radius: 20px;
                  color: #fff;
                  width: 100%;
                  border: 1px solid orange;
                  background: -webkit-linear-gradient(top, #fd6e1d, #f59000);
                  height: 80px;
                "
                type="button"
              >
                <el-icon style="font-size: 20px; margin: 5px 5px"
                  ><ShoppingCart
                /></el-icon>
                <b>{{ $t("Thêm vào giỏ hàng") }} </b>
                <p style="color: #fff">
                  {{ $t("Giao trong 1 giờ hoặc nhận tại cửa hàng") }}
                </p>
              </button>
            </router-link>
          </div>
        </div>
        <div
          class="detail_right"
          style="
            text-align: left;
            width: 400px;
            display: inline-block;
            border: 1px solid #ccc;
          "
        >
          <h2 style="text-align: center">{{ $t("Thông số kỹ thuật") }}</h2>
          <hr />
          <p style="margin: 0 10px; font-weight: 100%">
            <span style="width: 100%" v-html="products.des"></span>
          </p>
          <!-- <button style="font-size: 16px;" class="btn btn-info">Buy Now</button> -->
        </div>
      </li>
    </ul>
    <transition name="fade">
      <div class="dialog-wrapper" v-show="wrapperVisible">
        <transition name="scale">
          <div v-if="dialogVisible" class="dialog">
            <el-icon
              style="float: right; margin: 10px 10px; font-size: 20px"
              class="el-icon-close"
              @click="closeDialog"
              ><Close
            /></el-icon>

            <div class="dialog-body">
              <div
                style="
                  margin: 30px 0;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
              >
                <div class="img">
                  <img
                    :src="`http://localhost:8085/Files/${productForm.image}`"
                    alt="No Image"
                    style="
                      width: 300px;
                      height: 300px;
                      border: 1px solid #ccc;
                      border-radius: 10px;
                      margin: 0 10px;
                    "
                  />
                  <p style="color: red">
                    Giá:
                    {{ Number(productForm.promotionPrice).toLocaleString() }} đ
                  </p>
                </div>
                <div class="mau">
                  <el-radio-group v-model="radio" size="large">
                    <el-radio-button label="Đỏ" value="Đỏ" />
                    <el-radio-button label="Đen" value="Đen" />
                    <el-radio-button label="Trắng" value="Trắng" />
                  </el-radio-group>
                </div>
                <br />
                <div class="count">
                  <el-input-number v-model="num" :min="1" />
                </div>
                <br />
                <button
                  class="add-cart btn btn-success"
                  @click="addcart(productForm)"
                  :plain="true"
                >
                  Add Cart
                </button>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </div>
  <h3 class="tenKhung" style="margin: 30px 0 0 0;background-image: linear-gradient(120deg, #ff9c00 0%, #ec1f1f 50%, #ff9c00 100%);">* {{$t('CÁC SẢN PHẨM CÙNG TẦM GIÁ')}} *</h3>
  <ProductDetail1 :price="products.promotionPrice"/>
</template>

<script>
import axios from "axios";
import { ElMessage } from "element-plus";
import ProductDetail1 from './ProductDetail1'
export default {
  name: "ProductDetail",
  data() {
    return {
      value: 0,
      products: [],
      cateId: "",
      text: "",
      num: 1,
      radio: "",
      price: 0,
      wrapperVisible: false,
      dialogVisible: false,
    };
  },
  components: {
    ProductDetail1
  },
  created() {
    this.showProduct();
  },
  mounted(){
    this.showProduct()
    this.$watch(
      () => this.$route.fullPath,
      () => {
        this.showProduct();
      }
    );
  },
  computed: {
    getEmpInfor() {
      let emp = JSON.parse(localStorage["us"]);
      if (emp != undefined) return emp.id;
      return "";
    },
  },
  
  methods: {
    showProduct() {
      this.$store.state.isLoading = true;
      axios
        .get(
          `http://localhost:8181/api/products/findproductbyid?id=${this.$route.params.id}`
        )
        .then((res) => {
          if (res.status == 200) {
            this.$store.state.isLoading = false;
            this.products = res.data;
            this.price = res.data.promotionPrice
            this.value = res.data.status
          }
        })
        .catch(() =>{})
    },
    addcart(item) {
      axios
        .post(`http://localhost:8181/api/cart/insertcart`, {
          userId: this.getEmpInfor,
          productId: item.id,
          qty: this.num,
          productName: item.name,
          productPrice: item.promotionPrice,
          productImage: item.image,
        })
        .then((res) => {
          if (res.data == "ok" && res.status == 200) {
            ElMessage({
              message: "Add cart success.",
              grouping: true,
              type: "success",
            });
          }
        });
      this.dialogVisible = false;
      this.wrapperVisible = false;
    },
    openDialog(item) {
      this.productForm = item;
      this.dialogVisible = true;
      this.wrapperVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
      this.wrapperVisible = false;
    },
  },
};
</script>

<style scoped>
h3{
  display: block;
    line-height: 1.5em;
    font-size: 1.5em;
    text-align: center;
    margin: 0 auto;
    border-radius: 1em;
    color: white;
    transform: translateY(-0.75em);
    margin: 20px 0  0  0;
}
li {
  display: block;
  border-top: 1px solid #e5e5e5;
  padding: 15px 0;
  margin-top: 5px;
  clear: both;
}
.detail_left {
  float: left;
  overflow: hidden;
  width: 33%;
  position: relative;
  /*định vị trí phụ thuộc vào thành phần bao ngoài*/
  display: block;
}
.detail_left img {
  display: block;
  height: auto;
  margin: auto;
  cursor: pointer;
  /*thay đổi trỏ chuột đi đưa vào*/
  max-width: 100%;
}
.price {
  float: left;
  position: relative;
  width: 33%;
  display: block;
}

.area_price {
  display: block;
  overflow: hidden;
  line-height: 20px;
  padding: 0 10px 10px;
}

.area_price strong {
  display: inline-block;
  /*hối nội tuyến*/
  overflow: hidden;
  font-size: 24px;
  color: #e10c00;
  vertical-align: middle;
  /*thành phần sẽ đc canh giữa theo thành phần bao ngoài*/
  margin-right: 10px;
}

.area_price span {
  /* giá tiền gạch ngang */
  display: inline-block;
  vertical-align: middle;
  font-size: 20px;
  text-decoration: line-through;
  margin-left: 5px;
  color: #222;
}

.area_price label {
  display: inline-block;
  position: relative;
  font-size: 11px;
  color: #fff;
  font-weight: 600;
  /*hiển thị chữ đậm hay chữ thường*/
  border-radius: 3px;
  padding: 0 5px 0 8px;
  height: 18px;
}

.area_price label.tragop {
  background: #f28902;
  margin: 0 0 0 5px;
}

.area_price label.giamgia {
  background-image: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#ff9c00),
    to(#ec1f1f)
  );
  background-image: -webkit-linear-gradient(left, #ff9c00 0%, #ec1f1f 100%);
  background-image: -o-linear-gradient(left, #ff9c00 0%, #ec1f1f 100%);
  background-image: linear-gradient(90deg, #ff9c00 0%, #ec1f1f 100%);
  margin: 0 0 0 5px;
}

.area_price label.moiramat {
  background: #1191f8;
  margin: 0 0 0 5px;
}

.area_price label.giareonline {
  background: #3fb846;
  margin: 0 0 0 5px;
}

.ship {
  background-color: #ecf7ed;
  border-radius: 3px;
  border: 1px solid #c4ddc8;
  margin: 5px 10px 10px;
  padding: 0 10px;
  font-weight: bold;
  line-height: 30px;
}

.ship img {
  width: 19px;
  height: 21px;
  margin: 4px 10px 0 0;
  float: left;
}

.ship div {
  border-left: 1px solid #c4ddc8;
  display: block;
  line-height: 30px;
  padding-left: 10px;
  margin-left: 28px;
  color: #30a43b;
  max-width: 1200px;
}

.area_promo {
  border: 1px solid #ddd;
  display: block;
  overflow: hidden;
  border-radius: 4px;
  position: relative;
  margin: 5px 10px 12px;
  padding-bottom: 10px;
}

.area_promo strong {
  display: block;
  overflow: hidden;
  font-size: 24px;
  padding: 15px 15px 10px 15px;
  text-transform: uppercase;
  /*Viết thành chữ hoa*/
}

.area_promo .promo {
  display: block;
  overflow: hidden;
  font-size: 14px;
  padding: 0 15px 5px 40px;
}

.promo img {
  width: 14px;
  height: 14px;
  float: left;
  margin: 2px 0 0 -20px;
}

.area_order {
  display: block;
  overflow: hidden;
  margin: 10px;
}

.area_order .buy_now {
  display: block;
  overflow: hidden;
  padding: 7px 0;
  border-radius: 4px;
  font-size: 16px;
  line-height: normal;
  color: #fff;
  text-align: center;
  background: -webkit-linear-gradient(top, #f59000, #fd6e1d);
  text-decoration: none;
  cursor: pointer;
}

.area_order .buy_now:hover {
  background: -webkit-linear-gradient(top, #fd6e1d, #f59000);
}

.area_order .buy_now p {
  display: block;
  font-size: 13px;
  margin: 3px 0;
}

.policy {
  display: block;
  overflow: hidden;
  border: 1px solid #ddd;
  border-radius: 3px;
  padding-top: 10px;
  margin: 0 10px 10px 10px;
  padding-bottom: 5px;
}

.policy div {
  display: block;
  overflow: hidden;
  padding: 5px 0 5px 5px;
  font-size: 14px;
  line-height: 20px;
  margin: 0 10px;
  border-bottom: 1px solid #f0f0f0;
  position: relative;
}

.policy div img {
  background: #fff;
  display: block;
  width: 20px;
  height: 17px;
  float: left;
  margin: 3px;
}

.policy div p {
  margin: 0 0 0 28px;
  color: #288ad6;
}

.policy div.last {
  border-bottom: 0px;
}

.dialog-wrapper {
  position: fixed;
  z-index: 1000;
  top: 0px;
  right: 0px;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.dialog {
  position: absolute;
  width: 1155px;
  height: calc(100% - 130px);
  z-index: 1001;
  background-color: #fff;
  top: 100px;
  left: calc(50% - 577.5px);
  border-radius: 6px;
  border: 1px solid #dbdbdb;
}
.dialog-body {
  margin: 30px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.dialog.newsitem {
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.el-icon-close {
  cursor: pointer;
  color: #000;
}
.el-icon-close:hover {
  color: red;
  scale: 25px;
}
.scale-enter-active {
  -webkit-animation: scale-in-tr 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: scale-in-tr 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
.scale-leave-active {
  -webkit-animation: scale-out-tr 0.5s cubic-bezier(0.35, 0.385, 0.58, 0.83)
    both;
  animation: scale-out-tr 0.5s cubic-bezier(0.35, 0.385, 0.58, 0.83) both;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
@keyframes scale-in-tr {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
    -webkit-transform-origin: 100% 0;
    transform-origin: 100% 0;
    opacity: 1;
    position: absolute;
    top: 36px;
    left: calc(100% - 82px - 1155px);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transform-origin: 100% 0;
    transform-origin: 100% 0;
    opacity: 1;
    position: absolute;
    top: 100px;
    left: calc(50% - 577.5px);
  }
}
@keyframes scale-out-tr {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transform-origin: 100% 0;
    transform-origin: 100% 0;
    opacity: 1;
    position: absolute;
    top: 100px;
    left: calc(50% - 577.5px);
  }
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
    -webkit-transform-origin: 100% 0;
    transform-origin: 100% 0;
    opacity: 1;
    position: absolute;
    top: 36px;
    left: calc(100% - 82px - 1155px);
  }
}
</style>
