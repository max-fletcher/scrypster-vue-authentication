<template>
   <div>
      <form>
         <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" v-model="user.email" id="email" aria-describedby="emailHelp" placeholder="Enter email">            
         </div>
         <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" v-model="user.password" id="password" placeholder="Enter Password">
         </div>
         <button type="submit" @click.prevent="login" class="btn btn-primary">Submit</button>
      </form>
   </div>
</template>

<script>
export default {
   data: function () {
      return {
         user:{
            email: "",
            password: ""
         }
      }
   },
   methods:{
      //method for logging in user
      login(){
         //dispatch an action called "loginUser" inside "currentUser" store along with user data
         this.$store.dispatch('currentUser/loginUser', this.user);
      }
   },
}
</script>

<style>

</style>