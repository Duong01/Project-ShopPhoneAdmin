<template>
  <div class="box">
    
      <el-container>
        <el-aside :width="leftSideBarWidth" class="left-menu">
          <el-menu
            router
            :default-active="$route.path"
            text-color="black"
            active-text-color="#0050f1"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
          >
            <el-button
              @click="ToggleLeftSide"
              type="default"
              style="border: none"
            >
              <el-icon v-if="isCollapse == true">
                <DArrowRight />
              </el-icon>
              <el-icon v-else>
                <DArrowLeft />
              </el-icon>
            </el-button>
            <el-sub-menu index="1" class="el-sub-menu">
              <template #title>
                <el-icon><Iphone /></el-icon>
                <span>{{ $t("Điện thoại") }}</span>
              </template>
              <el-menu-item index="/product/iphone">{{$t("Điện thoại Iphone")}}</el-menu-item>
              <el-menu-item index="/product/samsung">{{$t("Điện thoại SamSung")}}</el-menu-item>
              <el-menu-item index="/product/oppo">{{$t("Điện thoại Oppo")}}</el-menu-item>
              <el-menu-item index="/product/xiaomi">{{$t("Điện thoại Xiaomi")}}</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="2" class="el-sub-menu">
              <template #title>
                <el-icon><Headset /></el-icon>
                <span>{{ $t("Phụ kiện điện thoại") }}</span>
              </template>
              <el-menu-item index="/product/earphone">{{$t("Tai nghe")}}</el-menu-item>
              <el-menu-item index="/product/charger">{{$t("Sạc dự phòng")}}</el-menu-item>
              <el-menu-item index="/product/loudspeaker">{{$t("Loa")}}</el-menu-item>
              <el-menu-item index="/product/chargercable">{{$t("Sạc, cáp")}}</el-menu-item>
              <el-menu-item index="/product/stickgimbal">{{$t("Gậy chụp ảnh, gimbal")}}</el-menu-item>
              <el-menu-item index="/product/stand">{{$t("Giá đỡ điện thoại/laptop")}}</el-menu-item>
              <el-menu-item index="/product/hook">{{$t("Đế, móc điện thoại")}}</el-menu-item>
              <el-menu-item index="/product/waterproof">{{$t("Túi chống nước")}}</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-aside>
      </el-container>
    
    <div class="box-right">
      <router-view />
    </div>
  </div>
</template>

<script>
// import axios from "axios";
export default {
  name: "ProductPage",
  data() {
    return {
      categories: [],
      isCollapse: false,
      leftSideBarWidth: "250px",
    };
  },
  methods: {
    ToggleLeftSide() {
      this.isCollapse = !this.isCollapse;
      if (this.isCollapse) this.leftSideBarWidth = "64px";
      else this.leftSideBarWidth = "250px";
    },
  },
};
</script>
<style scoped>
.box {
  display: flex;
  width: 100%;
}
.box-left {
  width: 256px;
  min-height: 400px;
  padding-top: 50px;
  border-right: #e6e6e6 solid 1px;
  background: #f5f5f5;
}
.el-menu {
  height: 100%;
  border-right: none;
}

.el-menu-item.is-active {
  background-color: rgba(#1890ff, 0.1) !important;
  border-right: solid #1890ff 3px;
}

.box-right {
  width: 100%;
  /* padding: 47px 0 0 22px; */
}
</style>
