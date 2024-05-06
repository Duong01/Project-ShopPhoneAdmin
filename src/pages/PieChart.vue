<template>
  <div class="container" v-loading="this.$store.state.isLoading">
    <h2 class="">{{ $t("Số lượng bán ra") }}</h2>
    <div class="row justify-content-center">
      <div class="col-md-12">
        <canvas class="chart-canvas" ref="chartCanvas"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Chart from "chart.js/auto";

export default {
  data() {
    return {
      chartData: null,
      chart: null,
      months: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"]

    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      try {
        axios
          .get(`http://localhost:8181/api/order/ordersuccess?status=Success`)
          .then((res) => {
            if (res.data && res.status === 200) {
              const allMonthsData = Array.from(
                { length: this.months.length },
                () => 0
              );
              res.data.forEach((order) => {
                allMonthsData[new Date(order.receivedDate).getMonth()] += order.qty;
              });
              this.chartData = allMonthsData;
              this.renderChart();
              this.$store.state.isLoading = false;
            }
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      this.$store.state.isLoading = true;
    },
    renderChart() {
      const ctx = this.$refs.chartCanvas.getContext("2d");
      this.chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: this.months,
          datasets: [
            {
              label: "Số lượng",
              backgroundColor: "rgb(25, 125, 255)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
              data: this.chartData,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              responsive: true,
            },
          },
        },
      });
    },
  },
};
</script>

<style scoped>
.chart-canvas {
  width: 100%;
  height: auto;
  border: 1px solid #ccc; /* Thêm viền cho canvas */
  border-radius: 5px; /* Bo góc cho canvas */
  margin-top: 20px; /* Tạo khoảng cách trên cùng */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Thêm shadow cho canvas */
}
</style>
