<template>
  <div id="Header">
    <div class="content">
      <div class="content-middle">
        <el-menu
          :default-active="$route.path"
          class="el-menu-demo"
          mode="horizontal"
          :ellipsis="false"
          router
        >
          <el-menu-item index="/home"
            ><el-icon><HomeFilled /></el-icon
            >{{ $t("Trang chủ") }}</el-menu-item
          >
          <el-menu-item index="/productmanagement"
            ><el-icon><Iphone /></el-icon
            >{{ $t("Quản lý sản phẩm") }}</el-menu-item
          >
          <el-menu-item index="/categoriesmanagement"
            ><el-icon><Menu /></el-icon
            >{{ $t("Quản lý danh mục") }}</el-menu-item
          >
          <el-menu-item index="/cartmanagement"
            ><el-icon><Checked /></el-icon
            >{{ $t("Quản lý đơn hàng") }}</el-menu-item
          >
          <el-menu-item index="/usersmanagement"
            ><el-icon><UserFilled /></el-icon
            >{{ $t("Quản lý người dùng") }}</el-menu-item
          >
          <div class="flex-grow" />
          <el-menu-item index="" @click="openDialog"
            ><el-icon style="width: 50px; font-size: 20px"
              ><Bell /><el-badge
                style="bottom: 10px"
                :value="sold"
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
          <el-sub-menu index="2">
            <template #title
              ><el-icon><User /></el-icon>| {{ getEmpInfor }}</template
            >
            <el-menu-item index="" @click="logout">Logout</el-menu-item>
          </el-sub-menu>
        </el-menu>
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
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Mã đơn hàng</th>
                    <th scope="col">Ngày đặt</th>
                    <th scope="col">Giá sản phẩm</th>
                    <th scope="col">Tình trạng</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in order" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.id }}</td>
                    <td>{{ formatDate(item.createDate) }}</td>
                    <td>{{ Number(item.price).toLocaleString() }}đ</td>
                    <td>{{ item.status }}</td>
                  </tr>
                </tbody>
              </table>
              <img
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
</template>

<script>
import vi from "element-plus/dist/locale/vi.mjs";
import en from "element-plus/dist/locale/en.mjs";
import { setLanguage, getLanguage } from "@/utils/cookies";
import axios from "axios";
export default {
  name: "HeaderPage",
  data() {
    return {
      wrapperVisible: false,
      dialogVisible: false,
      order: [],
      sold: 0,
    };
  },
  created() {
    this.GetEmpNo();
    this.getAll();
  },
  methods: {
    GetEmpNo() {
      // return localStorage.getItem('us')
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
    // Date Time
    calculateDeliveryDate(dateString) {
      const date = new Date(dateString);
      date.setDate(date.getDate() + 3); // Cộng thêm 3 ngày
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
    calculateDelivery(createDate) {
      const deliveryDate = new Date(createDate); // Tạo một đối tượng ngày từ ngày đặt hàng
      deliveryDate.setDate(deliveryDate.getDate()); // Thêm 3 ngày vào ngày đặt hàng
      return deliveryDate.toISOString().slice(0, 10); // Trả về ngày giao hàng dự kiến dưới dạng YYYY-MM-DD
    },
    getAll() {
      axios
        .get(`http://localhost:8181/api/order/listorderbyid?status=Processing`)
        .then((res) => {
          if (res.status == 200) {
            this.order = res.data;
          }
          this.sold = res.data.length;
          // this.$store.state.isLoading = true;
        });
    },
    openDialog() {
      this.dialogVisible = true;
      this.wrapperVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
      this.wrapperVisible = false;
    },
    logout() {
      location.reload();
      localStorage.clear();
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
  },
  computed: {
    getEmpInfor() {
      let emp = JSON.parse(localStorage["us"]);
      if (emp != undefined) return emp.fullname;
      return "";
    },
  },
  mounted() {
    // i18n
    this.InitLang();
  },
};
</script>

<style scoped>
.flex-grow {
  flex-grow: 2;
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
  height: 70px;
  color: #c3c3c3;
  background-color: #fff;
  font-size: 14px;
  box-shadow: 0 3px 10px 0 #c3c3c3;
  position: fixed;
  width: 100%;
  box-sizing: border-box;
  top: 0;
  z-index: 24;
  margin: 0 400px 0 0;
}
.content {
  position: relative;
  height: auto;
  /* margin-bottom: 100px; */
}
.content-middle {
  align-items: center;
  height: auto;
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
