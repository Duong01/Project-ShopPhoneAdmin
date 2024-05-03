const mutations = {
  setEmpInfor(state, NewEmpInfor) {
    state.empInfor = NewEmpInfor;
  },
  login(state, user) {
    state.isAuthenticated = true;
    state.empInfor = user;

  },
  logout(state) {
    state.isAuthenticated = false;
    state.empInfor = null;
  },
};
export default mutations;
