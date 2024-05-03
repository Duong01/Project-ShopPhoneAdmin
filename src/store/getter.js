const getters = {
    isAuthenticated(state) {
      return state.isAuthenticated;
    },
    currentUser(state) {
      return state.empInfor;
    }
  }
  export default getters;