import Api from '../../apis/index'

export default {
    login (credentials) {
        return Api().post("api/account/list", {
            Emp_no: credentials.Emp_no,
            password: credentials.password
        })
    },
    register () {
        return Api().post('users/signup')
    }
}