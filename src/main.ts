import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import { getInitialThemeOnLoad } from './lib/utils/get-initial-theme-on-load';
import './main.css';

document.documentElement.dataset.theme = getInitialThemeOnLoad();

const app = createApp(App);

app.use(createPinia());

app.mount('#app');
