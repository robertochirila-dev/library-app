import { createApp } from 'vue';
import App from './App.vue';
import './assets/styles.css'; // Import Tailwind styles here
import router from './router'; // If you're using Vue Router

const app = createApp(App);

app.use(router); // Use Vue Router (if applicable)

app.mount('#app');
