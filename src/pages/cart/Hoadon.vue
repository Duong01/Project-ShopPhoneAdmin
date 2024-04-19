<template>
  <div>
    <!-- Button để gọi hàm exportToPDF -->
    <button @click="exportToPDF">Xuất PDF</button>

    <!-- Phần hiển thị hóa đơn -->
    <div ref="invoice">
      <!-- Dữ liệu hóa đơn -->
      <h2>{{ invoiceTitle }}</h2>
      <p>Số hóa đơn: {{ invoiceNumber }}</p>
      <p>Ngày: {{ invoiceDate }}</p>
      <!-- Các mục hóa đơn -->
      <ul>
        <li v-for="item in invoiceItems" :key="item.id">
          {{ item.name }}: {{ item.price }}
        </li>
      </ul>
      <!-- Tổng cộng -->
      <p>Tổng cộng: {{ total }}</p>
    </div>
  </div>
</template>

<script>
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default {
  name: "HoaDon",
  data() {
    return {
      invoiceTitle: "Hóa đơn",
      invoiceNumber: "HD001",
      invoiceDate: "11/04/2024",
      invoiceItems: [
        { id: 1, name: "Sản phẩm A", price: 100 },
        { id: 2, name: "Sản phẩm B", price: 150 },
        { id: 3, name: "Sản phẩm C", price: 200 },
      ],
    };
  },
  computed: {
    total() {
      return this.invoiceItems.reduce((total, item) => total + item.price, 0);
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
  },
};
</script>
