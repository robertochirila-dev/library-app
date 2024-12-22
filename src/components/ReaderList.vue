<template>
    <p>Readers</p>
</template>

<script>
export default {
    name: 'ReaderList',
    data () {
      return {
        readers: []
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
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>