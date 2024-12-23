<template>
    <NavigationBar/>
    <div class="p-6 bg-gray-50 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Add a New Book</h2>

        <form @submit.prevent="addBook">
            <div class="space-y-4">
                <!-- Book Title -->
                <div>
                    <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
                    <input type="text" id="title" v-model="book.title" required
                        class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>

                <!-- Book Author -->
                <div>
                    <label for="author" class="block text-sm font-medium text-gray-700">Author</label>
                    <input type="text" id="author" v-model="book.author" required
                        class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>

                <!-- Book Genre -->
                <div>
                    <label for="genre" class="block text-sm font-medium text-gray-700">Genre</label>
                    <input type="text" id="genre" v-model="book.genre"
                        class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>

                <!-- Book Year -->
                <div>
                    <label for="year" class="block text-sm font-medium text-gray-700">Year</label>
                    <input type="number" id="year" v-model="book.year"
                        class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>

                <!-- Submit Button -->
                <button type="submit"
                    class="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Add Book
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import NavigationBar from './NavigationBar.vue';
export default {
    components:{
        NavigationBar
    },
    data() {
        return {
            book: {
                title: '',
                author: '',
                genre: '',
                year: null,
            }
        };
    },
    methods: {
        async addBook() {
            try {
                // Prepare the data to be sent
                const response = await fetch('http://127.0.0.1:5000/add-book', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.book), // Send the book data in JSON format
                });

                if (response.ok) {
                    //const data = await response.json();
                    alert('Book added successfully!');
                    this.book = {}; // Clear the form
                } else {
                    const errorData = await response.json();
                    alert(`Failed to add book: ${errorData.error}`);
                }
            } catch (error) {
                console.error('Error adding book:', error);
                alert('Failed to add book. Please try again.');
            }
        }
    }
};
</script>

<style scoped>
/* Add any custom styling for the form here */
</style>