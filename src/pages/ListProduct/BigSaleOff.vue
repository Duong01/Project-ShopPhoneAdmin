<template>
   <div class="container" v-loading="this.$store.state.isLoading">
  <div class="row">
    <div
      class="col-md-3 mb-4"
      v-for="item in products"
      :key="item.id"
    >
      <div class="card">
        <router-link :to="{ name: 'ProductDetail', params: { id: item.id } }">
          <el-badge value="hot" class="item" style="font-size: 20px">
            <div class="imgBx">
              <img
                class="card-img-top"
                :src="`http://localhost:8085/Files/${item.image}`"
                alt="Product Image"
              />
            </div>
          </el-badge>
          <div class="card-body">
            <div class="productName">
              <a style="font-size: 14px" class="card-title">
                <b>{{ item.name }}</b></a
              >
            </div>
            <div class="price">
              <strong
                >{{ Number(item.promotionPrice).toLocaleString() }}đ</strong
              >
              <span>{{ Number(item.originalPrice).toLocaleString() }}đ</span>
            </div>
            <div class="rate">
              <el-rate
                v-model="item.status"
                disabled
                size="small"
                show-score
                text-color="#ff9900"
                score-template="{value} points"
              />
            </div>
          </div>
        </router-link>
        <router-link :to="{name: 'AddCart',params: {id: item.id}}">
          <div class="action">
              <button class="add-cart">+</button>
            
            <span class="tooltiptext"> Add cart </span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from "axios";
import { ElMessage } from "element-plus";
export default {
  name: "BigSaleOff",
  data() {
    return {
      products: [],
      productForm: [],
      value: 4.5,
      display: false,
      num: 1,
      radio: "",
      dialogVisible: false,
      state: "",
    };
  },
  created() {
    this.getAll();
  },
  filters: {
    toUSD(value) {
      return `$${value.toLocaleString()}`;
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
  },
  methods: {
    getAll() {
      axios
        .get("http://localhost:8181/api/products/listproducthot?status=4")
        .then((res) => {
          if (res.data != null) {
            this.products = res.data.slice(0, 8);
            this.$store.state.isLoading = false;
          } else {
            res.data = "Không có sản phẩm nào";
          }
        });
      this.$store.state.isLoading = true;
    },
    handSelect() {},
    querySearchAsync() {
      this.getAll();
    },
    Show(item) {
      this.productForm = [item.data];
      this.display = true;
    },
    addcart(item) {
      if (this.show) {
        axios
          .post(`http://localhost:8181/api/cart/insertcart`, {
            userId: this.getEmpInfor,
            productId: item.id,
            qty: this.num,
            productName: item.name,
            productPrice: item.promotionPrice,
            productImage: item.image,
            color: this.radio
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
      } else {
        ElMessage.error("You are not loggin");
      }
    },
    showfrom() {
      document.getElementById("form").style.display = "block";
    },
    close() {
      document.getElementById("form").style.display = "none";
    },
    openDialog(item) {
      this.productForm = item;
      this.dialogVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
    },
  },
};
</script>

<style scoped>

.xemTatCa {
    display: flex;
    font-weight: bold;
    text-align: center;
    margin: 0 auto;
    padding: .5em 1em;
    border-radius: 1em;
    color: #888;
    background-color: #eee;
    transition-duration: .2s;
    transform: translateY(1em);
    border-left: 2px solid #42bcf4;
    border-right: 2px solid #42bcf4;
}
.xemTatCa:hover {
    background-color: #ccc;
    color: #000;
}
a{
    text-decoration: none;
    color: #222;
}
li {
  width: 223px;
  /* height: 310px; */
  list-style: none;
  display: inline-block;
}
li a {
  text-decoration: none;
}

.container {
  position: relative;
  width: 100%;
  max-width: 1200px;
  /* display: grid;
  grid-template-columns: auto auto auto auto auto !important ;
  grid-gap: 20px; */
  padding: 30px;
  z-index: 0;
  margin: auto;
  justify-content: center;
  justify-items: start;
  border: 2px solid #ff4d00;
  border-radius: 10px;
}

.container .card {
  width: 100%;
  background: #fff;
  border-radius: 10px;
  box-shadow: 2px 2px 2px gray;
  height: auto;
  grid-gap: 20px;
  margin: 20px 0;
}

.imgBx {
  position: relative;
  width: 200px;
  height: 200px;
  margin-top: 10px;
  overflow: hidden;
}

.imgBx img {
  text-align: center;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: 0.5s;
}

.container .card .imgBx:hover {
  transition: 0.7s;
  transform: scale(1.1);
}

.container .card .content {
  margin: 0;
}

.productName a {
  color: #6b00a8;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* số dòng hiển thị */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #000;
  /* margin-top:10px; */
}

.container .card .price {
  /* text-align: center; */
  margin: 10px;
  font-size: 14px;
  float: left;
}
.container .card .price span {
  margin: 10px;
  color: #000;
  text-decoration: line-through;
}
.container .card .price strong {
  color: red;
}
.container .card .original-price {
  color: darkred;
  text-align: center;
  margin-right: 10px;
  text-decoration: line-through;
  font-size: 15px;
}

.action {
  position: absolute;
  display: inline-block;
  bottom: 5px;
  right: 5px;
}
.action:hover {
  transition: 0.2s;
  transform: scale(1.1);
}
.action .tooltiptext {
  visibility: hidden;
  width: 100px;
  height: 30px;
  line-height: 30px;
  background-color: #555;
  color: #fff;
  text-align: center;
  font-size: 13px;
  border-radius: 6px;
  /* padding: 5px; */
  position: absolute;
  z-index: 21;
  bottom: 150%;
  left: 50%;
  margin-left: -75px;
  opacity: 0;
  transition: opacity 0.3s;
}
.action .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}
.action .tooltiptext:hover {
  display: block;
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}
.action:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
.rate {
  float: left;
}
button.add-cart {
  width: 40px;
  height: 40px;
  border-radius: 40px;
  float: right;
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
  width: 800px;
  /* height: calc(100% - 130px); */
  z-index: 1001;
  background-color: #fff;
  top: 200px;
  left: calc(50% - 367.5px);
  border-radius: 6px;
  border: 1px solid #dbdbdb;
}
.dialog-body {
  margin: 30px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.dialog-body .img {
  width: 300px;
  height: 300px;
  border: 1px solid #ccc;
  border-radius: 10px;
}
.dialog-body .img img {
  width: 100%;
  height: 100%;
}
.dialog.newsitem {
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.el-icon-close {
  cursor: pointer;
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
/* @keyframes scale-in-tr {
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
} */
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
