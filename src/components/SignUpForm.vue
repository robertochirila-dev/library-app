<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Register</h2>
        <form @submit.prevent="register">
          <!-- Email Field -->
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              v-model="email"
              required
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your email"
            />
          </div>
  
          <!-- Password Field -->
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              v-model="password"
              required
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your password"
            />
          </div>
  
          <!-- User Type Dropdown -->
          <div class="mb-6">
            <label for="userType" class="block text-sm font-medium text-gray-700">User Type</label>
            <select
              v-model="userType"
              required
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="reader">Reader</option>
              <option value="admin">Admin</option>
            </select>
          </div>
  
          <!-- Register Button -->
          <button
            type="submit"
            class="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Register
          </button>
        </form>
  
        <!-- Link to Login -->
        <p class="mt-4 text-center text-sm text-gray-600">
          Already have an account? 
          <router-link to="/login" class="text-indigo-600 hover:text-indigo-800">Login here</router-link>
        </p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "SignUpForm",
    data() {
      return {
        username: '',
        password: '',
        userType: 'reader',
      };
    },
    methods: {
      async register() {
        try {
          const response = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: this.email,
              email: this.email,
              password: this.password,
              userType: this.userType,
            }),
          });
  
          const data = await response.json();
  
          if (response.ok) {
            alert('User registered successfully');
            this.$router.push('/login'); // Redirect to login after successful registration
          } else {
            alert(data.message || 'Registration failed');
          }
        } catch (error) {
          console.error('Error during registration:', error);
          alert('Registration error');
        }
      },
    },
  };
  </script>