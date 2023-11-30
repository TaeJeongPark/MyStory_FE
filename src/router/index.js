import { createWebHistory, createRouter } from 'vue-router'
import Home from '@/components/HomeComponent.vue'
import Login from "@/components/LoginComponent.vue";
import Story from "@/components/StoryComponent.vue";
import Introduction from "@/components/SelfIntroductionComponent.vue";
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
        path: '/introduction',
        name: 'introduction',
        component: Introduction
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