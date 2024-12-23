<template>
    <div class="p-4">
      <h2 class="text-xl font-bold mb-4">Book Details</h2>
      <div v-if="book">
        <h3>{{ book.title }}</h3>
        <p><strong>Author:</strong> {{ book.author }}</p>
        <p><strong>Description:</strong> {{ book.description }}</p>
        <!-- Add more fields as needed -->
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "BookDetails",
    props: ['id'], // The `id` will be passed as a prop from the router
    data() {
      return {
        book: null
      };
    },
    created() {
      this.fetchBookDetails(this.id); // Use `this.id` to fetch the details
    },
    methods: {
      async fetchBookDetails(bookId) {
        try {
          const response = await fetch(`http://localhost:3000/books/${bookId}`);
          if (response.ok) {
            this.book = await response.json(); // Store the data in `book`
          } else {
            console.error("Failed to fetch book details");
          }
        } catch (error) {
          console.error("Error fetching book details:", error);
        }
      }
    }
  };
  </script>