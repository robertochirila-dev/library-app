<template>
    <div class="p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Book Details</h2>
      
      <div v-if="book" class="space-y-4">
        <!-- Book Title -->
        <h3 class="text-xl font-semibold text-gray-900">{{ book.title }}</h3>
        
        <!-- Author -->
        <p class="text-lg text-gray-700"><strong>Author:</strong> {{ book.author }}</p>
        
        <!-- Description -->
        <p class="text-sm text-gray-600"><strong>Description:</strong> {{ book.description }}</p>
  
        <!-- Admin Actions -->
        <div v-if="isAdmin" class="mt-4 space-y-4">
          <!-- Book Availability Check -->
          <div v-if="book.available" class="space-y-2">
            <label for="reader-select" class="block text-sm font-medium text-gray-700">Assign to Reader:</label>
            
            <!-- Reader Selection Dropdown -->
            <select v-model="selectedReaderId" id="reader-select" class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option v-for="reader in readers" :key="reader._id" :value="reader._id">
                {{ reader.name }}
              </option>
            </select>
  
            <!-- Assign Button -->
            <button 
              @click="assignBook" 
              class="mt-3 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              :disabled="isAssigning || !selectedReaderId">
              Assign Book
            </button>
          </div>
          
          <!-- Message when the book is already borrowed -->
          <div v-else>
            <p class="text-sm text-gray-500">This book has already been borrowed.</p>
          </div>
        </div>
        
        <!-- If user is not admin -->
        <div v-else>
          <p class="text-sm text-gray-500">You are not signed in as an admin!</p>
        </div>
      </div>
      
      <!-- Loading State -->
      <div v-else>
        <p class="text-sm text-gray-500">Loading...</p>
      </div>
    </div>
  </template>

<script>
export default {
    name: "BookDetails",
    props: ['id'], // The `id` will be passed as a prop from the router
    data() {
        return {
            book: null,
            isAssigning: false,
            readers: [],
            selectedReaderId: null,
            isAdmin: false,
            token: null
        };
    },
    created() {
        this.fetchBookDetails(this.id); // Use `this.id` to fetch the details
        this.fetchReaders(this.selectedReaderId)
        const role = localStorage.getItem("role");
        this.token = localStorage.getItem("authToken")
        this.isAdmin = role === "admin"; // Check if the user is an admin
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
        },
        async fetchReaders() {
            const response = await fetch(`http://localhost:3000/readers`);
            this.readers = await response.json();
        },
        async assignBook() {
            this.isAssigning = true;
            try {
                // used hardcoded user id from the postman request
                const readerId = this.selectedReaderId;
                const response = await fetch(`http://localhost:3000/borrow/${this.id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}`,
                    },
                    body: JSON.stringify({ readerId }),
                });

                if (response.ok) {
                    alert('Book borrowed successfully!');
                    this.book.available = false; // Update the UI to reflect the book is borrowed
                } else {
                    const message = await response.text();
                    alert(message); // Display the error message (e.g., "Book is not available")
                }
            } catch (error) {
                console.error('Error borrowing book:', error);
                alert('There was an error borrowing the book.');
            } finally {
                this.isAssigning = false;
            }
        }
    }
};
</script>