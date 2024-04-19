<template>
  <div class="cart">
    <div class="nav">
      <div class="nav_left">
        <button
          style="float: left"
          type="button"
          class="btn btn-primary"
          @click="dialogFormVisible = true"
        >
          Add New
        </button>
      </div>
    </div>
      <el-table
        :data="categories"
        border
        align="center"
        style="width: 100%"
        id="my-table"
        v-loading="this.$store.state.isLoading"
      >
        <el-table-column prop="id" label="ID" width="120" />
        <el-table-column prop="name" label="Name" width="120" />
        <el-table-column prop="status" label="Status" width="120" />
        <el-table-column fixed="right" label="Operations" width="150">
          <template v-slot="scope">
            <el-tooltip content="Edit" placement="top">
              <el-button
                link
                type="warning"
                @click="isUpdate(scope.row), (showupdate = true)"
                ><el-icon><Edit /></el-icon
              ></el-button>
            </el-tooltip>
            <el-tooltip content="Delete" placement="top">
              <el-button plain link type="danger" @click="isDelete(scope.row)"
                ><el-icon><Delete /></el-icon
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <br>
      <el-pagination
      align="center"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5,10,15]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      />
    <!-- Add -->
    <el-dialog
      v-model="dialogFormVisible"
      title="Add new Categoris"
      width="800px"
    >
      <el-form require="true" :model="form">
        <el-form-item label="Name" :label-width="formLabelWidth">
          <el-input v-model="name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Status" :label-width="formLabelWidth">
          <el-input-number
            v-model="status"
            :min="0"
            :max="1"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button :plain="true" type="primary" @click="clickSave">
            Add
          </el-button>
        </div>
      </template>
    </el-dialog>

    <!-- Update -->
    <el-dialog v-model="showupdate" title="Update Product" width="800px">
      <el-form :model="form">
        <el-form-item label="Id" :label-width="formLabelWidth">
          <el-input disabled v-model="id" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Name" :label-width="formLabelWidth">
          <el-input v-model="nameUpdate" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Status" :label-width="formLabelWidth">
          <el-input-number
            v-model="statusUpdate"
            :min="0"
            :max="1"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="showupdate = false">Cancel</el-button>
          <el-button :plain="true" type="primary" @click="clickUpdate">
            Save
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ElMessage, ElMessageBox } from "element-plus";

import axios from "axios";
export default {
  name: "CategoriesManagement",
  data() {
    return {
      currentPage: 0,
      pageSize: 5,
      total: 30,
      dialogFormVisible: false,
      showupdate: false,
      formLabelWidth: "140px",
      categories: [],
      id: "",
      status: 1,
      name: "",
      nameUpdate: "",
    };
  },
  created() {
    // this.getAll();
  },
  mounted() {
    this.getAll();
  },
  methods: {

    handleSizeChange(val) {
      this.pageSize = val;
      this.getAll();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getAll();
    },
    getAll() {
      try {
        axios.get(`http://localhost:8181/api/categories/listallcate?offset=${this.currentPage}&limit=${this.pageSize}`)
        .then(response => {
        this.categories = response.data;
        console.log(response)
        // this.total = response.data.length;
        this.$store.state.isLoading = false;
      })
      } catch (error) {
        console.error('Error loading data:', error);
      }
      this.$store.state.isLoading = true;
      
    },
    clickSave() {
      if (this.name == "" || this.status == "") {
        ElMessage({
          message: "Please check data.",
          grouping: true,
          type: "error",
        });
      } else {
        axios
          .post(`http://localhost:8181/api/cate/insertcate`, {
            name: this.name,
            status: 1,
          })
          .then((res) => {
            if (res.status == 200) {
              alert("Add success");
              this.dialogFormVisible = false;
              this.getAll();
            }
          })
          .catch((err) => {
            alert(err);
          });
      }
    },
    clickUpdate() {
      if (this.name == "" || this.status == "") {
        ElMessage({
          message: "Please check data.",
          grouping: true,
          type: "error",
        });
      } else {
        axios
          .post(`http://localhost:8181/api/cate/updatecate`, {
            id: this.id,
            name: this.nameUpdate,
            status: this.status,
          })
          .then((res) => {
            if (res.data == true && res.status == 200) {
              alert("Update Success");
              this.showupdate = false;
              this.getAll();
            } else {
              alert("Update Fail");
              this.getAll();
            }
          })
          .catch((err) => {
            alert(err);
          });
      }
    },
    isDelete(categories) {
      ElMessageBox.confirm(
        "Are you sure you want to delete. Continue?",
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(() => {
          axios
            .delete(
              `http://localhost:8181/api/cate/deletecate?id=${categories.id}`
            )
            .then((res) => {
              if (res.data == true && res.status == 200) {
                ElMessage({
                  type: "success",
                  message: "Delete completed",
                });
                this.getAll();
              } else {
                ElMessage({
                  type: "info",
                  message: "Delete Fail",
                });
                this.getAll();
              }
            });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Delete canceled",
          });
        });
    },
    isUpdate(item) {
      this.nameUpdate = item.name;
      this.statusUpdate = item.status;
      this.id = item.id;
    },
  },
};
</script>

<style scoped>
.nav {
  display: block;
  margin-top: 10px;
}
.nav_left {
  float: left;
  margin: 0 10px;
}
.nav_right {
  float: left;
  margin: 0 10px;
}
th {
  text-align: center;
}
</style>
