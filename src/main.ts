import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import './main.css';
import { getInitialThemeOnLoad } from './utils/get-initial-theme-on-load';

document.documentElement.dataset.theme = getInitialThemeOnLoad();

const app = createApp(App);

app.use(createPinia());

app.mount('#app');
