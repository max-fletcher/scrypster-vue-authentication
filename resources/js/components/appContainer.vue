<template>
  <v-app id="inspire">
      <!-- Sidebar -->
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <!-- Home Link -->
        <v-list-item to="/" link class="text-decoration-none">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> Home </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- Users Link -->
        <v-list-item to="/users" link class="text-decoration-none">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> Users </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- Contact Link -->
        <v-list-item to="/contacts" link class="text-decoration-none">
          <v-list-item-icon>
            <v-icon>mdi-contact-mail</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> Contact </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- Logout Link -->
        <v-list-item link @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-power</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> Logout {{ currentUser.firstname }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },

    data: () => ({
      drawer: null,
    }),

    computed: {      
      currentUser: {
        get(){
          // Set the current user data to the "user" variable here. When this component was initialized, the "dispatch"
          // in the "created" method here triggered the action called "getUser" in the store causing it to make an axios request
          // to the backend "api/user/currentUser" to retrieve user data and stored it in the "user" variable in store.
          // The user variable will stay here as long as the the user is logged in since this is this is the root component
          // and all other components will be run inside this.
          return this.$store.state.currentUser.user;
        }
      }
    },

    methods: {
      logout(){
        this.$store.dispatch("currentUser/logoutUser");
      }
    },

    created(){
      // If a user has a token, let him entet. Otherwise, redirect to login page. Also implemented in the spa.blade.php.
      if(localStorage.hasOwnProperty("blog_token")){
        // whenever axios makes a request to any url, the blog_token from local storage is also sent with that
        // request as a bearer. This is so that if you traverse through any page in your spa, the moment you refresh or
        // load a new page, this token will be lost. Some requests will need this token for it to be processed by the 
        // backend properly. Since this is the main component inside which other components will be loaded via vue-router
        // after login, this is set here.
        axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("blog_token");
        // trigger the "getUser" action which gets the current logged in user via an axios request
        // and store it in vuex store
        this.$store.dispatch('currentUser/getUser');
      }
      else{
        window.location.replace("/login");
      }
    }
  };
</script>
