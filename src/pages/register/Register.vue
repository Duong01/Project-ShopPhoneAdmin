<template>
  <main role="main" v-if="aaaaa">
    <!-- Block content - Đục lỗ trên giao diện bố cục chung, đặt tên là `content` -->
    <div class="container mt-4">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card mx-4">
            <div class="card-body p-4">
              <el-form
                label-width="auto"
                style="max-width: 600px"
              >
                <h1>Đăng ký</h1>
                <p class="text-muted">Tạo tài khoản</p>
                <div class="input-group mb-3">
                  <el-form-item label="Email">
                    <el-input
                      style="width: 400px"
                      placeholder="Email"
                      v-model="email"
                      clearable
                    />
                  </el-form-item>
                </div>
                <div class="input-group mb-3">
                  <el-form-item label="Password">
                    <el-input
                      style="width: 400px"
                      placeholder="Password"
                      type="password"
                      v-model="password"
                      clearable
                    />
                  </el-form-item>
                </div>
                <div class="input-group mb-3">
                  <el-form-item label="Full name">
                    <el-input
                      style="width: 400px"
                      placeholder="Full name"
                      v-model="fullname"
                      clearable
                    />
                  </el-form-item>
                </div>
                <div class="input-group mb-3">
                  <el-form-item label="Gender">
                    <el-select
                      v-model="sex"
                      placeholder="Please select your gender"
                      style="width: 400px"
                    >
                      <el-option label="Nam" value="Nam" />
                      <el-option label="Nữ" value="Nữ" />
                    </el-select>
                  </el-form-item>
                </div>
                <div class="input-group mb-3">
                  <el-form-item label="Address">
                    <!-- city -->
                    <el-select
                      v-model="selectedCityId"
                      placeholder="Select City"
                      style="width: 150px"
                    >
                      <el-option
                        v-for="city in cities"
                        :key="city.Id"
                        :value="city.Id"
                        :label="city.Name"
                      />
                    </el-select>

                    <!-- district -->
                    <el-select
                      v-model="selectedDistrictId"
                      placeholder="Select District"
                      style="width: 150px"
                      v-if="selectedCityId"
                    >
                      <el-option
                        v-for="district in selectedCity.Districts"
                        :key="district.Id"
                        :value="district.Id"
                        :label="district.Name"
                      />
                    </el-select>
                    <!-- ward -->
                    <el-select
                      v-model="selectedWardId"
                      placeholder="Select Ward"
                      style="width: 150px"
                      v-if="selectedDistrictId"
                    >
                      <el-option
                        v-for="ward in selectedDistrict.Wards"
                        :key="ward.Id"
                        :value="ward.Id"
                        :label="ward.Name"
                      />
                    </el-select>

                    <el-input
                      v-if="selectedWardId"
                      v-model="street"
                      style="width: 400px"
                      clearable
                      placeholder="Street name, house number"
                    />
                  </el-form-item>

                  <br />
                  <div
                    class="input-group mb-3"
                    v-if="selectedCity && selectedDistrict && selectedWard"
                  >
                    <el-form-item label=" ">
                      <el-input
                        style="width: 400px"
                        readonly
                        :value="
                          selectedWard.Name +
                          ' - ' +
                          selectedDistrict.Name +
                          ' - ' +
                          selectedCity.Name
                        "
                      />
                    </el-form-item>
                  </div>
                </div>
                <div class="input-group mb-3">
                  <el-form-item label=" Date of Birth">
                    <el-col :span="11">
                      <el-date-picker
                        v-model="dob"
                        style="width: 400px"
                        type="date"
                        placeholder="Date of birth"
                      />
                    </el-col>
                  </el-form-item>
                </div>
                <div class="input-group mb-3">
                  <el-form-item label="Phone">
                    <el-input
                      style="width: 400px"
                      placeholder="Phone number"
                      v-model="phone"
                      clearable
                    />
                  </el-form-item>
                </div>
                <button
                  @click="register"
                  class="btn btn-block btn-success"
                  name="btnDangKy"
                  type="button"
                >
                  Tạo tài khoản
                </button>
              </el-form>
            </div>
            <div class="card-footer p-4">
              <div class="row">
                <div class="col-12">
                  <center>Nếu bạn đã có Tài khoản, xin mời Đăng nhập</center>
                  <router-link
                    :to="{ name: 'login', params: {} }"
                    class="btn btn-primary form-control"
                  >
                    Đăng nhập</router-link
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <main v-else>
    <p>Bạn đã có tài khoản</p>
  </main>
</template>

<script>

