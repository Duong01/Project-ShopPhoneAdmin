<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main style="margin: 50px 0">
        <router-view />
      </el-main>
      <el-footer>
        <Footer />
      </el-footer>
    </el-container>
    <el-backtop :bottom="100" :right="100" />
    <div class="zalo-contact" v-show="showZaloButton">
      <a href="https://zalo.me/0356076205" target="_blank" class="zalo-button">
        <img src="../assets/Logo.svg" alt="Zalo" class="zalo-icon" />
      </a>
    </div>

    <df-messenger
      intent="WELCOME"
      chat-title="ShopBuyPhone"
      agent-id="3274f91e-3826-43e2-b658-a13ff7225def"
      language-code="vi"
    ></df-messenger>
  </div>
</template>

<script>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
export default {
  name: "LayoutPage",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      showZaloButton: true,
    };
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      // Khi cuộn trang, kiểm tra vị trí cuộn
      this.showZaloButton = true;
    },
  },
};
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
#Layout {
  overflow: auto;
  min-width: 1200px;
  height: 100%;
}

.el-header {
  --el-header-padding: 0 20px;
  --el-header-height: 60px;
  padding: var(--el-header-padding);
  box-sizing: border-box;
  flex-shrink: 0;
  height: var(--el-header-height);
}
#Layout > div:nth-child(2) {
  min-height: calc(100% - 329px);
}

#Layout > div:nth-child(2) > .content {
  min-width: 1200px;
}

.zalo-contact {
  position: fixed;
  bottom: 60px;
  right: 20px;
  transition: opacity 0.3s;
}

.zalo-button {
  display: block;
  width: 50px;
  height: 50px;
  background-color: #00becc;
  color: #fff;
  border-radius: 50%;
  text-align: center;
  line-height: 50px;
  text-decoration: none;
  animation: blink 2s infinite;
  margin-bottom: 30px;
}

.zalo-button:hover {
  background-color: #0098a6;
}
@keyframes blink {
  0% {
    box-shadow: 0 0 0 0 rgba(2, 143, 227, 0.7);
    transform: scale(0.95);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(2, 143, 227, 0);
    transform: scale(1);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(2, 143, 227, 0);
    transform: scale(0.95);
  }
}
.zalo-icon {
  width: 50px; /* Điều chỉnh kích thước biểu tượng Zalo tùy thích */
  height: 50px;
  /* margin-bottom: 40px; */
}
</style>
