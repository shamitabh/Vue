import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import store from "@/store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/:category_slug",
    name: "category",
    component: () => import("@/views/CategoryView.vue"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("@/views/SearchView.vue"),
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("@/views/Cart.vue"),
    children: [
      {
        path: "",
        name: "cart",
        component: () => import("@/views/CartView.vue"),
      },
      {
        path: "success",
        name: "success",
        component: () => import("@/views/SuccessView.vue"),
      },
      {
        path: "checkout",
        name: "checkout",
        component: () => import("@/views/CheckoutView.vue"),
        meta: {
          requireLogin: true,
        },
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/SigninView.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("@/views/RegisterView.vue"),
  },
  {
    path: "/account",
    name: "account",
    component: () => import("@/views/AccountView.vue"),
    meta: {
      requireLogin: true,
    },
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

// router guard
router.beforeEach((to, _from) => {
  if (to.meta.requireLogin && !store.state.auth.isAuthenticated) {
    return { name: "login", query: { to: to.path } };
  }
});

export default router;
