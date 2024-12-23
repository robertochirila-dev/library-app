<template>
    <div class="p-4">
        <h2 class="text-xl font-bold mb-4">Book Details</h2>
        <div v-if="book">
            <h3>{{ book.title }}</h3>
            <p><strong>Author:</strong> {{ book.author }}</p>
            <p><strong>Description:</strong> {{ book.description }}</p>
            <div v-if="isAdmin">
                <div v-if="book.available">
                    <label for="reader-select">Assign to Reader:</label>
                    <select v-model="selectedReaderId" id="reader-select" class="p-2 border rounded">
                        <option v-for="reader in readers" :key="reader._id" :value="reader._id">
                            {{ reader.name }}
                        </option>
                    </select>

                    <button @click="assignBook" class="bg-blue-500 text-white px-4 py-2 rounded"
                        :disabled="isAssigning || !selectedReaderId">
                        Assign Book
                    </button>
                </div>
                <p v-else>This book has already been borrowed.</p>
            </div>
            <div v-else>
                <p>You are not signed in as an admin !</p>
            </div>
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
            book: null,
            isAssigning: false,
            readers: [],
            selectedReaderId: null,
            isAdmin: false
        };
    },
    created() {
        this.fetchBookDetails(this.id); // Use `this.id` to fetch the details
        this.fetchReaders(this.selectedReaderId)
        const role = localStorage.getItem("role");
        console.log(role)
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