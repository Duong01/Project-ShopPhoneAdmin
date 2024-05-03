<template>
  <el-config-provider :locale="getElLang">
    <router-view> </router-view>
  </el-config-provider>
</template>
<script>
import vi from "element-plus/dist/locale/vi.mjs";
import { ElConfigProvider } from "element-plus";
export default {
  name: "App",
  components: { ElConfigProvider },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  computed: {
    getElLang() {
      return this.$store.state.curi18n.curElLang
        ? this.$store.state.curi18n.curElLang
        : vi;
    },
  },
  watch: {},
};
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  /* font-family: Arial, Helvetica, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
* {
  margin: 0;
  padding: 0;
  outline: none;
  font-family: Arial, Helvetica, sans-serif;
}
body {
  /* font-family: Arial, Helvetica, sans-serif; */
  margin: inherit !important;
}
</style>
