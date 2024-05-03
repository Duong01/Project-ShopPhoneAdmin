<template>
  <div id="Footer" :class="{ homepage: $route.path === '/home' }">
    <div class="container-box content">
      <div class="content-left">
        <div class="box">
          <div class="box-title">Mô tả trang web</div>
          <div class="box-item">
            <router-link :to="{ name: 'TinTuc', params: {} }">
              Tin tức
            </router-link>
          </div>
          <div class="box-item">
            <router-link :to="{ name: 'TuyenDung', params: {} }">
              Tuyển dụng
            </router-link>
          </div>
          <div class="box-item">
            <router-link :to="{ name: 'GioiThieu', params: {} }">
              Giới thiệu
            </router-link>
          </div>
          <div class="box-item">
            <router-link :to="{ name: 'BaoHanh', params: {} }">
              Bảo hành
            </router-link>
          </div>
          <div class="box-item">
            <router-link :to="{ name: 'LienHe', params: {} }">
              Liên hệ
            </router-link>
          </div>
        </div>
        <div class="box">
          <div class="box-title">UserHelp</div>
          <div class="box-item"><a>HelpCenter</a></div>
          <div class="box-item"><a>PrivacyPolicy</a></div>
          <div class="box-item"><a>Feedback</a></div>
          <div class="box-item"><a>UserServicesAgreement</a></div>
        </div>
        <div class="box">
          <div class="box-title">Trang chủ</div>
          <div class="box-item">Trang chủ</div>
          <div class="box-item">Tin tức: {{ tel }}</div>
          <div class="box-item">Tuyển dụng: {{ mail }}</div>
          <div class="box-item">Giới thiệu</div>
          <div class="box-item">Bảo hành</div>
          <div class="box-item">Liên hệ</div>
        </div>
      </div>
      <div class="content-right">
        <!-- <div class="info-right">
          <iframe
            width="100%"
            height="400"
            src="https://maps.google.com/maps?width=100%&amp;height=450&amp;hl=en&amp;coord=10.759660000323064,106.68192160315813&amp;q=194+%C4%90.+L%C3%AA+Du%E1%BA%A9n,+Kh%C3%A2m+Thi%C3%AAn,+%C4%90%E1%BB%91ng+%C4%90a,+H%C3%A0+N%E1%BB%99i,+Vi%E1%BB%87t+Nam&amp;ie=UTF8&amp;t=&amp;z=16&amp;iwloc=B&amp;output=embed"
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
            ><a href="https://www.maps.ie/create-google-map/"
              >Embed Google Map
            </a>
          </iframe>
          <br />
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterPage",
  data() {
    return {
      tel: "535-31385", // 电话号码
      mail: "nguyenvanduongit01@gmail.com", // 邮箱地址
      version: "vn-1.0", // 系统版本
      versionInfo: "", // 系统版本信息
      isDialog: false, // 是否显示版本信息弹窗
      dialogData: [], // 版本信息详细数据
      QRcode: require("@/assets/img/QRCode.png"), // 二维码地址
    };
  },
};
</script>

<style scoped>
#Footer {
  border-top: solid #e5e5e5 1px;
  margin-top: 54px;
}
#Footer.homepage {
  margin: 0;
}
.homepage > .content {
  padding-top: 46px;
}
.content {
  padding-top: 27px;
  padding-bottom: 25px;
  display: flex;
  justify-content: space-between;
}
.content-left {
  flex: 0 0 70%;
  display: flex;
  justify-content: space-around;
  line-height: 30px;
  color: #99a1a6;
  font-size: 14px;
}

.box {
  display: flex;
  flex-direction: column;
  max-width: 400px;
}
.box-title {
  font-weight: bold;
}
.box-item {
  padding: 6px 0;
  line-height: 16px;
}
.box-item > a {
  text-decoration: none;
  color: #99a1a6;
}
.box-item:hover {
  text-decoration: underline;
}
.blackbg {
  background-color: #1c1f21;
}

.content-right {
  display: flex;
  width: 30%;
}
.info-right {
	width: 100%;	
}
p {
  color: #999999;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
}

img {
  width: 150px;
  height: 150px;
}
</style>
