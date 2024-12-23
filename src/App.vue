<template>
  <div id="app">
    <!-- Navigation -->
    <nav class="bg-blue-500 p-4">
      <ul class="flex space-x-4">
        <li>
          <router-link to="/" class="text-white">Home</router-link>
        </li>
        <li>
          <router-link to="/books" class="text-white">Books</router-link>
        </li>
        <li>
          <router-link to="/readers" class="text-white">Readers</router-link>
        </li>
      </ul>
    </nav>

    <!-- The router-view will display the matched component -->
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>

</style>
