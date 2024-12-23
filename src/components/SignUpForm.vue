<template>
    <div class="register-container">
      <h2>Register</h2>
      <form @submit.prevent="register">
        <div>
          <label for="email">Email</label>
          <input type="email" v-model="email" required />
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" v-model="password" required />
        </div>
        <div>
          <label for="userType">User Type</label>
          <select v-model="userType" required>
            <option value="reader">Reader</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit">Register</button>
        <button>
          <router-link to="/login" class="text-white">Login</router-link>
        </button>
      </form>
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