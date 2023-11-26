import { createWebHistory, createRouter } from 'vue-router'
import Home from '@/components/HomeComponent.vue'
import Login from "@/components/LoginComponent.vue";
import Story from "@/components/StoryComponent.vue";

const routes = [
    {
        path: '/',
        name: 'login',
        component: Login
    },
    {
        path: '/home',
        name: 'home',
        component: Home
    },
    {
        path: '/story',
        name: 'story',
        component: Story
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;