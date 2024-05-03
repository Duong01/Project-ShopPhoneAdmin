<template>
  <div>
  <nav>
    <ul> 
      <label class="logo">Foxconn</label>
      <p class="center">Hệ thống thi trắc nghiệm đầu vào cho ứng viên</p>
      <div class="emp_no">
        <li><button class="user" disabled >User | {{getEmpInfor}}</button></li>
        <li><button class="logout" @click="logout()"> Logout </button></li>
      </div>
    </ul>
  </nav>
  <section>
    <div class="left container">
      <div class="content">
        <p>Chọn loại đề thi</p>
        <select class="form-control" v-model="selected" @change="getQuestionType">
            <option v-for="item in question_type" :key="item.ROW_ID" :value="item.ROW_ID">{{item.F_DESC}}</option>
        </select>
        <button style="font-size: 16px" class="btn btn-success" @click="show">Bắt đầu thi</button>
      </div>
    </div>
    <div class="right" id="bottom">
      <div class="top">
        <div class="aaa">
          <li v-for="item in question_type_rowID" :key="item.ROW_ID">
            <label class="red">Mã đề thi: <b style="color: blue"> {{item.ROW_ID}}</b></label>
            <br>
            <label class="red">Loại đề thi: <b style="color: blue"> {{item.F_DESC}}</b></label>
            <br>
            <label class="red">Tổng số câu hỏi: <b style="color: blue"> {{count}}</b> </label>
            <br>
            <label class="red">Tổng số điểm: </label>
            <br>
            <label class="red">Tổng thời gian thi: </label>
            <br>
          </li>
        </div>
        
      </div>
      <div class="bottom" id="bottom_right">
        <div v-show="aaa" class="countdown-item" style=" color: red; margin: 10px 20px;border-radius: 10px; border: 1px solid #333; width: 100px; height: 30px; text-align: center;">
        </div>
        <div class="exams">
          <div class="form-group">
          <div v-for="item, index in question1" :value="item.ROW_ID" :key="index">
            <h4>Câu số {{index+1}}</h4>
            <div v-for="i in item.QUESTION2" :key="i.ROW_ID">
              <p>{{i.TEXT_CONTENT}}</p>
              <div class="answer" v-for="itm in i.ANSWER_DETAIL" :key="itm.ROW_ID">
                <input type="radio" :name="itm.QUESTION2_ID" :value="itm.F_LABEL" @change="aaa(itm.F_LABEL)">
                <label style="color: red">{{itm.F_LABEL}}: {{itm.F_DESC}} </label>
              </div>
            </div>
          </div>
          </div>
        </div>
        <div>
          <h5 style="text-align:center;">{{text}}</h5>
        </div>
        <button style="font-size: 16px; text-align: center" class="btn btn-success" @click="close">Kết thúc bài thi</button>
      </div>
    </div>
  </section>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ExamsPage',
  data(){
    return {
      question_type: [],
      question1: [],
      question2: [],
      question_type_rowID: [],
      answerdetail: [],
      a: null,
      count: 0,
      idquestion2: null,
      selected: null,
      text: '',
      number: 0
    }
  },
  created() {
    this.getQuestionType()
  },
  methods: {
    getQuestionType()
    {
      axios.get('http://localhost:8182/api/questiontype/list')
      .then(res =>{
        if(res.status == 200){
          this.question_type = res.data
        }
      })
    },
    getQuestion1(){
      axios.get(`http://localhost:8182/api/question1/list?rowid=${this.selected}`)
      .then(res =>{
        // console.log(res)
        if(res.status == 200){
          this.question1 = res.data
        }
        if(res.data.length == 0){
          this.text = 'Không có câu hỏi nào'
        }
        this.count = res.data.length
        // this.idquestion2 = res.data
        // console.log(this.idquestion2)
      })
    },
    //  getQuestion2(){
    //   axios.get(`http://localhost:8182/api/user/listquestion2byid?rowid=${this.idquestion2}`)
    //   .then(res =>{
    //     if(res.status == 200){
    //       this.question2 = res.data
    //     }
    //     if(res.data.length == 0){
    //       this.text = 'Không có câu hỏi nào'
    //     }
    //   })
    // },
    getQuestionByID(){
      axios.get(`http://localhost:8182/api/user/listquestionbyid?rowid=${this.selected}`)
      .then(res =>{
        // console.log(res)
        if(res.status == 200){
          this.question_type_rowID = res.data
        }
      })
    },
    // getAnswerDetail(){
    //   axios.get(`http://localhost:8182/api/user/answaredetailbyid?rowid=${this.idquestion1}`)
    //   .then(res =>{
    //     // console.log(res)
    //     if(res.status == 200){
    //       this.answerdetail = res.data
    //     }
    //   })
    //   console.log(this.question1.ROW_ID)
    // },
    logout() {
      location.reload()
      localStorage.clear()
    },
    show() {
      if(this.selected != null){
        let choose = confirm("Bạn có chắc chắn muốn thi")
        if(choose == true){
          document.getElementById('bottom').style.display = "block"
          document.getElementById('bottom_right').style.display = "block"
        }
        this.setTime
        this.getQuestionByID(),
        this.getQuestion1()
        // this.getAnswerDetail()
      }
      else{
        alert('Vui lòng chọn loại đề thi')
      }
    },
    aaa(e){
      axios.get('http://localhost:8182/api/question2/list')
      .then(res =>{
        if(res.status == 200){
          this.question2 = res.data
        }
      })
     this.a = e
      console.log(this.a)
    },
    close() {
      console.log('aaa: '+ this.setTime)
      document.getElementById('bottom_right').style.display = "none"
    }
  },
  computed: {
    // setTime(){
    //   var thoigianbandau = 10
    //   var time = thoigianbandau * 60
    //   var itemCountDown = document.querySelector('.countdown-item')
    //   var s = setInterval(() => {
    //     time --
    //     let giay = time % 60
    //     let phut = Math.floor(time / 60)
    //     itemCountDown.innerHTML = `${phut} : ${giay}`
    //     if(time == 0 ){
    //       clearInterval(s)
    //     }
    //   }, 1000);
    // },
    getEmpInfor()
    {
      let emp = JSON.parse( localStorage["us"])
       if(emp!=undefined)
       return emp.fullname;
      return ""
    }
  }
}
</script>

