<template>
  <el-descriptions class="margin-top" title="With border" :column="1" border>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon>
            <user />
          </el-icon>
          Email
        </div>
      </template>
      {{ user.email }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon>
            <iphone />
          </el-icon>
          Full name
        </div>
      </template>
      {{ user.fullname }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon>
            <location />
          </el-icon>
          Dob
        </div>
      </template>
      {{ user.dob }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon>
            <tickets />
          </el-icon>
          Password
        </div>
      </template>

      {{ user.password }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon>
            <office-building />
          </el-icon>
          Address
        </div>
      </template>
      {{ user.address }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon>
            <office-building />
          </el-icon>
          Phone
        </div>
      </template>
      {{ user.phone }}
    </el-descriptions-item>
  </el-descriptions>
  <br />
  <el-button type="primary" @click="showDialog(user)">Edit</el-button>

  <el-dialog v-model="dialogVisible" title="Edit user" width="800px">
    <el-form>
      <el-form-item label="Email" :label-width="formLabelWidth">
        <el-input v-model="email" autocomplete="off" readonly />
      </el-form-item>
      <el-form-item label="Full name" :label-width="formLabelWidth">
        <el-input v-model="fullname" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Date of bith" :label-width="formLabelWidth">
        <el-col :span="11">
          <el-date-picker
            v-model="dob"
            style="width: 400px"
            type="date"
            placeholder="Date of birth"
          />
        </el-col>
      </el-form-item>
      <p>{{ dob }}</p>
      <el-form-item label="Password" :label-width="formLabelWidth">
        <el-input type="password" v-model="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Address" :label-width="formLabelWidth">
        <el-input v-model="address" autocomplete="off" />
      </el-form-item>
      <el-form-item label="phone" :label-width="formLabelWidth">
        <el-input v-model="phone" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button :plain="true" type="primary" @click="Edit()">
          Save
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import axios from "axios";
import { ElMessage } from "element-plus";

export default {
  name: "CapCha",
  data() {
    return {
      dialogVisible: false,
      formLabelWidth: "140px",
      user: [],
      id: "",
      email: "",
      fullname: "",
      dob: "",
      password: "",
      phone: "",
      address: "",
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    Edit() {
      (this.dialogVisible = true),
        axios
          .put(`http://localhost:8181/api/user/updateUser`, {
            id: this.id,
            email: this.email,
            fullname: this.fullname,
            dob: this.dob,
            password: this.password,
            phone: this.phone,
            address: this.address,
          })
          .then((res) => {
            console.log(res);
            if (res.status == 200 && res.data == true) {
              ElMessage({
                message: "Edit success",
                grouping: true,
                type: "success",
              });
              location.reload();
              this.dialogVisible = false;
            }
            if (res.status == 200 && res.data == false) {
              ElMessage({
                message: "Edit Fail",
                grouping: true,
                type: "error",
              });
            }
          });
    },
    getUser() {
      axios
        .get(
          `http://localhost:8181/api/user/finduserbyid?id=${this.getEmpInfor}`
        )
        .then((res) => {
          this.user = res.data;
        });
    },
    showDialog(user) {
      (this.dialogVisible = true),
        (this.email = user.email),
        (this.fullname = user.fullname),
        (this.dob = user.dob),
        (this.password = user.password),
        (this.address = user.address),
        (this.phone = user.phone),
        (this.id = user.id);
    },
  },
  computed: {
    getEmpInfor() {
      let emp = JSON.parse(localStorage["us"]);
      if (emp != undefined) return emp.id;
      return "";
    },
  },
};
</script>

<style>
/* Your CSS styles */
</style>
