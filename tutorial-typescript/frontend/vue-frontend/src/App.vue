<template>
  <div id="wrapper">
    <!-- header -->
    <Header />

    <!-- loader -->
    <Loader />

    <!-- main content -->
    <section class="section">
      <router-view />
    </section>

    <!-- footer -->
    <Footer />
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Loader from "@/components/Loader.vue";
import { namespace } from "vuex-class";

const auth = namespace("auth");
const cart = namespace("cart");

@Options({
  components: {
    Header,
    Footer,
    Loader,
  },
})
export default class App extends Vue {
  @auth.Mutation initializeAuth!: () => void;
  @cart.Mutation initializeCart!: () => void;

  created() {
    this.initializeAuth();
    this.initializeCart();
  }
}
</script>

<style lang="scss">
@import "../node_modules/bulma";
</style>
