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

// jQuery
global.$ = jQuery

app.mount('#app');