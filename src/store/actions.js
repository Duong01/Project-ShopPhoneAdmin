const actions = {
    loginUser({ commit }, user) {
      // Thực hiện xác thực người dùng
      // Sau khi xác thực thành công, gọi mutation để đăng nhập
      commit('login', user);
    },
    logoutUser({ commit }) {
      // Thực hiện đăng xuất người dùng
      commit('logout');
    }
  }
  export default actions;