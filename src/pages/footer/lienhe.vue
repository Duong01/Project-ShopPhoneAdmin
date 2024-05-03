<template>
  <div class="body-lienhe">
    <div class="lienhe-header">Liên hệ</div>
    <div class="lienhe-info">
      <div class="info-left">
          <h2 style="color: gray"> CÔNG TY TNHH SMARTPHONE STORE </h2><br />
          <b>Địa chỉ:</b> 194 Đường Lê Duẩn, Đống Đa, Hà Nội <br /><br />
          <b>Telephone:</b> 028 3835 4409<br /><br />
          <b>Hotline:</b> 097777777 - CSKH: 028 9996 777<br /><br />
          <b>Website:</b> <a href="https://github.com/HoangTran0410/DoAn_Web1">smartphonestore.com</a> <br /><br />
          <b>E-mail:</b> nguyenvanduongit01@gmail.com<br /><br />
          <b>Mã số thuế:</b> 01 02 03 04 05<br /><br />
          <b>Tài khoản ngân hàng :</b><br /><br />
          <b>Số TK:</b> 060008086888 <br /><br />
          <b>Tại Ngân hàng:</b> Agribank Chi nhánh Hà Nội<br /><br /><br /><br />
          <b>
            Quý khách có thể gửi liên hệ tới chúng tôi bằng cách hoàn tất biểu mẫu dưới đây. Chúng tôi sẽ trả lời thư của
            quý khách, xin vui lòng khai báo đầy đủ. Hân hạnh phục vụ và chân thành cảm ơn sự quan tâm, đóng góp ý kiến
            đến Smartphone Store.
          </b>
      </div>
      <div class="info-right">
        <iframe width="100%" height="500"
          src="https://maps.google.com/maps?width=100%&amp;height=450&amp;hl=en&amp;coord=10.759660000323064,106.68192160315813&amp;q=194+%C4%90.+L%C3%AA+Du%E1%BA%A9n,+Kh%C3%A2m+Thi%C3%AAn,+%C4%90%E1%BB%91ng+%C4%90a,+H%C3%A0+N%E1%BB%99i,+Vi%E1%BB%87t+Nam&amp;ie=UTF8&amp;t=&amp;z=16&amp;iwloc=B&amp;output=embed"
          frameborder="0" scrolling="no" marginheight="0" marginwidth="0"><a
            href="https://www.maps.ie/create-google-map/">Embed
            Google Map
          </a>
        </iframe>
        <br />
      </div>
    </div>
    <div class="lienhe-info">
      <div class="guithongtin">
        <p style="font-size: 22px; color: gray">Gửi thông tin liên lạc cho chúng tôi: </p>
        <hr />
        <form name="formlh">
          <table cellspacing="10px">
            <tr>
              <td>Họ và tên</td>
              <td><input type="text" name="ht" size="40" maxlength="40" placeholder="Họ tên" autocomplete="off"
                  required></td>
            </tr>
            <tr>
              <td>Điện thoại liên hệ</td>
              <td><input type="text" name="sdt" size="40" maxlength="11" minlength="10" placeholder="Điện thoại"
                  required></td>
            </tr>
            <tr>
              <td>Địa chỉ Email</td>
              <td><input type="email" name="em" size="40" placeholder="Email" autocomplete="off" required></td>
            </tr>
            <tr>
              <td>Tiêu đề</td>
              <td><input type="text" name="tde" size="40" maxlength="100" placeholder="Tiêu đề" required>
              </td>
            </tr>
            <tr>
              <td>Nội dung</td>
              <td><textarea name="nd" rows="5" cols="44" maxlength="500" wrap="physical" placeholder="Nội dung liên hệ"
                  required></textarea></td>
            </tr>
            <tr>
              <td></td>
              <td><button type="submit">Gửi thông tin liên hệ</button></td>
            </tr>
          </table>
        </form>
      </div>
      <div class="thongtinnhom">
        <p style="font-size: 22px; color: gray">Thông tin quản lý cửa hàng: </p>
        <hr />
        <table>
          <tr>
            <th>Họ tên</th>
            <th>MSV</th>
            <th>Giới tính</th>
            <th>Tỉ lệ công việc</th>
          </tr>
          <tr v-for="item, index in thongtin" :key="index">
            <td>{{ item.name }}</td>
            <td>
              {{ item.msv }}
            </td>
            <td>{{ item.gender }}</td>
            <td>{{ item.cv }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LienHe',
  data() {
    return {
      thongtin: [
        { name: "Nguyễn Văn Dương", msv: "0356076205", gender: "Nam", cv: "%" },
        { name: "Nguyễn Hữu Đức", msv: "0356076205", gender: "Nam", cv: "%" },
        { name: "Ngô Trung Hiếu", msv: "0356076205", gender: "Nam", cv: "%" },
        { name: "Nguyễn Văn Vũ", msv: "0356076205", gender: "Nam", cv: "%" }
      ]
    }
  }
}
</script>

<style scoped>
.body-lienhe{
	margin: 30px 50px 0 0;
	width: 100%;

}
.lienhe-header{
	height: 40px;
	font-weight: bold;
	line-height: 40px;
	padding-left: 10px;
}
.lienhe-info{
	margin: 20px auto 0; 
	display: inline-block;
	width: 100%;
}
.info-left{
	float: left;
	width: 48%;
}
.info-right {
	float: right;
	width: 48%;	
}
iframe {
	border: 1px solid gray;
}
.guithongtin {
	width: 45%;
	float: left;
}
.thongtinnhom{
	width: 50%;
	float: right;
}
table{	
	margin-top: 10px;
	height: 20px;
}
table input{
	padding: 5px;
}
table button{
	padding: 5px;
	cursor: pointer;
	background: #FFF;
	border: 1px solid #0C9;
}
table button:hover{
	background: #0C9;
}
.thongtinnhom table{
	border-collapse: collapse;
	margin-top: 20px;
}
.thongtinnhom table td,th{
	border: 1px solid #0C9;	
	height: 30px;
	padding: 3px;
	text-align: center;
}
/* những tr chẵn sẽ có màu khác */
.thongtinnhom tr:nth-of-type(even) {background-color: #f2f2f2;}
</style>