import { ElMessage } from "element-plus";
import axios from "axios";
export default {
  name: "RegisTer",
  data() {
    return {
      sex: "",
      email: "",
      fullname: "",
      dob: "",
      password: "",
      address: "",
      cities: [],
      districts: [],
      wards:[],
      street: "",
      phone: '',
      selectedCityId: null,
      selectedDistrictId: null,
      selectedWardId: null,
    };
  },
  mounted() {
    this.fetchCities();
  },
  methods: {
    fetchCities() {
      axios
        .get(
          "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
        )
        .then((response) => {
          this.cities = response.data;
        })
        .catch((error) => {
          console.error("Error fetching cities:", error);
        });
    },
    register() {
      
      if (!this.checkEmail() || !this.checkPass() || !this.checkName() || !this.checkGender() || !this.checkAddress()
      || !this.checkPhone()  || !this.checkDob()) {
        //
      } else {
        const selectedCity = this.cities.find(city => city.Id === this.selectedCityId);
      const cityName = selectedCity ? selectedCity.Name : '';
      const selectedDistrict = this.selectedCity.Districts.find(district => district.Id === this.selectedDistrictId);
      const DistrictName = selectedDistrict ? selectedDistrict.Name : '';
      const selectedWard = this.selectedDistrict.Wards.find(ward => ward.Id === this.selectedWardId);
      const WardName = selectedWard ? selectedWard.Name : '';
        axios
          .post(`http://localhost:8181/api/user/insertUser`, {
            email: this.email,
            fullname: this.fullname,
            dob: this.dob,
            password: this.password,
            role_id: 2,
            status: 1,
            phone: this.phone,
            address:this.street +' - '+ WardName +' - '+ DistrictName +' - '+ cityName,
          })
          .then((res) => {
            if (res.status == 200 && res.data == true) {
              ElMessage({
                message: "egister successR.",
                grouping: true,
                type: "success",
              });
              this.$router.push("/login");
            }
            if(res.status == 200 && res.data == false){
              ElMessage({
                message: "Registered email.",
                grouping: true,
                type: "error",
              });
            }
          })
          .catch((err) => {
            alert(err);
          });
      }
    },
    // Check email
    checkEmail() {
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
      if (!emailRegex.test(this.email)) {
        ElMessage({
          message: "Email Fail, check again!.",
          grouping: true,
          type: "error",
        });
        return false;
      }
      return true;
    },

    // check password
    checkPass() {
      if (this.password.length < 6) {
        ElMessage({
          message: "Length Password > 6!.",
          grouping: true,
          type: "error",
        });
        return false;
      }
      return true;
    },

    // Check Name
    checkName() {
      if (this.fullname.trim() == "") {
        ElMessage({
          message: "Name Fail, check again!.",
          grouping: true,
          type: "error",
        });
        return false;
      }
      return true;
    },
    // Check gender
    checkGender() {
      if (this.sex== "") {
        ElMessage({
          message: "Gender Fail, check again!.",
          grouping: true,
          type: "error",
        });
        return false;
      }
      return true;
    },
    // Check Address
    checkAddress() {
      if (this.selectedCityId == null) {
        ElMessage({
          message: "City Fail, check again!.",
          grouping: true,
          type: "error",
        });
        return false;
      }
      else if(this.selectedDistrictId == null){
        ElMessage({
          message: "District Fail, check again!.",
          grouping: true,
          type: "error",
        });
      }
      else if(this.selectedWardId == null){
        ElMessage({
          message: "Ward Fail, check again!.",
          grouping: true,
          type: "error",
        });
      }
      else if(this.street == ""){
        ElMessage({
          message: "Street Fail, check again!.",
          grouping: true,
          type: "error",
        });
      }
      return true;
    },

    // CheckPhone
    checkPhone() {
      const phoneRegex = /^\d{10,}$/;
      if (this.phone == "") {
        ElMessage({
          message: "Phone Number not null, check again!.",
          grouping: true,
          type: "error",
        });
        return false;
      }
      else if(!this.phone.match(phoneRegex)){
        ElMessage({
          message: "Phone number must be number, check again!.",
          grouping: true,
          type: "error",
        });
      }
      return true;
    },

    // Check dob
    checkDob() {
      if (this.dob== "") {
        ElMessage({
          message: "Dob Fail, check again!.",
          grouping: true,
          type: "error",
        });
        return false;
      }
      return true;
    },
  },
  computed: {
    aaaaa() {
      return localStorage.getItem("us") == undefined;
    },
    selectedCity() {
      return this.cities.find((city) => city.Id === this.selectedCityId);
    },
    selectedDistrict() {
      if (this.selectedCity) {
        return this.selectedCity.Districts.find(
          (district) => district.Id === this.selectedDistrictId
        );
      }
      return null;
    },
    selectedWard() {
      if (this.selectedDistrict) {
        return this.selectedDistrict.Wards.find(
          (ward) => ward.Id === this.selectedWardId
        );
      }
      return null;
    },
  },
};

// Address
</script>
<style scoped>
.login {
  border: 1px solid #ccc;
  width: 300px;
  height: 700px;
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
}
.el-input__wrapper {
  width: 400px;
}
.el-select__wrapper {
  width: 400px;
}
</style>
