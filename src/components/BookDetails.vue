<template>
    <div v-if="book">
        <h2>{{ book.title }}</h2>
        <p><strong>Author:</strong> {{ book.author }}</p>
        <p><strong>Description:</strong> {{ book.description }}</p>
        <p><strong>Published Date:</strong> {{ book.publishedDate }}</p>
        <!-- Display other details -->
    </div>
</template>

<script>
export default {
    name: 'BookDetails',
    props: ['bookId'],
    data() {
        return {
            book: null,
        };
    },
    watch: {
        bookId(newBookId) {
            this.fetchBookDetails(newBookId);
        }
    },
    methods: {
        async fetchBookDetails(bookId) {
            try {

                // Fetch book details from the API based on bookId
                const response = await fetch(`http://localhost:3000/books/${bookId}`);

                console.log(response)

                // Check if the response is OK (status 200)
                if (!response.ok) {
                    throw new Error(`Failed to fetch book details: ${response.status}`);
                }

                // Parse the JSON response
                const bookData = await response.json();
                this.book = bookData; // Set the data to your book variable
                console.log("Fetched Book:", bookData); // Debugging point
            } catch (error) {
                console.error("Error fetching book details:", error);
            }
        }
    },
    created() {
        console.log('rendered')
        if (this.bookId) {
            this.fetchBookDetails(this.bookId);
        }
    },
};
</script>