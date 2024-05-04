<template>
  <div class="layout">
    <div class="common-layout">
      <el-container>
        <el-header>
          <Header />
        </el-header>
        <el-main>
          <router-view />
        </el-main>
        <el-footer>
          <Footer />
        </el-footer>
      </el-container>
    </div>
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
};
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
#Layout {
  overflow: auto;
  min-width: 1200px;
  height: 100%;
}

.el-header {
    /* --el-header-padding: 0 20px; */
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
</style>
