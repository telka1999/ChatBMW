import { createRouter, createWebHistory } from "vue-router";
import { authGuard } from "@auth0/auth0-vue";
const Auth = () => import("../views/AuthView.vue");
const Home = () => import("../views/HomeView.vue");
const Chat = () => import("../views/ChatView.vue");
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      beforeEnter: authGuard,
      children: [
        {
          path: ":id",
          component: Chat,
        },
      ],
    },
    {
      path: "/auth",
      name: "auth",
      component: Auth,
      beforeEnter: authGuard,
    },
  ],
});

export default router;