<style scoped>
nav {
  top: 0;
  background: #0191aa;
  height: 80px;
  width: 100%;
  position: fixed;
  z-index: 9999;
  box-shadow: 1px 5px 8px gray;
}
p.center{
  display: block;
  float: left;
  color: white;
  font-size: 20px;
  line-height: 80px;
  padding: 0 35px;
}
.emp_no{
  float: right;
  display: block;
}
.user{
  background: #0191aa;
  color: #fff;
  font-size: 17px;
  border: none;
  margin: 0 10px;
}
.logout{
  background: #0191aa;
  color: blue;
  font-size: 17px;
  border: none;
  margin: 0 10px;

}
label.logo {
  display: block;
  float: left;
  color: white;
  font-size: 30px;
  line-height: 80px;
  padding: 0 35px;
}

nav ul li {
  display: inline-block;
  line-height: 80px;
}
section{
  margin: 130px 30px;
  /* background: rgb(214, 176, 176); */
  float: left;
  width: 100%;
}
.left{
  text-align: center;
  display: block;
  width: 30%;
  float: left;
  height: 300px;
  background-color: #3333;
  margin: 0 0 30px 50px ;
  border-radius: 10px;
  border: 1px solid #0191aa;
}
.left .content{
  display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
}
.left .content select{
  margin: 10px;
  width: 200px;
  height: 50px;
  text-align: center;
  border: 1px solid #dddddd;
  border-radius: 10px;
}
.right{
  width: 50%;
  float: left;
  height: auto;
  margin: 0 0 0px 100px ;
  background-color: #3333;
  border-radius: 10px;
  border: 1px solid #0191aa;
  display: none;
}
.right .top{
  width: 100%;
  height: 250px;
  background-color: #fff;
  border-radius: 10px;
}
.right .top .aaa label{
  margin: 10px 50px;
}
.right .bottom{
  margin-top: 30px;
  width: 100%;
  height: auto;
  margin: 30px 0px;
  background-color: #fff;
}
.exams{
  margin: 0 20px;
}
.exams .answer{
  margin: 0 20px;
}
</style>
