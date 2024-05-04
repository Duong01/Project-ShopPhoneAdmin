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
            ><el-icon><Iphone /></el-icon>{{ $t("Quản lý sản phẩm") }}</el-menu-item
          >
          <el-menu-item index="/categoriesmanagement"
            ><el-icon><Menu /></el-icon>{{ $t("Quản lý danh mục") }}</el-menu-item
          >
          <el-menu-item index="/cartmanagement"
            ><el-icon><Checked /></el-icon>{{ $t("Quản lý đơn hàng") }}</el-menu-item
          >
          <el-menu-item index="/usersmanagement"
            ><el-icon><UserFilled /></el-icon>{{ $t("Quản lý người dùng") }}</el-menu-item
          >
          <div class="flex-grow" />
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
</template>

<script>
import vi from "element-plus/dist/locale/vi.mjs";
import en from "element-plus/dist/locale/en.mjs";
import { setLanguage, getLanguage } from "@/utils/cookies";
export default {
  name: "HeaderPage",
  data() {
    return {};
  },
  created() {
    this.GetEmpNo();
  },
  methods: {
    GetEmpNo() {
      // return localStorage.getItem('us')
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
</style>
