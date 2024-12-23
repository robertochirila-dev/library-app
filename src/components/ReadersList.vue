<template>
    <NavigationBar />
    <div class="py-0 px-6  bg-gray-50 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Reader List</h2>
        <table class="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead class="bg-gray-100">
                <tr>
                    <th class="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Name</th>
                    <th class="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Email</th>
                    <th class="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Phone</th>
                    <th class="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Books Taken</th>
                    <th class="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Membership Date</th>
                    <th class="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Actions</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="reader in readers" :key="reader._id" class="hover:bg-gray-50">
                    <td class="py-3 px-4 text-sm text-gray-800 border-b">{{ reader.name }}</td>
                    <td class="py-3 px-4 text-sm text-gray-800 border-b">{{ reader.email }}</td>
                    <td class="py-3 px-4 text-sm text-gray-800 border-b">{{ reader.phone }}</td>
                    <td class="py-3 px-4 text-sm text-gray-800 border-b">
                        <ul class="list-disc pl-5 space-y-1">
                            <li v-for="book in reader.booksTaken" :key="book">{{ book.title }}</li>
                        </ul>
                    </td>
                    <td class="py-2 px-4 border-b">{{ formatMembershipDate(reader.membershipDate) }}</td>
                    <td class="py-3 px-4 text-sm border-b">
                        <router-link :to="`/readers/${reader._id}`"
                            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Details
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import NavigationBar from './NavigationBar.vue';

export default {
    name: 'ReadersList',
    components: {
        NavigationBar
    },
    data() {
        return {
            readers: [],
        }
    },
    mounted() {
        this.fetchReaders();
    },

    methods: {
        formatMembershipDate(date) {
            if (!date) return "N/A";
            const options = { year: "numeric", month: "long", day: "numeric" }; // Example: December 22, 2024
            return new Date(date).toLocaleDateString(undefined, options);
        },
        async fetchReaders() {
            const response = await fetch('http://localhost:3000/readers');
            const data = await response.json();
            this.readers = data;
            return ''
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>