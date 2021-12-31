import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import Holder from '../views/Holder.vue'
import Verify from '../views/Verify.vue'
import Issue from '../views/Issue.vue'

import About from '../views/About.vue'


const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        redirect: '/verify',
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/holder',
        name: 'Holder',
        component: Holder
    },
    {
        path: '/verify',
        name: 'Verify',
        component: Verify
    },
    {
        path: '/issue',
        name: 'Issue',
        component: Issue
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
