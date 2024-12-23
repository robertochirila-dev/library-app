<template>
    <div>
      <h2>Login</h2>
      <input v-model="username" placeholder="Username" />
      <input type="password" v-model="password" placeholder="Password" />
      <button @click="login">Login</button>
    </div>
  </template>
  
  <script>
import { jwtDecode }  from "jwt-decode";
  
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
            console.log(decodedToken)
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