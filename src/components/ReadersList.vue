<template>
    <div>
        <h2 class="text-xl font-bold mb-4">Reader List</h2>
        <table class="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
                <tr>
                    <th class="py-2 px-4 border-b">Name</th>
                    <th class="py-2 px-4 border-b">Email</th>
                    <th class="py-2 px-4 border-b">Phone</th>
                    <th class="py-2 px-4 border-b">Books Taken</th>
                    <th class="py-2 px-4 border-b">Membership Date</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="reader in readers" :key="reader._id">
                    <td class="py-2 px-4 border-b">{{ reader.name }}</td>
                    <td class="py-2 px-4 border-b">{{ reader.email }}</td>
                    <td class="py-2 px-4 border-b">{{ reader.phone }}</td>
                    <td class="py-2 px-4 border-b">
                        <ul>
                            <li v-for="book in reader.booksTaken" :key="book">{{ book }}</li>
                        </ul>
                    </td>
                    <td class="py-2 px-4 border-b">{{ reader.membershipDate }}</td>
                    <td class="border p-2">
                        <router-link :to="`/readers/${reader._id}`" class="bg-blue-500 text-white px-4 py-2 rounded">
                            Details
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'ReadersList',
    data() {
        return {
            readers: [],
        }
    },
    mounted() {
        this.fetchReaders();
    },
    methods: {
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