<template>
   <div class="container-fluid">
    <div class="row">
      <div class="col-lg-5">
        <Employee />
      </div>
      <div class="col-lg-7">
        <pie-chart />
      </div>
    </div>
  </div>
</template>

<script>
import Employee from "@/pages/Employee";
import PieChart from "@/pages/PieChart";
export default {
  name: "HomePage",
  data() {
    return {};
  },
  components: {
    Employee,
    PieChart,
  },
};
</script>
<style scoped>
.container-fluid{
  margin-top: 20px;
}
</style>
