import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import './main.css';
import { getThemeOnLoad } from './utils/get-theme-on-load';

document.documentElement.dataset.theme = getThemeOnLoad();

const app = createApp(App);

app.use(createPinia());

app.mount('#app');
