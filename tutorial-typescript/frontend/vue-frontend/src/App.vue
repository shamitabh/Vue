<template>
  <div id="wrapper">
    <!-- header -->
    <Header />

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
import store from "@/store";

@Options({
  components: {
    Header,
    Footer,
  },
})
export default class App extends Vue {
  beforeCreate() {
    store.commit("cart/initializeStore");
  }
}
</script>

<style lang="scss">
@import "../node_modules/bulma";
</style>
