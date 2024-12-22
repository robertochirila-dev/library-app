<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Books</h2>
    <table class="min-w-full border-collapse border border-gray-200">
      <thead>
        <tr>
          <th class="border p-2">Title</th>
          <th class="border p-2">Author</th>
          <th class="border p-2">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books" :key="book.id">
          <td class="border p-2">{{ book.title }}</td>
          <td class="border p-2">{{ book.author }}</td>
          <td class="border p-2">
            <button @click="viewDetails(book._id)" class="bg-blue-500 text-white px-4 py-2 rounded">Details</button>
          </td>
        </tr>
      </tbody>
    </table>
    <BookDetails v-if="selectedBookId" :bookId="selectedBookId" />
  </div>
</template>

<script>
import BookDetails from "./BookDetails.vue"
export default {
  name: 'BookList',
  components: {
    BookDetails
  },
  data() {
    return {
      books: [],
      selectedBookId: null
    }
  },
  props: {
    msg: String
  },
  mounted() {
    this.fetchBooks();
  },
  methods: {
    async fetchBooks() {
      const response = await fetch('http://localhost:3000/books');
      const data = await response.json();
      this.books = data;
    },
    viewDetails(bookId) {
      console.log(bookId)
      this.selectedBookId = bookId;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>