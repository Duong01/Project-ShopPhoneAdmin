<template>
  <div class="login">
    <h3 class="container" style="text-align:center">Login</h3>
    <form action="">
      <div class="form-group container">
        <label for="emailInput">Email</label>
        <input type="text" id="emailInput" class="form-control" required placeholder="Email" :email="email" v-model="email">
      </div>
      <div class="form-group container">
        <label for="emailInput">Password</label>
        <input type="password" id="password" class="form-control" required v-model="password">
      </div>
      <p style="color:red; text-align:center"><i >{{mess}}</i></p>
      <div class="form-group container">
        <button type="button" class="btn btn-primary container" @click="login">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      mess:''
    }
  },
  methods: {
    login() {
    axios.post(`http://localhost:8181/api/user/login`,{email:this.email,password:this.password})
    .then(result => {
      let us = {
        id: result.data.id,
        email: result.data.email,
        fullname: result.data.fullname,
        dob: result.data.dob, 
        password: result.data.password,
        role_id: result.data.role_id,
        status: result.data.status,
        address: result.data.address
      }
      localStorage.setItem('us',JSON.stringify(us))
      if(result.status === 200) {
        this.$store.commit("setEmpInfor",us)
        if(result.data.role_id == 1){
          this.$router.push('/home')
        }
        }
        console.log(us)
      result.request.timeout = 1
    })
    .catch((er)=>
    {
      alert(er);
    }
    )
    }
    
  }
}

</script>
<style scoped>
.login{
  border: 1px solid #ccc;
  width: 330px;
  height: 350px;
  position: absolute;
  left: 50%;
  top:40%;
  transform: translate(-50%,-50%);
  border-radius: 10px;
}
label {
  float: left;
}
</style>
