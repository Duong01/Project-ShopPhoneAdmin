<template>
  <div class="home_page">
  <button style="float:left" type="button" class="btn btn-primary" @click="addnew()">Add New</button>
  <table class="table table-bordered">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Address</th>
      <th scope="col">Phone</th>
      <th scope="col">Price</th>
      <th scope="col">Description</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item, id in products" :key="id">
      <th>{{item.name}}</th>
      <th>{{item.address}}</th>
      <th>{{item.phone}}</th>
      <th>{{item.price}}</th>
      <th>{{item.description}}</th>
      <td>
        <button type="button" class="btn btn-warning" @click="isEdit(item)">Edit</button>
        <button type="button" class="btn btn-danger" @click="isDelete(item)">Delete</button>
      </td>
    </tr>
  </tbody>
</table>
<AddNew :employee="employee" @save="clickSave" v-if="isadd"></AddNew>
  </div>
</template>

<script>
import AddNew from '@/pages/AddNew'
export default {
  name: 'product_page',
  data () {
    return {
      products: [],
      isadd: false,
      employee: null
    }
  },
  created() {
    this.getAll()
  },
  methods: {
    addnew () {
      const employee = {
        id: '',
        name: '',
        address: '',
        phone: '',
        price: '',
        description: ''
      }
      this.employee = employee
      this.isadd = true
    },
    getAll() {
      this.$request.get('http://localhost:8000/api/products')
      .then( res => {
        this.products = res.data
      })
    },
    clickSave () {
      this.$request.post('http://localhost:8000/api/products', this.employee)
      .then(res => {
        if(res.data.success){
          this.$router.push('/')
          this.getAll()
        }
        alert('Add success')
      })
      this.isadd = false
    },
    isEdit () {
      this.isadd = true
    },
    isDelete (id) {
      let choose = confirm('Ban co chac chan muon xoa')
      if (choose === true) {
        this.$request.delete(`http://localhost:8000/api/products/${id}`)
        .then(res => {
          if(res.data.success){
            alert('OK')
            this.getAll()
          }
        })
      }
    }
  },
  components: {
    AddNew
  }
}
</script>

<style scoped>

</style>
