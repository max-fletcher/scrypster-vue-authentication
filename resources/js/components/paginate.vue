<template>
  <div>
     <v-pagination
      v-model="currentPage"
      :length="lastpage"
    ></v-pagination>
  </div>
</template>

<script>
export default {
   // since we want to make this pagination component dynamic, it is fed the store name and the state/collection name
   // that it will use to construct the pagination component.
   props:['store', 'collection'],
   // The way watchers work is if there is a new value, it will trigger. Currently we are not using the old value to
   // do anything. But it can be used to compare or do something if needed.
   watch:{      
      currentPage( newVal, oldVal ){
         console.log(newVal);
         // call the paginatePage method when a newVal is fed into it (i.e the watcher is triggered).
         this.paginatePage(newVal);
      }
   },
   computed:{
      currentPage:{
         get(){
            // Since we are using User::paginate(10); in laravel, the response is packaging it into an object that has
            // a certain structure. Use chrome network tab to view structure. The current_page is a field added to the 
            // response that denoted the current page worth of data sent(contains 10 rows for now).
            
            // Since this will be rendered dynamically using props, if the users page is using this, in which case
            // store="user" and collection="users" will be passed down, this will be rendered as 
            // return this.$store.state.user.users.current_page;
            return this.$store.state[this.store][this.collection].current_page;
         },
         set( value ){
            // will be rendered to "user/SET_CURRENT_PAGE" if used from the users page since the prop store="user" if
            // it is coming from the users page
            this.$store.commit( this.store + '/SET_CURRENT_PAGE', value);
         }
      },
      lastpage:{
         get(){
            // same as above. If there are 120 records/rows, and we are using User::paginate(10); then last_page=12.
            return this.$store.state[this.store][this.collection].last_page;
         }
      }
   },
   methods:{
      paginatePage( pageNumber ){
         // will be rendered to "this.$store.dispatch("user/getUsers', pageNumber)"
         this.$store.dispatch(this.store + '/getUsers', pageNumber);
      }
   }
}
</script>

<style>

</style>