<template>
  <div class="container">
    <h1>Tin tức</h1>
    <div class="tintuc-info">
      <a
        href="http://doanhnghiepvn.vn/cong-nghe/danh-gia-smartphone-chip-s660-ram-8-gb-gia-6-99-trieu-tai-viet-nam/2018112603315443"
        target="_blank"
      >
        <img src="../../assets/img/tintuc/tintuc1.png" />
        <h2>
          Đánh giá smartphone chip S660, RAM 8 GB, giá 6,99 triệu tại Việt Nam
        </h2>
      </a>
      <br>
      <br>
      <h5>Doanh ngiệp &emsp;3 giờ</h5>
    </div>
    <div class="tintuc-info">
      <a
        href="https://thanhnien.vn/cong-nghe/kham-pha-smartphone-man-hinh-gap-duoc-dau-tien-cua-samsung-1027111.html"
        target="_blank"
      >
        <img src="../../assets/img/tintuc/tintuc2.png" />
        <h2>Khám phá smartphone màn hình gập được đầu tiên của Samsung</h2>
      </a>
      <br>
      <br>
      <h5>Thanh niên &emsp; 6 giờ</h5>
    </div>
    <div class="tintuc-info">
      <a
        href="https://vov.vn/cong-nghe/doanh-so-iphone-xs-va-iphone-xr-tham-hai-apple-san-xuat-lai-iphone-x-843717.vov"
        target="_blank"
      >
        <img src="../../assets/img/tintuc/tintuc3.png" />
        <h2>
          Doanh số iPhone XS và iPhone XR thảm hại, Apple sản xuất lại iPhone X
        </h2>
      </a>
      <br>
      <br>
      <h5>VOV &emsp; 6 giờ</h5>
    </div>
    <div class="tintuc-info">
      <a
        href="http://vietq.vn/chiec-dien-thoai-thong-minh-nay-cua-lg-se-co-toi-16-camera-d151674.html"
        target="_blank"
      >
        <img src="../../assets/img/tintuc/tintuc4.png" />
        <h2>Chiếc điện thoại thông minh này của LG sẽ có tới 16 Camera</h2>
      </a>
      <br>
      <br>
      <h5>VietQ &emsp; 13 giờ</h5>
    </div>
    <div class="tintuc-info" style="border-bottom: 0">
      <a
        href="https://news.zing.vn/nhung-tieu-chi-ban-khong-nen-bo-qua-khi-mua-smartphone-2018-post894509.html"
        target="_blank"
      >
        <img
          src="../../assets/img/tintuc/tintuc5.png"
          height="148px"
          width="224px;"
        />
        <h2>Những tiêu chí bạn không nên bỏ qua khi mua smartphone 2018</h2>
      </a>
      <br>
      <br>
      <h5>Zing &emsp; 9 giờ</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: "TinTuc",
};
</script>

<style scoped>
.body-tintuc {
  margin: 70px 50px 50px 90px;
  width: 80%;
}
a {
  color: #000;
  text-decoration: none;
}
.tintuc-info {
  height: 170px;
  border-bottom: 1px solid #fcf;
  margin-top: 5px;
  margin-left: 20px;
}

.tintuc-info img {
  border: 1px solid gray;
  float: left;
  margin-right: 10px;
  padding: 5px;
  border-radius: 5px;
  height: 148px;
  width: 224px;
}
.tintuc-info a:hover {
  color: #666;
}
.tintuc-info h5 {
  font-weight: 100;
  font-style: italic;
  color: gray;
  float: left;
}
.tintuc-info h2 {
  font-weight: 100;

  float: left;
}
</style>
