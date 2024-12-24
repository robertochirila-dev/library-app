<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-4">Login</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input v-model="username" id="email" type="email"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your email" required />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input v-model="password" id="password" type="password"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your password" required />
        </div>
        <button type="submit"
          class="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          Login
        </button>
      </form>
      <p class="mt-4 text-center text-sm text-gray-600">
        Don't have an account?
        <router-link to="/" class="text-indigo-600 hover:text-indigo-800">Register here</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { jwtDecode } from "jwt-decode";

export default {
  name: "LoginForm",
  data() {
    return {
      username: "",
      password: "",
      isLoggingIn: false,
    };
  },
  methods: {
    async login() {
      this.isLoggingIn = true;

      try {
        const response = await fetch("http://localhost:3000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("authToken", data.token); // Store JWT token

          // Decode the token to get the role
          const decodedToken = jwtDecode(data.token);
          localStorage.setItem("role", decodedToken.role); // Store role in localStorage

          this.$router.push("/books"); // Redirect to dashboard
        } else {
          alert("Invalid credentials");
        }
      } catch (error) {
        console.error("Login error:", error);
        alert("There was an error logging in.");
      } finally {
        this.isLoggingIn = false;
      }
    },
  },
};
</script>