import { createWebHistory, createRouter } from 'vue-router'
import Home from '@/components/HomeComponent.vue'
import Login from "@/components/LoginComponent.vue";
import Story from "@/components/StoryComponent.vue";
import Growth from "@/components/GrowthProcessComponent.vue";
import Result from "@/components/ResultComponent.vue";

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
    },
    {
        path: '/growth',
        name: 'growth',
        component: Growth
    },
    {
        path: '/result',
        name: 'result',
        component: Result
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;