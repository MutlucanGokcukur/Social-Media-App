import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import appAxios from './utils/appAxios';

const app = createApp(App)
app.provide('appAxios', appAxios);
app.use(router)
app.mount('#app')
