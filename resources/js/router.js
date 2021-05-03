import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

import Home from "./components/home/container"
import Contacts from "./components/contacts/container"
import Users from "./components/users/container"

const routes = [
      {
         component: Home,
         name: "home",
         path: "/"
      },   
      {
         component: Contacts,
         name: "contacts",
         path: "/contacts"
      },
      {
         component: Users,
         name: "users",
         path: "/users"
      },
];

export default new VueRouter({
   routes
});