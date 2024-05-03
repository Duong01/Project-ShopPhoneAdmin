<template>
  <table>
    <tr>
      <td colspan="4" class="header-table">  
          Các trung tâm bảo hành của Smartphone Store
      </td>
    </tr>
    <tr>
      <th class="col1">STT</th>
      <th class="col2">Địa chỉ</th>
      <th class="col3">Điện thoại</th>
      <th class="col4">Thời gian làm việc</th>
    </tr>
    <tr v-for="item, index in trungtam" :key="index">
      <td class="col1">
        {{index + 1}}
        </td>
      <td class="col2">
        <a :href="link + item.address">
       {{item.address}}
       </a>
      </td>
      <td class="col3">{{item.phone}}</td>
      <td class="col4">{{item.house}}</td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "BaoHanh",
  data(){
    return{
      link: 'https://maps.google.com/maps?q=',
      trungtam : 
      [
        {address: "10F2, Hồ Trung Thành, P7 – Tp. Cà Mau, Tỉnh Cà Mau"       , phone:"(0780)-2212 158" ,house: "8h00 - 17h00"},
        {address:"14A2 Trần Nguyên Hãn, P.Mỹ Long, Long Xuyên, An Giang"    , phone:"076.3841649"     ,house: "8h00 - 17h00"},
        {address:"114 Tô Hiệu, Quận Lê Chân, Tp. Hải Phòng"                 , phone:"(031)-384 7689"  ,house: "8h00 - 17h00"},
        {address:"32 Lương Khánh Thiện, Tp. Hải phòng"                      , phone:"0924713257"      ,house: "8h00 - 17h00"},
        {address:"123 Nam Kỳ Khởi Nghĩa, Tp. Vũng Tàu, Tỉnh BRVT"           , phone:"(064)-3531 248"  ,house: "8h00 - 17h00"},
        {address:"157 Ngô Gia Tự, Phường Ngô Quyền, TP Bắc Giang"           , phone:"(0240)-3820 349" ,house: "8h00 - 17h00"},
        {address:"32 Lương Khánh Thiện, Tp. Hải phòng"                      , phone:"(0781)-3827 676" ,house: "8h00 - 17h00"},
        {address:"139 Nguyễn Văn Cừ, Tp. Bắc Ninh, Tỉnh Bắc Ninh"           , phone:"(0241)-3812767"  ,house: "8h00 - 17h00"},
        {address:"39 Nguyễn Đình Chiểu, P 1, Tx. Bến Tre, Tỉnh Bến Tre"     , phone:"(075)-3814 701"  ,house: "8h00 - 17h00"},
        {address:"10A, Lý Thường Kiệt, Tp. Quy Nhơn, Tỉnh Bình Định"        , phone:"(056)-3821 788"  ,house: "8h00 - 17h00"},
        {address:"42 Phố 11 Vân Giang, P. Vân Giang, Tp. Ninh Bình"         , phone:"(030)-389 3408"  ,house: "8h00 - 17h00"},
        {address:"283 Cách Mạng Tháng Tám, TX.Thủ Dầu Một, Tỉnh Bình Dương" , phone:"0650.3831528"    ,house: "8h00 - 17h00"},
        {address:"47 Khu 2, P. Phước Bình, Tx. Phước Long, Bình Phước"      , phone:"(0651)-3774 789" ,house: "8h00 - 17h00"},
        {address:"20 Nguyễn Hội P.Phú Trinh Tp.Phan Thiết, Tỉnh Bình Thuận" , phone:"062.382853"      ,house: "8h00 - 17h00"},
        {address:"76 Nguyễn Đình Chiểu, P 2, Tp. Cao Lãnh, Đồng Tháp"       , phone:"(067)-3874 686"  ,house: "8h00 - 17h00"}
      ]
    }
  }
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  margin: 50px;
  width: 90%;
  height: 100%;
  font-size: 14px;
}

td a {
  display: block;
  margin-left: 5px;
	padding: 10px 0;

  transition-duration: 0.2s;
}

td a:hover {
  color: red;
  margin-left: 10px;
  text-decoration: underline;
  cursor: pointer;
}

/* những tr chẵn sẽ có màu khác */
tr:nth-of-type(even) {
  background-color: #e6e4e4;
}

.header-table {
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  background: #0c9;
}

.col1 {
  text-align: center;
  width: 3%;
  height: 30px;
}

.col2 {
  padding-left: 10px;
  width: 52%;
}

.col3 {
  padding-left: 10px;
  width: 20%;
}

.col4 {
  padding-left: 20px;
  width: 15%;
}
</style>
