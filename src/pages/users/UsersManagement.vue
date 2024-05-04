<template>
  <div class="cart">
    <el-table
      :data="users"
      border
      align="center"
      style="width: 100%"
      id="my-table"
      v-loading="this.$store.state.isLoading"
    >
    <el-table-column prop="email" label="Email" width="400" />
    <el-table-column prop="fullname" label="Full Name" width="120" />
    <el-table-column prop="dob" label="Dob" width="120" />
    <el-table-column prop="password" label="Password" width="120" />
    <el-table-column prop="role_id" label="Role_id" width="120" />
    <el-table-column prop="address" label="Address" width="200" />
    <el-table-column prop="status" label="Status" width="120" />
    <el-table-column prop="captcha" label="Captcha" width="120" />
    <el-table-column fixed="right" label="Operations" width="150">
        <template v-slot="scope">
          <el-tooltip content="Lock" placement="top">
            <el-button link type="warning" :disabled="scope.row.status == 0" @click="lock(scope.row)"
              ><el-icon><Lock /></el-icon>Lock</el-button>
          </el-tooltip>
          <el-tooltip content="Unlock" placement="top">
            <el-button :disabled="scope.row.status == 1" plain link type="primary" @click="unlock(scope.row)"
              ><el-icon><Unlock /></el-icon>Open</el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script >
import axios from "axios";
import { ElMessage } from "element-plus";

export default {
  name: "UersManagement",
  data() {
    return {
      users: [],
      disable: 0
    }
  },
  created() {
    this.getAll();
  },
  methods: {
    getAll() {
        axios.get("http://localhost:8181/api/user/list")
        .then((res) => {
          this.users = res.data;
          this.list = res.data
        });
    },
    lock(item){
      axios.put(`http://localhost:8181/api/user/updateUser`,{
        id: item.id,
        email: item.email,
        fullname: item.fullname,
        dob: item.dob,
        password: item.password,
        role_id: item.role_id,
        status: 0,
        phone: item.phone,
        address: item.address,
        capcha: item.capcha
      })
      .then(res => {
        if(res.status == 200 && res.data == true){
          ElMessage({
          message: "Lock success.",
          grouping: true,
          type: "success",
          
        });
        this.getAll()
        }
      })
    },
    unlock(item){
      axios.put(`http://localhost:8181/api/user/updateUser`,{
        id: item.id,
        email: item.email,
        fullname: item.fullname,
        dob: item.dob,
        password: item.password,
        role_id: item.role_id,
        status: 1,
        phone: item.phone,
        address: item.address,
        capcha: item.capcha
      })
      .then(res => {
        if(res.status == 200 && res.data == true){
          ElMessage({
          message: "Lock success.",
          grouping: true,
          type: "success",
        });
        this.getAll()
        }
      })
    }
  }
}
</script>

<style scoped>
.nav{
  display: block;
  margin-top: 10px;
}
.nav_left{
  float: left;
  margin: 0 10px;
}
.nav_right{
  float: left;
  margin: 0 10px;
}
th{
  text-align: center;
}
</style>
