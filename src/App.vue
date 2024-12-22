<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <div>
    <div class="flex justify-between mb-4">
      <button @click="showBooks = true" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Show Books
      </button>
      <button @click="showBooks = false" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Show Readers
      </button>
    </div>
    <BookList v-if="showBooks"></BookList>
    <ReaderList v-else></ReaderList>
  </div>
</template>

<script>
import BookList from './components/BookList.vue'
import ReaderList from './components/ReaderList.vue'


export default {
  name: 'App',
  components: {
    BookList,
    ReaderList
  },
  data() {
    return {
      showBooks: false,
    }
  }
}
</script>

<style>
</style>
