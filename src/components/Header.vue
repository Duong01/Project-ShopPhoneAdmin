<template>
  <div id="Header">
    <div class="content">
      <div class="content-middle">
        <el-menu
          :default-active="$route.path"
          class="el-menu-demo"
          mode="horizontal"
          :ellipsis="false"
          @select="handleSelect"
          router
        >
          <!-- <el-menu-item index="">
            <img
              style="width: 100px"
              src="../assets/img/logo.jpg"
              alt="Element logo"
            />
          </el-menu-item> -->

          <el-menu-item index="/home"><el-icon><HomeFilled /></el-icon>{{ $t("Trang chủ") }}</el-menu-item>
          <!-- <el-menu-item index="/exams">{{$t('Thi')}}</el-menu-item> -->
          <el-menu-item index="/product"><el-icon><Menu /></el-icon>{{ $t("Danh mục") }}</el-menu-item>
          <!-- <el-menu-item index="/order">{{ $t("Đơn hàng") }}</el-menu-item>
          <el-menu-item index="/cart">{{ $t("Giỏ hàng") }}</el-menu-item> -->
          <!-- <el-menu-item index="/mail">{{$t('Mail')}}</el-menu-item> -->
          <div class="flex-grow" />
          <el-menu-item index=""
            ><el-icon style="width: 30px; font-size: 20px"
              ><Message /><el-badge
                is-dot
                style="bottom: 10px"
              ></el-badge></el-icon
          ></el-menu-item>
          <el-menu-item index="" @click="openDialog"
            ><el-icon style="width: 30px; font-size: 20px"
              ><Bell /><el-badge
                is-dot
                style="bottom: 10px"
              ></el-badge></el-icon
          ></el-menu-item>
          <el-sub-menu index="">
            <template #title
              ><el-icon><ChromeFilled /></el-icon>{{ $t("Ngôn ngữ") }}</template
            >
            <el-menu-item @click="ChangeLang1('vi-VN')" index=""
              >Tiếng việt</el-menu-item
            >
            <el-menu-item @click="ChangeLang1('en-US')" index=""
              >English</el-menu-item
            >
            <el-menu-item index="">中国</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2" v-if="show" >
            <template #title
              ><el-icon><User /></el-icon>| {{ getEmpInfor }}</template
            >
            <el-menu-item index="" @click="Admin" v-if="getRole == 1"
              >Chuyển sang trang Admin</el-menu-item
            >
            <el-menu-item index="" @click="PersonalInformation">Thông tin cá nhân</el-menu-item>
            <el-menu-item index="" @click="logout">Logout</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2" v-else>
            <template #title
              ><el-icon><User /></el-icon>Login</template
            >
            <el-menu-item index="" @click="Login">Login</el-menu-item>
          </el-sub-menu>
        </el-menu>
        <div class="content-bottom">
          <div class="logo">
            <img
              src="../assets/img/logo.jpg"
              alt="Trang chủ Smartphone Store"
              title="Trang chủ Smartphone Store"
              @click="home"
            />
          </div>
          <div class="content-search">
            <div class="search-header">
              <div class="searchh">
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
            </div>
            <div class="tools-member">
              <el-menu
                :default-active="$route.path"
                class="el-menu-demo"
                mode="horizontal"
                :ellipsis="false"
                @select="handleSelect"
                router
              >
                <el-menu-item index="" @click="order"><el-icon><ShoppingBag /></el-icon>{{ $t("Đơn hàng") }}</el-menu-item>
                <el-menu-item index="" @click="cart"><el-icon><ShoppingCartFull /></el-icon>{{ $t("Giỏ hàng") }}</el-menu-item>
              </el-menu>
            </div>
          </div>
          <div class="table-responsive container" v-if="!productSelected">
            <table
              v-if="dataAll.length"
              class="table container"
              style="width: 400px"
            >
              <tbody>
                <tr v-for="item in resultQuery" :key="item.id">
                  <td>
                    <router-link @click="handleProductClick(item)"
                      :to="{ name: 'ProductDetail', params: { id: item.id } }"
                    >
                      <a v-bind:href="item.id" target="_blank">{{
                        item.name
                      }}</a>
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div
        class="dialog-wrapper"
        v-show="wrapperVisible"
        @click.self="closeDialog"
      >
        <transition name="scale">
          <div v-if="dialogVisible" class="dialog">
            <el-icon
              style="float: right; margin: 10px 10px; font-size: 20px"
              class="el-icon-close"
              @click="closeDialog"
              ><Close
            /></el-icon>
            <!-- <i style="float:right; padding: 20px; font-size: 20px;" class="el-icon-close" @click="closeDialog"></i> -->
            <div class="dialog-body">
              <div
                style="
                  margin: 30px 0;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
              >
                <strong>{{
                  "Trang đang được phát triển, vì vậy hãy chú ý theo dõi ~"
                }}</strong
                ><img
                  style="object-fit: cover"
                  src="@/assets/img/biu.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
import vi from "element-plus/dist/locale/vi.mjs";
import en from "element-plus/dist/locale/en.mjs";
import { setLanguage, getLanguage } from "@/utils/cookies";
import { ElMessage } from "element-plus";

