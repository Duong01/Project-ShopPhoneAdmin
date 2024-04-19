import axios from "axios";
import store from "@/store"
axios.defaults.timeout = 300000;
axios.defaults.withCredentials = true // allow use server api with  Session

function Post(url, params, success, error) {
    store.state.isLoading=true
    axios({
        method: 'post',
        url: url,
        headers: {
            'content-type': 'application/json;charset=UTF-8'
        },
        data: params
      })
        .then((dat)=>{
            success(dat)
            store.state.isLoading=false
        })
        .catch((er)=> {
            store.state.isLoading=false
            error(er)
        })

}

function Get(url, params, success, error) {
    store.state.isLoading=true
    axios({
        method: 'get',
        url: url,
        params: params
    })
        .then((dat)=>{ 
            success(dat)  
            store.state.isLoading=false
        })
        .catch((er)=>{
            store.state.isLoading=false
            error(er)
        })

}
// var form =new FormData()
//  form.append("name",file[0])
function PostFile(url, form, success, error) {
    store.state.isLoading=true
    axios.post(url, form, {
        'Content-Type': 'multipart/form-data'
    }).then((dat)=>{
        success(dat)
        store.state.isLoading=false

    }).catch((er)=>{
        error(er)
        store.state.isLoading=false
    })
}
const http={Post,Get ,PostFile}
export default http