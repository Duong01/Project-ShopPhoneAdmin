<template>
  <div class="container" v-loading="this.$store.state.isLoading">
    <h2 class="">{{$t('Doanh thu')}}</h2>
    <Pie class="chart center" v-for="item in chartData" :key="item" :options="chartOptions" :data="chartData" />
  </div>
</template>

<script>
import { Pie  } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";
// import PieChart from "./PieChart.vue";
ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  name: "PieChart",
  components: { Pie },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
            data: [],
          },
        ],
      },
      chartOptions: {
        responsive: true,
      },
    };
  },
  mounted() {
    this.getAll();
  },
  methods: {
    getAll() {
      axios
        .get(`http://localhost:8181/api/order/ordersuccess?status=Success`)
        .then((res) => {
          if (res.data != null && res.status == 200) {
            this.chartData.datasets[0].data = res.data.map(item => item.price);
            this.chartData.labels = res.data.map(item => item.produuctName)
            this.$store.state.isLoading = false;
          }
        })
        .catch(error => {
          console.error("Error fetching chart data:", error);
        });
        this.$store.state.isLoading = true;
    },
    
  },
};
</script>

<style scoped></style>
