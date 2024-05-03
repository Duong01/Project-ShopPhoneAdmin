<template>
  
<div class="invoice-container" v-for="item in order_details" :key="item.id">
  <div class="invoice-header">
    <img src="../../assets/img/logo.jpg" alt="Company Logo">
    <div>
      <h2>Hóa Đơn</h2>
      <p>Mã vận đơn: <span id="tracking-number">{{item.id}}</span></p>
      <p>Mã đơn hàng: <span id="order-number">{{ item.orderId}}</span></p>
    </div>
  </div>
  <div class="row">
    <div class="col-md-6">
      <div class="invoice-address">
        <h4>Địa chỉ người gửi</h4>
        <p>số 1 25/4/23 đường phú minh, Phường Minh Khai, Quận Bắc Từ Liêm, Hà Nội </p>
      </div>
    </div>
    <div class="col-md-6">
      <div class="invoice-address">
        <h4>Địa chỉ người nhận</h4>
        <p>{{ item.userAddress}}</p>
      </div>
    </div>
  </div>
  <div class="invoice-details">
    <h4>Chi tiết đơn hàng</h4>
    <table class="invoice-table">
      <thead>
        <tr>
          <th>Sản phẩm</th>
          <th>Số lượng</th>
          <th>Đơn giá</th>
          <th>Tổng</th>
        </tr>
      </thead>
      <tbody>
        <tr >
          <td>{{ item.productName }}</td>
          <td>{{ item.qty }}</td>
          <td>{{ item.productPrice.toLocaleString() }}đ</td>
          <td>{{ (item.productPrice* item.qty).toLocaleString() }}đ</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="invoice-total">
    <h4>Tổng tiền: <span id="total-amount">{{ total }}đ</span></h4>
  </div>
  <button class="btn btn-primary" @click="exportToPDF">Xuất PDF</button>
</div>

</template>

<script>
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";
import { ref } from 'vue';
export default {
  name: "HoaDon",
  data() {
    return {
      invoiceTitle: "Hóa đơn",
      invoiceNumber: "HD001",
      invoiceDate: "11/04/2024",
      order_details: []
    };
  },
  setup() {
    const currentDate = ref(new Date().toLocaleDateString());

    return {
      currentDate
    };
  },
  created(){
    this.showDetail()
  },
  computed: {
    total() {
      return this.order_details.reduce((total, item) => total + item.productPrice* item.qty, 0).toLocaleString();
    },
    
  },
  methods: {
    exportToPDF() {
      const invoice = this.$refs.invoice; // Tham chiếu đến phần tử hiển thị hóa đơn
      html2canvas(invoice).then((canvas) => {
        const imgData = canvas.toDataURL("data:image/png");
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        var width = pdf.internal.pageSize.getWidth();
        const height = (imgProps.height * width) / imgProps.width;
        pdf.addImage(imgData, "PNG", 0, 50, width, height);
        pdf.save("hoa-don.pdf"); // Lưu file PDF
      });
    },
    showDetail() {
      axios
        .get(
          `http://localhost:8181/api/orderdetail/listorderdetail?orderId=${this.$route.params.id}`
        )
        .then((res) => {
          if (res.status == 200) {
            this.order_details = res.data;
          } 
        })
        .catch((err) => {
          alert("Co loi", err);
        });
    },
  },
};
</script>
<style scoped>
.invoice-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      border: 2px solid #000;
    }
    .invoice-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      border-bottom: 1px dashed #000;
    }
    .invoice-header img {
      max-width: 250px;
      height: auto;
    }
    .invoice-address {
      margin-bottom: 20px;
      border-bottom: 1px dashed #000;
      padding-bottom: 10px;
    }
    .invoice-details {
      margin-bottom: 20px;
      border-bottom: 1px dashed #000;
      padding-bottom: 10px;
    }
    .invoice-table {
      width: 100%;
      border-collapse: collapse;
    }
    .invoice-table th, .invoice-table td {
      padding: 10px;
      border-bottom: 1px dashed #dee2e6;
    }
    .invoice-total {
      margin-top: 20px;
    }
li{
  list-style: none;
}
/* .invoice-container {
  font-family: Arial, sans-serif;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
} */
</style>
