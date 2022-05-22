import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/winter",
    redirect: { name: "home" },
  },
  {
    path: "/summer",
    redirect: { name: "home" },
  },
  {
    path: "/cart",
    redirect: { name: "home" },
  },
  {
    path: "/login",
    redirect: { name: "home" },
  },
  {
    path: "/:categorySlug/:productSlug",
    name: "product",
    component: () => import("@/views/ProductView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
