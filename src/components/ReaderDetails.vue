<template>
  <div class="p-6 bg-gray-50 rounded-lg shadow-md">
    <NavigationBar/>

    <h2 class="text-2xl font-bold text-gray-800 mb-4">Reader Details</h2>

    <div v-if="reader" class="space-y-4">
      <!-- Reader Name -->
      <h3 class="text-xl font-semibold text-gray-900">{{ reader.name }}</h3>

      <!-- Reader Email -->
      <p class="text-lg text-gray-700"><strong>Email:</strong> {{ reader.email }}</p>

      <!-- Books Taken -->
      <p class="text-sm text-gray-600">
        <strong>Books Taken:</strong> {{ reader.booksTaken.join(", ") }}
      </p>
    </div>

    <!-- Loading State -->
    <div v-else>
      <p class="text-sm text-gray-500">Loading...</p>
    </div>
  </div>
</template>

<script>
import NavigationBar from './NavigationBar.vue';
export default {
  name: "ReaderDetails",
  components: {
    NavigationBar
  },
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