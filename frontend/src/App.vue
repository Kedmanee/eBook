<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
</script>

<template >
  <div>
    <div id="app">
      <!-- nav bar -->
      <nav class="navbar" role="navigation" aria-label="main navigation" style="background-color: #534340" width="300"
        height="300">
        <div class="navbar-brand">
          <a class="navbar-item" href="/">
            <img
              src="https://media.discordapp.net/attachments/727925890989817947/969683763044962304/IMG_3599.png?width=670&height=670"
              style="height: 100%; aspect-ratio: 1/1;" />
          </a>

          <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" @click="showNav = !showNav"
            data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div class="navbar-menu" :class="{'is-active': showNav}">
          <div class="navbar-start">
            <a class="navbar-item" href="/"> หน้าแรก </a>

            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link"> e-book </a>

              <div class="navbar-dropdown">
                <router-link :to="{ path: `/type/1` }"><a class="navbar-item"> มังงะ </a></router-link>
                <router-link :to="{ path: `/type/2` }"><a class="navbar-item"> นิยาย </a></router-link>
                <router-link :to="{ path: `/type/3` }"><a class="navbar-item"> นิยายแปล </a></router-link>
                <router-link :to="{ path: `/type/4` }"><a class="navbar-item"> หนังสือเด็ก </a></router-link>
                <hr class="navbar-divider" />
                <a class="navbar-item" href="/"> ทั้งหมด </a>
              </div>
            </div>
            <a class="navbar-item" v-if="user && user.type == 'admin'" href="/upload"> เพิ่มหนังสือลงระบบ </a>
          </div>
          <div class="navbar-end" v-if="!user">
            <div class="navbar-item">
              <div class="buttons">
                <a class="button" style="background-color:#E9EFC0;" href="/signUp">
                  Sign up
                </a>
                <a class="button" style="background-color:#percent; " href="/login"> Log in </a>
              </div>
            </div>

          </div>
          <div class="navbar-end" v-else>
            <a class="navbar-item " href="/profile"> <i class="fas fa-user" aria-hidden="true" v-if="user && user.type !== 'admin'"></i> </a>
            <a class="navbar-item " href="/cart"> <i class="fa fa-shopping-cart" aria-hidden="true" v-if="user && user.type !== 'admin'"></i> </a>
            <a class="navbar-item">
              <div class="buttons">
                <div class="button" style="background-color:#E9EFC0;" @click="logOut">
                  
                  Log out
                </div>
              </div>
            </a>
          </div>
        </div>
      </nav>
    </div>

    <router-view :key="$route.fullPath" @auth-change="onAuthChange" :user="user" />
  </div>
</template>

<style scoped>
.navbar-link,
a.navbar-item {
  cursor: pointer;
  color: #F4FCD9;
}

a.navbar-item:hover {
  background-color: #BB9981;
  color: #534340;
}

.navbar-link:hover {
  background-color: #BB9981;
  color: #534340;
}

.navbar-item.has-dropdown:hover .navbar-link {
  background-color: #BB9981;
}

.navbar-dropdown {
  background-color: #BB9981;
}
</style>
<script>
import axios from '@/plugins/axios'

export default {
  data() {
    return {
      user: null,
      showNav: false,
    }
  },
  mounted() {
    this.onAuthChange()
  },
  methods: {
    onAuthChange() {
      const token = localStorage.getItem('token')
      if (token) {
        this.getUser()
      }
    },
    getUser() {
      axios.get('http://localhost:5000/user/me').then(res => {
        this.user = res.data
      })
    },
    logOut(){
      localStorage.removeItem("token")
      this.user = null
      this.$router.push("/");
    },
    addToCart(eBook) {
      axios
        .post(`http://localhost:5000/cart/add/${eBook}`, {
          id: this.user.customer_id,
        })
        .then((res) => {
          alert("Add to cart success");
        })
        .catch((err) => {
          alert(err.response.data);
        });
    },
  }
}
</script>