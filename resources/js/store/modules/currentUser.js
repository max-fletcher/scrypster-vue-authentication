import axios from "axios";

const state = {
   user:{
      
   }
};

const getters = {};
const actions = {
   // commit here is used to commit a mutation
   getUser({commit} ){
      axios.get("/api/user/current")
      .then( response => {
         // use the commit object to call a mutation to alter some state in this store
         commit( 'SET_USER', response.data );
      });
   },
   // login Action
   // actions take an empty object if it is not using a state or not making a mutation via a commit
   // or not using anything from vuex store
   loginUser( {}, user){ 
      //make an axios call to the route that logs users in
      axios.post("/api/user/login", {
         email: user.email,
         password: user.password
      })
      .then( response =>{
         // if access token exists on the response body
         if( response.data.access_token ){
            // save token to local storage
            localStorage.setItem("blog_token", response.data.access_token)
         }
         // redirect to home page
         window.location.replace("/home")
      })
   },
   //logout method that removes blog token from local storage
   logoutUser(){      
      localStorage.removeItem("blog_token");
      // redirect to login page
      window.location.replace("/login");
   }
};

const mutations = {
   SET_USER( state, data ){
      state.user = data;
   }
};

export default {
   namespaced: true,
   state,
   getters,
   actions,
   mutations
}
