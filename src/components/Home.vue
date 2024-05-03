<template>
  <section class="banner container">
    <div class="slide container">
      <el-carousel :interval="2500" type="card" height="250px">
        <el-carousel-item>
          <img src="../assets/Files/slider/banner0.gif" alt="" />
        </el-carousel-item>
        <el-carousel-item>
          <img src="../assets/Files/slider/banner1.png" alt="" />
        </el-carousel-item>
        <el-carousel-item>
          <img src="../assets/Files/slider/banner2.png" alt="" />
        </el-carousel-item>
        <el-carousel-item>
          <img src="../assets/Files/slider/banner3.png" alt="" />
        </el-carousel-item>
        <el-carousel-item>
          <img src="../assets/Files/slider/banner4.png" alt="" />
        </el-carousel-item>
        <el-carousel-item>
          <img src="../assets/Files/slider/banner5.png" alt="" />
        </el-carousel-item>
        <el-carousel-item>
          <img src="../assets/Files/slider/banner6.png" alt="" />
        </el-carousel-item>
        <el-carousel-item>
          <img src="../assets/Files/slider/banner7.png" alt="" />
        </el-carousel-item>
        <el-carousel-item>
          <img src="../assets/Files/slider/banner8.png" alt="" />
        </el-carousel-item>
        <el-carousel-item>
          <img src="../assets/Files/slider/banner9.png" alt="" />
        </el-carousel-item>
        <!-- <h3 text="2xl" justify="center"></h3> -->
      </el-carousel>
    </div>
    <div class="qc">
      <img src="../assets/img/blackFriday.gif" alt="" />
    </div>
    
    <section>
      <div class="container">
        <div class="quick-sales">
          <div class="item">
            <router-link :to="{ name: 'ProductDetail', params: { id: 85 } }">
              <img
                src="../assets/img/s23-ultra-21790.gif"
                title="Galaxy S23 Ultra"
                alt="Galaxy S23 Ultra"
              />
            </router-link>
          </div>
          <div class="item">
            <router-link :to="{ name: 'ProductDetail', params: { id: 149 } }">
              <img
                src="../assets/img/redmi-13c.png"
                title="Redmi 13C (6GB/128GB)"
                alt="Redmi 13C (6GB/128GB)"
              />
            </router-link>
          </div>
          <div class="item" style="cursor: pointer;">
            
              <img
                src="../assets/img/sanphamhotwweb.png"
                title="Thu cũ đổi mới giá cao"
                alt="Thu cũ đổi mới giá cao"
              />
            
          </div>
          <div class="item" style="cursor: pointer;">
            
              <img
                src="../assets/img/huawei-matebook-d-15-amd-2021.png"
                title="HUAWEI MateBook D 15 AMD"
                alt="HUAWEI MateBook D 15 AMD"
              />
            
          </div>
        </div>
      </div>
    </section>
    <div class="admin-right">
      <h3
        class="tenKhung"
        style="
          
          background-image: linear-gradient(
            120deg,
            #ff9c00 0%,
            #ec1f1f 50%,
            #ff9c00 100%
          );
        "
      >
        * {{ $t("ĐỀ XUẤT CHO BẠN") }} *
      </h3>
      <Recommended />
      <h3
        class="tenKhung"
        style="
          margin-top: 30px;
          background-image: linear-gradient(
            120deg,
            #ff9c00 0%,
            #ec1f1f 50%,
            #ff9c00 100%
          );
        "
      >
        * {{ $t("NỔI BẬT NHẤT") }} *
      </h3>
      <ListProduct />
      <h3
        class="tenKhung"
        style="
          margin: 30px 0 0 0;
          background-image: linear-gradient(
            120deg,
            #42bcf4 0%,
            #004c70 50%,
            #42bcf4 100%
          );
        "
      >
        * {{ $t("SẢN PHẨM MỚI") }} *
      </h3>
      <ProductNew />
      <h3
        class="tenKhung"
        style="
          margin: 30px 0 0 0;
          background-image: linear-gradient(
            120deg,
            #5de272 0%,
            #007012 50%,
            #5de272 100%
          );
        "
      >
        * {{ $t("GIÁ SỐC ONLINE") }} *
      </h3>
      <PriceShock />
      <h3
        class="tenKhung"
        style="
          margin: 30px 0 0 0;
          background-image: linear-gradient(
            120deg,
            #ff9c00 0%,
            #ec1f1f 50%,
            #ff9c00 100%
          );
        "
      >
        * {{ $t("GIẢM GIÁ LỚN") }} *
      </h3>
      <BigSaleOff />

      <el-backtop :right="100" :bottom="100" />
    </div>
  </section>
</template>

<script>
import ListProduct from "@/pages/ListProduct/ListProduct";
import ProductNew from "@/pages/ListProduct/ProductNew";
import PriceShock from "@/pages/ListProduct/PriceShock";
import BigSaleOff from "@/pages/ListProduct/BigSaleOff";
import Recommended from "@/pages/ListProduct/Recommended";
export default {
  name: "HomePage",
  data() {
    return {};
  },
  components: {
    ListProduct,
    ProductNew,
    PriceShock,
    BigSaleOff,
    Recommended,
  },
};
</script>

<style scoped>
h3 {
  display: block;
  line-height: 1.5em;
  font-size: 1.5em;
  text-align: center;
  margin: 0 auto;
  border-radius: 1em;
  color: white;
  transform: translateY(-0.75em);
  margin: 20px 0 0 0;
}
.qc {
  margin: 10px 0;
}
.banner {
  background-size: cover;
  margin-top: 30px;
  /* height: 500px; */
  overflow: hidden;
  margin: 0 auto;
}
.slide {
  position: relative;
  height: 250px;
  max-width: 1200px;
  margin: 0 auto;
  background: #fff;
}
img {
  border-radius: 10px;
  width: 100%;
  height: 100%;
}
.admin-right {
  width: 100%;
  min-height: 100px;
  float: left;
  margin: 0 auto;
}

h4 {
  text-align: center;
  margin: 10px 0;
  width: 100%;
  background-color: #01aa39;
  color: #fff;
  height: 40px;
  line-height: 40px;
}
section{
  display: block;
}
.container {

    margin: 0 auto;
}
section .quick-sales {
    display: flex;
    margin: 10px 0 50px 0;
}
section .quick-sales .item {
    margin-right: 10px;
    width: calc(1 / 4* 100% -(1 - 1 / 4)* 10px);
}
a, a:link, a:visited {
    text-decoration: none;
    color: #00483d;
}
section .quick-sales .item img {
    max-width: 100%;
}
</style>
