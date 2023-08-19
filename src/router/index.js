import { createRouter, createWebHistory } from "vue-router";
import { authGuard } from "@auth0/auth0-vue";
const Auth = () => import("../views/AuthView.vue");
const Home = () => import("../views/HomeView.vue");
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/auth",
      name: "auth",
      component: Auth,
    },
    {
      path: "/",
      name: "home",
      component: Home,
      beforeEnter: authGuard,
    },
  ],
});

export default router;
