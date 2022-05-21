import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

// set base url for all api requests
axios.defaults.baseURL = process.env.VUE_APP_BASE_API;

createApp(App).use(store).use(router, axios).mount("#app");
