<template>
    <div class="slider">
        <div class="admin-right">
          <Employee/>
        </div>
    </div>
</template>

<script>
import Employee from '@/pages/Employee'
export default {
  name: 'HomePage',
  data () {
    return {
    }
  },
  components: {
    Employee
  }
}
</script>
<style scoped>
.admin-right{
  width: 100%;
  min-height: 100px;
  float: left;
}
.list{
  margin: 10px 0;
}
.carousel-inner{
  width: 1500px;
  height: 500px;
  align-content: center;
}
h4{
  text-align: center;
  margin: 10px 0;
}
</style>
