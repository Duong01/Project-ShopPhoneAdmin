<template>
  <main role="main" v-loading="this.$store.state.isLoading = false" v-if="show">
    <!-- Block content - Đục lỗ trên giao diện bố cục chung, đặt tên là `content` -->
    <form
      name="frmdangnhap"
      id="frmdangnhap"
      method="post"
      @submit.prevent="login"
    >
      <div class="container mt-4">
        <div class="row justify-content-center">
          <div class="col-md-8">
            <div class="card-group">
              <div class="card p-4">
                <el-page-header @back="goBack">
                  <template #content>
                    <span class="text-large font-600 mr-3"> Home </span>
                  </template>
                </el-page-header>
                <div class="card-body">
                  <h1>Đăng nhập</h1>
                  <p class="text-muted">Nhập thông tin Tài khoản</p>
                  <div class="input-group mb-3">
                    <input
                      class="form-control"
                      type="text"
                      name="username"
                      v-model="email"
                      required
                      placeholder="Email"
                    />
                  </div>
                  <div class="input-group mb-4">
                    <input
                      class="form-control"
                      type="password"
                      name="password"
                      autocomplete=""
                      v-model="password"
                      required
                      placeholder="Mật khẩu"
                    />
                  </div>
                  <div class="input-group mb-5">
                    <!-- <div class="captcha">
                      <span v-if="captcha" class="captcha-text">{{ captcha }}</span>
                      <button @click="generateCaptcha" class="generate-button">
                        Generate New CAPTCHA
                      </button>
                    </div> -->
                    <div class="verification">
                      <input
                        class="input-field"
                        v-model="userInput"
                        type="text"
                        placeholder="Enter CAPTCHA"
                      />
                      <div class="captcha">
                        <span v-if="captcha" class="captcha-text">{{
                          captcha
                        }}</span>
                        <img
                          class="generate-button"
                          @click="generateCaptcha"
                          src="../../assets/recapcha.png"
                          alt=""
                        />
                        <!-- <button
                          type="button"
                          
                          
                        >
                          Generate New CAPTCHA
                        </button> -->
                      </div>
                      <!-- <button @click="verifyCaptcha" class="verify-button">
                        Verify
                      </button> -->
                    </div>
                    <span
                      v-if="verificationResult !== null"
                      class="verification-message"
                      >{{ verificationResult }}</span
                    >
                  </div>
                  <div class="row">
                    <div class="col-6">
                      <button class="btn btn-primary px-4" name="btnDangNhap">
                        Đăng nhập
                      </button>
                    </div>
                    <div class="col-6 text-right">
                      <el-popover
                        placement="bottom"
                        :width="200"
                        trigger="click"
                        content="Please contact support team"
                      >
                      <template #reference>
                        <button class="btn btn-link px-0" type="button">
                          Quên mật khẩu?
                        </button>
                        </template>
                      </el-popover>
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="card text-white bg-primary py-5 d-md-down-none"
                style="width: 44%"
              >
                <div class="card-body text-center">
                  <div>
                    <h2>Đăng ký</h2>
                    <p>
                      Đăng ký để làm thành viên của Trang web bán hàng. Bạn sẽ
                      được một số quyền lợi nhất định khi làm thành viên của
                      Chúng tôi.
                    </p>
                    <router-link
                      :to="{ name: 'register', params: {} }"
                      class="btn btn-primary active mt-3"
                    >
                      Đăng ký</router-link
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </main>
  <main v-else>
    <p>Bạn đã đăng nhập</p>
  </main>
</template>

<script>
import { ElMessage } from "element-plus";
import axios from "axios";
export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      mess: "",
      captcha: "",
      userInput: "",
      verificationResult: null,
    };
  },
  mounted() {
    this.generateCaptcha(); // Generate CAPTCHA when the component is mounted
  },
  methods: {
    generateRandomString(length) {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let result = "";
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      return result;
    },
    generateCaptcha() {
      this.captcha = this.generateRandomString(6); // Generate a 6-character random string
      this.userInput = ""; // Clear user input field
      this.verificationResult = null; // Clear verification result
    },
    // verifyCaptcha() {
    //   if (this.userInput === this.captcha) {
    //     this.verificationResult = "CAPTCHA verified successfully!";
    //   } else {
    //     this.verificationResult =
    //       "CAPTCHA verification failed. Please try again.";
    //   }
    // },
    goBack() {
      this.$router.push("/home");
    },
    login() {
      if (this.email == null || this.password == null) {
        alert("Vui lòng nhập đầy đủ email và password");
      }
      if (this.userInput === this.captcha) {
        axios
          .post(`http://localhost:8181/api/user/login`, {
            email: this.email,
            password: this.password,
          })
          .then((result) => {
            let us = {
              id: result.data.id,
              email: result.data.email,
              fullname: result.data.fullname,
              dob: result.data.dob,
              password: result.data.password,
              role_id: result.data.role_id,
              status: result.data.status,
              address: result.data.address,
            };
            
            if (result.status == 200) {
              if(result.data.status == 1){
                  localStorage.setItem("us", JSON.stringify(us));
                  ElMessage({
                    message: "Login Success",
                    type: "success",
                  });
                this.$store.commit("setEmpInfor", us);
                this.$router.push("/home");
              } else {
                ElMessage.error("Fail email or password");
              }
            }
            else{
              ElMessage({
                  message: "Account has been locked",
                  type: "error",
                });
            }
          })
          .catch(() => {
            ElMessage.error("Fail email or password");
          });
      } else {
        this.verificationResult =
          "CAPTCHA verification failed. Please try again.";
      }
    },
  },
  computed: {
    show() {
      return localStorage.getItem("us") == undefined;
    },
  },
};
</script>
<style scoped>
#frmdangnhap {
  position: absolute;
  width: 100%;
  height: auto;
  left: 50%;
  top: 50%;
  /* -webkit-transform: translate(-50%, -50%); */
  transform: translate(-50%, -50%);
  border-radius: 10px;
  text-align: center;
}
.input-field[data-v-659840cf] {
  padding: 10px;
  width: 50%;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.captcha-container {
  font-family: Arial, sans-serif;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.captcha {
  margin-bottom: 20px;
}

.captcha-text {
  font-size: 24px;
  font-weight: bold;
  float: left;
  margin: 0 10px;
}

.generate-button {
  color: white;
  border: 1px solid #ccc;
  /* padding: 10px 20px; */
  cursor: pointer;
  border-radius: 5px;
  width: 40px;
  height: 40px;
}

.generate-button:hover {
  background-color: #0056b3;
}

.input-field {
  padding: 10px;
  width: 60%;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.verify-button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
}

.verify-button:hover {
  background-color: #218838;
}
.verification {
  display: flex;
  height: 40px;
}
.verification-message {
  margin-top: 10px;
  font-size: 14px;
  color: red;
}
</style>
