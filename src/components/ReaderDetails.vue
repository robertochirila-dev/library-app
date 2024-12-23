<template>
    <div v-if="reader">
      <h2>Reader Details</h2>
      <div>
        <strong>Name:</strong> {{ reader.name }}
      </div>
      <div>
        <strong>Email:</strong> {{ reader.email }}
      </div>
      <div>
        <strong>Books Taken:</strong>
        <ul>
          <li v-for="book in reader.booksTaken" :key="book._id">{{ book.title }}</li>
        </ul>
      </div>
      <div>
        <strong>Created At:</strong> {{ reader.createdAt }}
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      readerId: {
        type: String,
        required: true,
      }
    },
    data() {
      return {
        reader: null
      };
    },
    watch: {
      readerId: 'fetchReaderDetails',
    },
    mounted() {
      this.fetchReaderDetails();
    },
    methods: {
      async fetchReaderDetails() {
        try {
          const response = await fetch(`http://localhost:3000/readers/${this.readerId}`);
          if (!response.ok) {
            throw new Error('Reader not found');
          }
          const data = await response.json();
          this.reader = data;
        } catch (error) {
          console.error(error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add any specific styling you want here */
  </style>