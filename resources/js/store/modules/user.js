import axios from "axios";

const state = {
   // if you use User::all(), expected response to be stored here will be an array (e.g users:[]) so it will using
   // block brackets to denote it is an array, but since we are using user::paginate(10); it will take an object
   // since expected response is also an object
   users:{}
};

const getters = {};
const actions = {
   // commit object here is used to commit a mutation
   getUsers( {commit}, pageNumber ){
      axios.get("/api/user/index?page=" + pageNumber)
      .then( response => {
         // use the commit object to call a mutation to alter some state in this store
         commit( 'SET_USERS', response.data );
      });
   },
};

const mutations = {
   // here, data is an object/array
   SET_USERS( state, data ){
      state.users = data;
   },
   // data here is an integer/number
   SET_CURRENT_PAGE( state, data ){
      state.users.current_page = data;
   }
};

export default {
   namespaced: true,
   state,
   getters,
   actions,
   mutations
}
