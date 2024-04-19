<template>
  <div class="container mt-5">
      <h2 class="mb-4 text-center">Vue 3 Vuechart Js 5 Line Chart Example</h2>
      <Pie id="my-chart-id" :options="chartOptions" :data="chartData" />
      <p>{{ chartData.datasets.data }}</p>
  </div>
</template>

<script>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import axios from 'axios'
ChartJS.register(ArcElement, Tooltip, Legend)

export default {
    name: 'PieChart',
    components: { Pie },
    data() {
        return {
            chartData: {
                labels: ['aaa','bbbb'],
                datasets: [
                    {
                        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                        data: [10,20,30]
                    }
                ]
            },
            chartOptions: {
                responsive: true,
            },

        }
    },
    created(){
        this.getAll()
    },
    methods: {
        getAll(){
            axios.get(`http://localhost:8181/api/order/ordersuccess?status=Success`)
            .then(res => {
                if(res.data != null && res.status == 200){
                    this.chartData.datasets.data == res.data
                    
                }
            })
        }
    }
}
</script>

<style scoped>

</style>