<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
</script>

<template >
<div>
  <div id="app">
    <!-- nav bar -->
    <nav
      class="navbar"
      role="navigation"
      aria-label="main navigation"
      style="background-color: #534340"
      width="300"
      height="300"
    >
      <div class="navbar-brand">
        <a class="navbar-item">
          <img
            src="https://media.discordapp.net/attachments/727925890989817947/969683763044962304/IMG_3599.png?width=670&height=670"
            style="height: 100%; aspect-ratio: 1/1;"
          />
        </a>

        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item"> หน้าแรก </a>

          <a class="navbar-item"> มาใหม่ </a>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link"> e-book </a>

            <div class="navbar-dropdown">
              <a class="navbar-item"> มังงะ </a>
              <a class="navbar-item"> นิยาย </a>
              <a class="navbar-item"> นวนิยาย </a>
              <hr class="navbar-divider" />
              <a class="navbar-item"> ทั้งหมด </a>
            </div>
          </div>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button" style="background-color:#E9EFC0;" st href="/signUp">
              Sign up
              </a>
              <a class="button" style="background-color:#percent;"> Log in </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
  
  <router-view :key="$route.fullPath" @auth-change="onAuthChange" />
  </div>
</template>

<style scoped>
.navbar-link, a.navbar-item {
    cursor: pointer;
    color: #F4FCD9;
}
a.navbar-item:hover {
    background-color: #BB9981;
    color:  #534340;
}
.navbar-link:hover{
    background-color: #BB9981;
    color:  #534340;
}
.navbar-item.has-dropdown:hover .navbar-link {
    background-color: #BB9981;
}

.navbar-dropdown{
  background-color: #BB9981;
}
</style>
<script>
 import axios from '@/plugins/axios'
 
 export default {
   data () {
     return {
       user: null
     }
   },
   mounted () {
     this.onAuthChange()
   },
   methods: {
     onAuthChange () {
       console.log("dwadd")
       const token = localStorage.getItem('token')
       if (token) {
         this.getUser()
       }
     },
     getUser () {
       const token = localStorage.getItem('token')
       axios.get('/user/me').then(res => {
         this.user = res.data
       })
     },
   }
 }
 </script>