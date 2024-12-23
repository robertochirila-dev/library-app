import { createRouter, createWebHistory } from "vue-router";
import BooksList from "../components/BooksList.vue";
import ReadersList from "../components/ReadersList.vue";
import BookDetails from "../components/BookDetails.vue";
import ReaderDetails from "../components/ReaderDetails.vue";
import LoginForm from "../components/LoginForm.vue"
import SignUpForm from "../components/SignUpForm.vue"

const routes = [
    { path: "/", name: "SignUpForm", component: SignUpForm },
    { path: "/login", name: "LoginForm", component: LoginForm },
    { path: "/books", name: "Books", component: BooksList },
    { path: "/readers", name: "Readers", component: ReadersList },
    { path: "/books/:id", name: "BookDetails", component: BookDetails, props: true },
    { path: "/readers/:id", name: "ReaderDetails", component: ReaderDetails, props: true },
    {
        path: '/:catchAll(.*)',
        redirect: '/login',
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