import axios from "axios";
export default {
  name: "HeaderPage",
  data() {
    return {
      searchQuery: null,
      dialogTableVisible: false,
      wrapperVisible: false,
      dialogVisible: false,
      dataAll: [],
      productSelected: false,
    };
  },

  created() {
    this.GetEmpNo();
    this.getAll();
  },
  methods: {
    handleProductClick(item){
      this.productSelected = true,
      axios.put(`http://localhost:8181/api/products/updateproductbysearch`,{
        id: item.id,
        countSearch: item.countSearch + 1
      })
      .then(() => {
        
      })
      .catch(() =>{

      })
        
    },
    handleSelect() {},
    GetEmpNo() {
      // return localStorage.getItem('us')
    },
    order(){
      if(!this.show){
        ElMessage.error("You are not loggin");
      }
      else{
        this.$router.push('/order')
      }
      
    },
    cart(){
      if(!this.show){
        ElMessage.error("You are not loggin");
      }
      else{
        this.$router.push('/cart')
      }
    },
    querySearchAsync() {
      console.log(this.resultQuery);
    },
    getAll() {
      axios
        .get(`http://localhost:8181/api/products/listproduct`)
        .then((res) => {
          if (res.status == 200) {
            this.dataAll = res.data;
          }
          if (res.data.length == 0) {
            this.text = "Không có sản phẩm nào";
          }
        });
    },
    logout() {
      localStorage.clear();
      this.$router.push('/login')
    },
    Login(){
     this.$router.push('login') 
    },
    Admin(){
      window.open('http://localhost:8081')
    },
    PersonalInformation(){
      this.$router.push('/personalinformation')
    },
    home(){
      this.$router.push('/home')
    },
    open() {
      window.open("http://localhost:8082/#/exams");
    },
    swtichLanguage() {
      location.reload();
    },
    openDialog() {
      this.dialogVisible = true;
      this.wrapperVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
      this.wrapperVisible = false;
    },
    ChangeLang1(keyLang) {
      this.curLang = keyLang;
      this.ChangeLang();
    },
    ChangeLang() {
      switch (this.curLang) {
        case "en-US":
          this.curElLang = en;
          break;
        case "vi-VN":
          this.curElLang = vi;
          break;
        default:
          this.curElLang = vi;
          break;
      }
      if (this.curLang) {
        this.$i18n.locale = this.curLang;
        // Cookie
        setLanguage(this.curLang);
        // i18n store
        this.$store.state.curi18n.curLang = this.curLang;
        this.$store.state.curi18n.curElLang = this.curElLang;
      }
    },
    InitLang() {
      let currLang = getLanguage();
      this.curLang = currLang ? currLang : "vi-VN";
      this.ChangeLang();
    },
    search() {
      this.productSelected = true; // Show the table when searching
      this.productSelected = false; // Reset product selection state
      if(this.searchQuery == ''){
        this.$router.push('/home')
      }
    },
  },
  computed: {
    getEmpInfor() {
      let emp = JSON.parse(localStorage["us"]);
      if (emp != undefined) {
        return emp.fullname;
      }
      else{return "";}
    },
    show() {
      return localStorage.getItem("us") !=undefined
    
    },
    getRole() {
      let emp = JSON.parse(localStorage["us"]);
      if (emp != undefined) return emp.role_id;
      return "";
    },
    userInfo () {
      return this.$store.state.empInfor
    },
    resultQuery() {
      if (this.searchQuery) {
        return this.dataAll.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => item.name.toLowerCase().includes(v));
        });
      } else {
        return [];
      }
    },
    
  },
  mounted() {
    this.InitLang();
  },
};
</script>

<style scoped>
a{
  text-decoration: none;
}
.flex-grow {
  flex-grow: 2;
}

.content-bottom {
  width: 100%;
  /* height: 100px; */
}
.el-menu-item {
  font-size: 14px;
  color: rgb(0, 40, 73);
  padding: 0 20px;
  font-weight: bold;
  -webkit-transition: border-color 0.3s, background-color 0.3s, color 0.3s;
  transition: border-color 0.3s, background-color 0.3s, color 0.3s;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
#Header {
  height: 120px;
  color: #c3c3c3;
  background-color: #fff;
  font-size: 14px;
  box-shadow: 0 3px 10px 0 #c3c3c3;
  position: fixed;
  width: 100%;
  box-sizing: border-box;
  top: 0;
  left: 0;
  z-index: 24;
  margin: 0 400px 0 0;
}
.content {
  position: relative;
  height: 100%;
  margin-bottom: 100px;
}
.content-middle {
  align-items: center;
  height: 100px;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  min-width: 500px;
  padding-right: 20px;
  margin: 0 auto;
  box-sizing: border-box;
}
.logo {
  width: 250px;
  height: 60px;
  float: left;
  transition-duration: 0.1s;
}
.logo img {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}

.search-header {
  float: left;
  position: relative;
  left: 162px;
  top: 1px;
}
.searchh {
  margin-left: 20px;
  border-radius: 10px;
  height: 35px;
  width: 300px;
}
.el-input-group {
  display: inline-flex;
  width: 100%;
  flex-direction: row-reverse;
  margin-top: 10px;
}
.tools-member {
  float: right;
  display: table;
  margin-left: 10px;
  font-size: 14px;
}
img {
  width: 90%;
  cursor: pointer;
}
.content-right {
  display: inline-flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  height: inherit;
}
.language {
  position: relative;
  padding: 10px 0 !important;
}
.user {
  display: flex;
  float: left;
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
