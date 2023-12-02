import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios"
import jQuery from 'jquery'

const app = createApp(App)

// Router
app.use(router)

// Axios
app.provide('$axios', axios);
app.config.globalProperties.$axios = axios

// Kakao Login
const apiKey = 'cce23cbb01041c3fab7a8525efd6af0e'
window.Kakao.init(apiKey)

// jQuery
global.$ = jQuery

app.mount('#app');
