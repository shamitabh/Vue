import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    components: {
      default: () => import("../views/AboutView.vue"),
      footer: () => import("@/components/AboutFooter.vue"),
    },
  },
  {
    path: "/test",
    name: "test",
    components: {
      default: () => import("../views/TestView.vue"),
      footer: () => import("@/components/TestFooter.vue"),
    },
    props: {
      footer: {
        value: "Something beautiful!!!!!",
      },
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
