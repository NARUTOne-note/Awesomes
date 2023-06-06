import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.mount('#root');
