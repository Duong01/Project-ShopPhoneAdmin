<template>
  <div class="container" v-loading="this.$store.state.isLoading">
    <select v-model="selectedMonth" @change="getDataByMonth" class="custom-select">
      <option v-for="(month, index) in months" :key="index" :value="index+1">{{ month }}</option>
    </select>
    <br>
    <br>
    <h5 style="color: red; border: 1px solid #ccc; width:auto; height:70px; line-height: 70px; background-color: #dddd;">Tổng doanh thu tháng này: {{ total.toLocaleString() }}vnđ</h5>
    <h2 class="">{{$t('Doanh thu')}}</h2>
    <p v-if="length">{{ text }}</p>
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
      total: 0,
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
      length: false,
      text: '',
      selectedMonth: null,
      months: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"]
    };
  },
  mounted() {
    this.selectedMonth = new Date().getMonth() + 1;
    this.getAll();
  },

  methods: {
    getDataByMonth(){
      this.getAll()
    },
    getAll() {
      axios
        .get(`http://localhost:8181/api/order/statusandmonth?status=Success&month=${this.selectedMonth}`)
        .then((res) => {
          if (res.data != null && res.status == 200) {
            this.chartData.datasets[0].data = res.data.map(item => item.price);
            this.chartData.labels = res.data.map(item => item.produuctName)
            this.$store.state.isLoading = false;
            this.total = res.data.map(item => item.price).reduce((total, amount) => total + amount, 0)
            if(res.data.length == 0){
              this.length = true
              this.text = 'Không có dữ liệu'
            }
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

<style scoped>
.custom-select {
  padding: 8px 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
}
</style>
