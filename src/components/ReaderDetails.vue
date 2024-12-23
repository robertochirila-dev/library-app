<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Reader Details</h2>
    <div v-if="reader">
      <h3>{{ reader.name }}</h3>
      <p><strong>Email:</strong> {{ reader.email }}</p>
      <p><strong>Books Taken:</strong> {{ reader.booksTaken.join(", ") }}</p>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReaderDetails",
  props: ['id'], // Automatically receive the `id` prop from the router
  data() {
    return {
      reader: null
    };
  },
  created() {
    this.fetchReaderDetails(this.id);
  },
  methods: {
    async fetchReaderDetails(readerId) {
      try {
        const response = await fetch(`http://localhost:3000/readers/${readerId}`);
        if (response.ok) {
          this.reader = await response.json();
        } else {
          console.error("Failed to fetch reader details");
        }
      } catch (error) {
        console.error("Error fetching reader details:", error);
      }
    }
  }
};
</script>
  
  <style scoped>
  /* Add any specific styling you want here */
  </style>