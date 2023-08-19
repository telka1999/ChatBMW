import { createRouter, createWebHistory } from "vue-router";
import { authGuard } from "@auth0/auth0-vue";
import HomeView from "../views/HomeView.vue";
const Home = () => import("../views/HomeView.vue");
const Aboute = () => import("../views/AboutView.vue");
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/about",
      name: "about",
      component: Aboute,
      beforeEnter: authGuard,
    },
  ],
});

export default router;
