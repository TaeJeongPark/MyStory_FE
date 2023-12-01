import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios"
import jQuery from 'jquery'
import KakaoLogin from 'vue-kakao-login';
import kakao from 'vue-kakao-sdk'

const app = createApp(App)

// Router
app.use(router)

// Axios
app.provide('$axios', axios);
app.config.globalProperties.$axios = axios

// Kakao Login
app.use(KakaoLogin);
// app.component('kakao-login', KakaoLogin);

const apiKey = 'cce23cbb01041c3fab7a8525efd6af0e'
app.use(kakao, { apiKey })

window.Kakao.init(apiKey)

// jQuery
global.$ = jQuery

app.mount('#app');
