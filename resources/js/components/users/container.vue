<template>
  <div class="pa-3">
     <h2> Users </h2>     

     <v-card outlined tile width="100%">
       <v-container fluid>

<!-- hide-default-footer hides the default pagination for table since we are making our won custom pagination -->
<!-- total-visible sets the number of page buttons shown in the pagination list -->
        <v-data-table
          expand-icon
          :headers="headers"
          :items="allUsers"          
          hide-default-footer
          :total-visible="7"
          class="elevation-1"
        ></v-data-table>

        <!-- passing store name and state/collection name to be used to render component -->
        <paginate store="user" collection="users" />

       </v-container>
     </v-card>

  </div>
</template>

<script>
import paginate from "../paginate"
export default {
  components:{
    paginate
  },
  data: () => ({
      headers: [          
          { text: 'ID', align:'start', value: 'id' },
          { text: 'Firstname', value: 'firstname' },
          { text: 'lastname', value: 'lastname' },
          { text: 'Email', value: 'email' },
        ],
        users: [          
          { id: '1', firstname: 'somename', lastname:'somelastname', email:'email@email.com', someproperty:"sadaw" },
          { id: '2', firstname: 'somename2', lastname:'somelastname2', email:'email2@email.com', someproperty:"sadaw" }
        ],
  }),
  computed: {
    allUsers: {
      get(){
        // if you are returning User::paginate(10) in laravel controller, then you have to use .data at the end since
        // otherwise it will be rendered as a nested object which vuetify won't be able to use.
        return this.$store.state.user.users.data;
      }
    }
  },
  created(){
    // trigger the getUsers action to get the 1st page of paginated items by default if the page loads. This value
    // will be dynamically changed with the vuetify paginate component when other numbers are clicked via another method.
    this.$store.dispatch('user/getUsers', 1);
  }
}
</script>

<style>

</style>