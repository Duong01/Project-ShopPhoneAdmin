import { createStore } from 'vuex'
import mutations from "./mutations"
import state from "./state"
import getters from "./getter"
import actions from "./actions"

const store = createStore({
    state,
    mutations,
    getters,
    actions
  })
export default store