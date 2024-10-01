<template>
  <div>
    <router-link v-if="!isLoggedIn" to="/login">Login</router-link>
    <router-link v-if="isLoggedIn" to="/">Home</router-link>

    <router-link v-if="isLoggedIn" to="/singup">Registro</router-link>
    <button v-if="isLoggedIn" @click="logout">Cerrar Sesión</button>

    <router-view></router-view>
  </div>
</template>

<script>

import { auth, signOut, onAuthStateChanged } from './auth.js'


export default {

  data() {
    return {
      isLoggedIn: false
    }
  },
  created() {
    onAuthStateChanged(auth, (user) => {

      if (user) {
        this.isLoggedIn = true
      } else {
        this.isLoggedIn = false
      }

      // this.isLoggedIn = user ? true : false
      // this.isLoggedIn = !!user

    })
  },
  methods: {
    async logout() {
      await signOut(auth)
      this.$router.push('/login')
    }
  }
}

</script>

<style scoped>
div {
  text-align: center;
  margin-top: 20px;

 
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

button,
a {
  margin-top: 10px;
  margin-right: 10px;
  padding: 10px 20px;
  background-color: #04494e;
  color: #fff;
  text-decoration: none;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover,
a:hover {
  background-color: #0056b3;
}

button:focus,
a:focus {
  outline: none;
}
</style>
