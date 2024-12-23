<template>
  <nav class="bg-gray-800 text-white py-4">
    <div class="container mx-auto flex items-center justify-between">
      <div class="text-xl font-bold">
        <router-link to="/" class="text-white hover:text-gray-300">Library</router-link>
      </div>
      <div class="space-x-4">
        <router-link 
          to="/add-book" 
          class="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
          >Add book</router-link>
        <router-link 
          to="/books" 
          class="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
          >Books</router-link>
        <router-link 
          to="/readers" 
          class="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
          >Readers</router-link>
        <button 
          @click="logout" 
          class="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
        >
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem("token"); // Remove token from local storage
      localStorage.removeItem("role"); // Remove role from local storage
      this.$router.push("/login"); // Redirect to login page
    }
  }
};
</script>

<style scoped>
/* You can add more custom styles here if needed */
</style>