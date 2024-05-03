<template>
  <div class="container" v-loading="this.$store.state.isLoading">
        <li v-for="item in charger" :key="item.id" > 
            <div class="card">
                <div class="imgBx">
                  <router-link :to="{ name: 'ProductDetail',params:{id:item.id}}">
                    <a href=""><img :src="`http://localhost:8085/Files/${item.image}` " alt="No Image"></a>
                  </router-link>
                </div>
                <div class="content">
                  <div class="productName">
                   <a style="font-size: 14px;" class="card-title"> <b>{{item.name}}</b></a>
                  </div>
                  <div class="original-price">
                    OriginalPrice: {{Number(item.originalPrice).toLocaleString()}}đ
                  </div>
                  <div class="price">
                    Price: {{Number(item.promotionPrice).toLocaleString()}}đ
                  </div>
                  <div>
                    SoldCount: {{item.soldCount}}
                  </div>
                  <div class="action">
                    <router-link to="">
                      <button class="add-cart" @click="openDialog(item)">Add Cart</button>
                    </router-link>
                    
                    <router-link :to="{ name: 'ProductDetail',params:{id:item.id}}">
                      <button class="detail">Product Detail</button>
                    </router-link>
                  </div>
                </div>
            </div>
        </li>
            <transition name="fade">
        <div class="dialog-wrapper" v-show="wrapperVisible" >
          <transition name="scale">
            <div v-if="dialogVisible" class="dialog">
              <i style="float:right; padding: 20px; font-size: 20px;" class="el-icon-close" @click="closeDialog"></i>
              <div class="dialog-body">
                <div style="margin:30px 0;display:flex;justify-content:center;align-items:center">
                   <div class="img">
                    <img
                  :src="`http://localhost/Files/${loudspeakerDetail.image}`"
                  alt="No Image"/>
                 <p style="color: red">Giá: {{Number(loudspeakerDetail.promotionPrice).toLocaleString()}}đ</p>
                   </div>
                   <div class="mau">
                    <el-radio-group v-model="radio" size="large">
                      <el-radio-button label="Đỏ" value="Đỏ"/>
                      <el-radio-button label="Đen" value="Đen"/>
                      <el-radio-button label="Trắng" value="Trắng"/>
                    </el-radio-group>
                   </div>
                   <br>
                   <div class="count">
                    <el-input-number v-model="num" :min="1" />
                   </div>
                   <br>
                  <button class="add-cart btn btn-success" @click="addcart(loudspeakerDetail)">Add Cart</button>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </transition>
  </div>
</template>
  
<script>
import axios from "axios";
import { ElMessage } from "element-plus";

export default {
  name: "ChargerPage",
  data() {
    return {
      charger: [],
      cateId: "",
      text: "",
      num: 1,
      radio: '',
      wrapperVisible: false,
      dialogVisible: false,
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
    show() {
      return localStorage.getItem("us") !=undefined
    
    },
  },
  methods: {
    getAll() {
      axios.get(`http://localhost:8181/api/products/listproductbycate?cate=${(this.cateId = 3)}`)
        .then((res) => {
          if (res.data != null) {
            this.charger = res.data;
            this.$store.state.isLoading = false
          }
          if (res.data.length == 0) {
            this.text = "Không có sản phẩm nào";
          }
        });
        this.$store.state.isLoading = true
    },
    addcart(item) {
      if(this.show){
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
            alert("Add success");
          }
        });
        this.dialogVisible = false;
      this.wrapperVisible = false;
      }
      else{
        ElMessage.error("You are not loggin");
      }
    },
    openDialog (item) {
      this.loudspeakerDetail = item
      this.dialogVisible = true
      this.wrapperVisible = true
    },
    closeDialog () {
      this.dialogVisible = false
      this.wrapperVisible = false
    },
    
  },
};
</script>

<style scoped>
li {
  width: 278px;
  height: 470.31;
  list-style: none;
}
.container {
  display: flex;
  position: relative;
  width: 90%;
  max-width: 1200px;
  display: grid;
  grid-template-columns: auto auto auto auto !important;
  grid-gap: 20px;
  padding: 30px;
  z-index: 0;
  margin: auto;
}

.container .card {
  width: 100%;
  background: #fff;
  border-radius: 10px;
  box-shadow: 2px 2px 2px gray;
}

.container .card .imgBx {
  position: relative;
  width: 100%;
  height: 300px;
  margin-top: 10px;
  overflow: hidden;
}

.container .card .imgBx img {
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: 0.5s;
}

.container .card .imgBx:hover img {
  transition: 0.5s;
  transform: scale(1.1);
}

.container .card .content {
  text-align: center;
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

.container .card .content .price {
  text-align: center;
  margin-right: 10px;
  font-size: 18px;
}

.container .card .content .original-price {
  color: darkred;
  text-align: center;
  margin-right: 10px;
  text-decoration: line-through;
  font-size: 15px;
}

.rating {
  color: gold;
  text-align: right;
  margin-right: 5px;
}

.action {
  display: flex;
  height: 40px;
  line-height: 40px;
  text-transform: uppercase;
  margin-top: 5px;
}

.action .add-cart {
  /* width: 50%; */
  background: #01aa39;
  color: white;
  border-bottom-left-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
  width: 138px;
}

.action .add-cart:hover {
  transition: 0.3s;
  background: goldenrod;
}

.action .detail {
  /* width: 50%; */
  background: rgb(1, 82, 85);
  color: white;
  border-bottom-right-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
  width: 140px;
}

.action .detail:hover {
  transition: 0.3s;
  background: greenyellow;
  color: #172330;
}
.dialog-wrapper{
    position: fixed;
    z-index: 1000;
    top: 0px;
    right: 0px;
    bottom: 0;
    left: 0;
    background-color: rgba(0,0,0,.5);
  }
.dialog{
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
.dialog-body{
  margin: 30px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.dialog-body .img{
  width: 300px;
  height: 300px;
  border: 1px solid #ccc;
  border-radius: 10px;
}
.dialog-body .img img{
  width: 100%;
  height: 100%;
}
.dialog.newsitem{
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
    -webkit-animation: scale-in-tr .5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    animation: scale-in-tr .5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  }
  .scale-leave-active {
    -webkit-animation: scale-out-tr .5s cubic-bezier(0.350, 0.385, 0.580, 0.830) both;
    animation: scale-out-tr .5s cubic-bezier(0.350, 0.385, 0.580, 0.830) both;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  @keyframes scale-in-tr {
    0% {
      -webkit-transform:scale(0);
      transform:scale(0);
      -webkit-transform-origin:100% 0;
      transform-origin:100% 0;
      opacity:1;
      position: absolute;
      top: 36px;
      left: calc(100% - 82px - 1155px);
    }
    100% {
      -webkit-transform:scale(1);
      transform:scale(1);
      -webkit-transform-origin:100% 0;
      transform-origin:100% 0;
      opacity:1;
      position: absolute;
      top: 100px;
      left: calc(50% - 577.5px);
    }
  }
  @keyframes scale-out-tr {
    0% {
      -webkit-transform:scale(1);
      transform:scale(1);
      -webkit-transform-origin:100% 0;
      transform-origin:100% 0;
      opacity:1;
      position: absolute;
      top: 100px;
      left: calc(50% - 577.5px);
    }
    100% {
      -webkit-transform:scale(0);
      transform:scale(0);
      -webkit-transform-origin:100% 0;
      transform-origin:100% 0;
      opacity:1;
      position: absolute;
      top: 36px;
      left: calc(100% - 82px - 1155px);
    }
  }
</style>

