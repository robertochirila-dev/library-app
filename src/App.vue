<template>
  <div id="app">
    <NavigationBar v-if="isLoggedIn" />
    <router-view></router-view>
  </div>
</template>

<script>

import NavigationBar from './components/NavigationBar.vue';

export default {
  name: 'App',
  components:{
    NavigationBar
  },
  data() {
    return {
      isLoggedIn: false
    }
  },
  created() {
    const token = localStorage.getItem('token');

    if (token) {
      // If token exists, redirect to the books page
      this.$router.push('/books');
    } else {
      // If no token, redirect to the registration page
      this.$router.push('/');
    }
  },
  methods: {
    signOut() {
      // Remove the token and role from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      this.$router.push('/login'); // Adjust based on your routes
      this.user = null;
    }
  }



}
</script>

<style></style>
