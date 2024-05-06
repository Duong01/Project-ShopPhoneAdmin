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
      <div class="nav_right">
        <el-input
          v-model="searchQuery"
          style="width: 600px; border-radius: 10px"
          clearable
          placeholder="Search"
          class="input-with-select"
        >
          <template #prepend>
            <el-button
              type="primary"
              style="background-color: #409eff; color: #fff"
              @click="search"
            >
              <el-icon style="vertical-align: middle">
                <Search />
              </el-icon>
              <span style="vertical-align: middle">
                {{ $t("Tìm kiếm") }}
              </span>
            </el-button>
          </template>
        </el-input>
      </div>
    </div>
    <el-table
      :data="displayedProducts"
      border
      style="width: 100%"
      id="my-table"
      v-loading="this.$store.state.isLoading"
    >
      <el-table-column prop="id" label="Mã" width="50" />
      <el-table-column prop="name" label="Tên sản phẩm" width="180" />
      <el-table-column prop="originalPrice" label="Giá gốc" width="120">
        <template v-slot="scope">
          {{ Number(scope.row.originalPrice).toLocaleString() }}đ
        </template>
      </el-table-column>
      <el-table-column prop="promotionPrice" label="Giảm giá" width="120" >
        <template v-slot="scope">
          {{ Number(scope.row.promotionPrice).toLocaleString() }}đ
        </template>
      </el-table-column>
      <el-table-column prop="image" label="Hình ảnh" width="120" >
        <template v-slot="scope">
          <img
            :src="`http://localhost:8085/Files/${scope.row.image}`"
            alt="Hình ảnh"
            style="max-width: 100px; max-height: 100px"
          />
        </template>
      </el-table-column>
      <el-table-column prop="createdBy" label="Tạo bởi" width="100" />
      <el-table-column prop="createdDate" label="Ngày tạo" width="100" />
      <el-table-column prop="cateId" label="Mã danh mục" width="100" />
      <el-table-column prop="qty" label="Số lượng" width="100" />
      <el-table-column prop="des" label="Miêu tả" width="200" />
      <el-table-column prop="status" label="Star" width="100" />
      <el-table-column prop="soldCount" label="Số lượng bán" width="100" />
      <el-table-column fixed="right" label="Thao tác" width="150">
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
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 30, 40]"
      background
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!-- Add new -->
    <el-dialog
      v-model="dialogFormVisible"
      title="Add new Product"
      width="800px"
    >
      <el-form require="true" :model="form">
        <el-form-item label="Name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="OriginalPrice" :label-width="formLabelWidth">
          <el-input-number
            v-model="form.OriginalPrice"
            class="mx-4"
            controls-position="right"
            :min="0"
            :step="1"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="PromotionPrice" :label-width="formLabelWidth">
          <el-input-number
            v-model="form.PromotionPrice"
            class="mx-4"
            controls-position="right"
            :min="0"
            :step="1"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="Image" :label-width="formLabelWidth">
          <input
            accept="image/*"
            @change="previewFiles($event)"
            ref="clickSave"
            name="image"
            type="file"
          />
          <br />
          <img
            width="100"
            height="100"
            class="media-object"
            :src="newImage"
            alt=""
          />
        </el-form-item>
        <el-form-item label="Categories" :label-width="formLabelWidth">
          <el-select
            @change="changeLocation"
            v-model="form.selected"
            placeholder="Please select a categoris"
          >
            <el-option
              v-for="option in options"
              :key="option.id"
              :value="option.id"
            >
              {{ option.name }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Qty" :label-width="formLabelWidth">
          <el-input-number v-model="form.Qty" :min="0" />
        </el-form-item>
        <el-form-item label="Describe" :label-width="formLabelWidth">
          <el-input v-model="form.des" autocomplete="off" />
        </el-form-item>
        <el-form-item label="SoldCount" :label-width="formLabelWidth">
          <el-input-number
            disabled
            v-model="form.soldCount"
            :min="0"
            :step="1"
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
          <el-input v-model="form.nameUpdate" autocomplete="off" />
        </el-form-item>
        <el-form-item label="OriginalPrice" :label-width="formLabelWidth">
          <el-input-number
            v-model="OriginalPriceUpdate"
            class="mx-4"
            controls-position="right"
            :min="0"
            :step="1"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="PromotionPrice" :label-width="formLabelWidth">
          <el-input-number
            v-model="PromotionPriceUpdate"
            class="mx-4"
            controls-position="right"
            :min="0"
            :step="1"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="Image" :label-width="formLabelWidth">
          <input
            accept="image/*"
            @change="previewFiles($event)"
            ref="clickSaveEdit"
            name="image"
            type="file"
          />
          <br />
          <img
            width="100"
            height="100"
            class="media-object"
            :src="newImage"
            alt=""
          />
        </el-form-item>
        <el-form-item label="Categories" :label-width="formLabelWidth">
          <el-select
            @change="changeLocation"
            v-model="cateIdUpdate"
            placeholder="Please select a categoris"
          >
            <el-option
              v-for="option in options"
              :key="option.id"
              :value="option.id"
            >
              {{ option.name }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Qty" :label-width="formLabelWidth">
          <el-input-number v-model="QtyUpdate" :min="0" :step="1" />
        </el-form-item>
        <el-form-item label="Describe" :label-width="formLabelWidth">
          <el-input v-model="desUpdate" autocomplete="off" />
        </el-form-item>
        <el-form-item label="SoldCount" :label-width="formLabelWidth">
          <el-input-number
            disabled
            v-model="soldCountUpdate"
            :min="0"
            :step="1"
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
  name: "ProductManagement",
  data() {
    return {
      searchQuery: '',
      currentPage: 1,
      pageSize: 10,
      total: 0,
      Products: [],
      dialogFormVisible: false,
      showupdate: false,
      formLabelWidth: "140px",
      cateIdUpdate: null,
      form: {
        id: "",
        name: "",
        nameUpdate: "",
        OriginalPrice: "",
        PromotionPrice: "",
        cateId: "",
        Image: "",
        Qty: 0,
        des: "",
        soldCount: 0,
        selected: null,
      },
      newImage: "",
      options: [],
      timenow: "",
      selectedFile: null,
      url: null,
    };
  },
  created() {
    this.getAll(), this.changeLocation(), this.getNow();
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1; // Reset lại trang về 1 khi thay đổi kích thước trang
      this.getAll();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getAll;
    },
    search(){
      const encodedProductName = encodeURIComponent(this.searchQuery)
      axios.get(`http://localhost:8181/api/products/searchproduct?name=${encodedProductName}`)
      .then(res =>{
        if(res.status == 200){
          this.Products = res.data;
        }
      })
      .catch(() =>{});
      axios.get(`http://localhost:8181/api/products/searchproductbyId?id=${encodedProductName}`)
      .then(res =>{
        if(res.status == 200){
          this.Products = res.data;
        }
      })
      .catch(() =>{})
    },
    changeLocation() {
      axios.get("http://localhost:8181/api/categories/listcate").then((res) => {
        this.options = res.data;
      });
    },
    TestPostFile() {
      let formObj = { YourName: "tuyen", age: 20, address: "BN VN" };
      var formData = new FormData();
      formData.append("dataForm", btoa(JSON.stringify(formObj)));

      formData.append("image", this.$refs.TestPostFile.files[0]);
      axios.post("http://localhost:8181/api/products/TestPostFile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    getNow() {
      var today = new Date();
      var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      var time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date + "T" + time;
      this.timenow = dateTime;
    },
    getAll() {
      try {
        axios
          .get("http://localhost:8181/api/products/listproduct")
          .then((res) => {
            this.Products = res.data;
            this.total = res.data.length;
            this.$store.state.isLoading = false;
          });
      } catch (error) {
        console.error("Error loading data:", error);
      }
      this.$store.state.isLoading = true;
    },
    previewFiles(event) {
      this.selectedFile = event.target.files[0];
      this.url = URL.createObjectURL(this.selectedFile);
      const theRender = new FileReader();
      theRender.onloadend = async () => {
        this.newImage = await theRender.result;
      };
      theRender.readAsDataURL(this.selectedFile);
    },
    clickSave() {
      if (
        this.form.name == "" ||
        this.selectedFile == null ||
        this.form.selected == null
      ) {
        ElMessage({
          message: "Please check data.",
          grouping: true,
          type: "error",
        });
      } else {
        let formObj = { a: "Duong", address: "BG VN" };
        var formData = new FormData();
        formData.append("dataForm", btoa(JSON.stringify(formObj)));

        formData.append("image", this.$refs.clickSave.files[0]);

        axios.post(
          "http://localhost:8181/api/products/TestPostFile",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        axios
          .post(`http://localhost:8181/api/products/insertproduct`, {
            name: this.form.name,
            originalPrice: this.form.OriginalPrice,
            promotionPrice: this.form.PromotionPrice,
            image: this.selectedFile.name,
            createdBy: this.getEmpInfor,
            createdDate: this.timenow,
            cateId: this.form.selected,
            qty: this.form.Qty,
            des: this.form.des,
            status: 1,
            soldCount: this.form.soldCount,
          })
          .then((res) => {
            if (res.status == 200 && res.data == "ok") {
              alert("Add success");
              this.dialogFormVisible = false;
              this.getAll();
            }
            if (res.data == "Da co san pham nay") {
              alert("Da co san pham nay");
            }
          })
          .catch((err) => {
            alert(err);
          });
      }
    },
    clickUpdate() {
      if (
        this.nameUpdate == "" ||
        this.selectedFile == null ||
        this.cateIdUpdate == null
      ) {
        ElMessage({
          message: "Please check data.",
          grouping: true,
          type: "error",
        });
      } else {
        let formObj1 = {
          name: this.form.nameUpdate,
          originalPrice: this.OriginalPriceUpdate,
          promotionPrice: this.PromotionPriceUpdate,
          image: this.selectedFile.name,
          createdBy: this.getEmpInfor,
          createdDate: this.timenow,
          cateId: this.cateIdUpdate,
          qty: this.QtyUpdate,
          des: this.desUpdate,
          status: 1,
          soldCount: this.soldCountUpdate,
        };
        var formData1 = new FormData();

        formData1.append("dataForm", btoa(JSON.stringify(formObj1)));
        formData1.append("image", this.$refs.clickSaveEdit.files[0]);

        axios
          .post("http://localhost:8181/api/products/TestPostFile", formData1, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then({})
          .catch((err) => {
            console.log(err);
          });
        axios
          .post(`http://localhost:8181/api/products/updateproduct`, {
            id: this.id,
            name: this.form.nameUpdate,
            originalPrice: this.OriginalPriceUpdate,
            promotionPrice: this.PromotionPriceUpdate,
            image: this.selectedFile.name,
            createdBy: this.getEmpInfor,
            createdDate: this.timenow,
            cateId: this.cateIdUpdate,
            qty: this.QtyUpdate,
            des: this.desUpdate,
            status: 1,
            soldCount: this.soldCountUpdate,
          })
          .then((res) => {
            if (res.data == "Sua thanh cong" && res.status == 200) {
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
    isDelete(product) {
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
              `http://localhost:8181/api/products/deleteproduct?id=${product.id}`
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
      this.id = item.id;
      this.form.nameUpdate = item.name;
      (this.OriginalPriceUpdate = item.originalPrice),
        (this.PromotionPriceUpdate = item.promotionPrice),
        (this.cateIdUpdate = item.cateId),
        (this.QtyUpdate = item.qty),
        (this.desUpdate = item.des),
        (this.soldCountUpdate = item.soldCount);
    },
  },
  computed: {
    getEmpInfor() {
      let emp = JSON.parse(localStorage["us"]);
      if (emp != undefined) return emp.id;
      return "";
    },
    totalPages() {
      return Math.ceil(this.total / this.pageSize);
    },
    displayedProducts() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.Products.slice(startIndex, endIndex);
    },
  },
};
</script>

<style scoped>
.el-input-group {
  display: inline-flex;
  width: 100%;
  flex-direction: row-reverse;
  margin-left: 30px;
}
.nav_right, .nav_left{
  margin: 10px;
}
</style>
