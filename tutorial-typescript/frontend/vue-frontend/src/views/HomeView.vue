<template>
  <div class="home">
    <section class="hero is-medium is-dark mb-6">
      <div class="herobody has-text-centered">
        <p class="title mb-6">Welcome to Djackets</p>
        <p class="subtitle">The best clothes store online</p>
      </div>
    </section>

    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">Latest products</h2>
      </div>
      <div
        class="column is-3"
        v-for="product in latestProducts"
        :key="product.id"
      >
        <Product :product="product" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Product from "@/components/Product.vue";
import { productType } from "@/interfaces";
import { getLatestProductsApi } from "@/api";

@Options({
  components: {
    Product,
  },
})
export default class HomeView extends Vue {
  latestProducts: productType[] = [];

  mounted() {
    this.getLatestProducts();

    // set page title
    document.title = "Home | Djackets";
  }

  getLatestProducts() {
    getLatestProductsApi().then((data) => {
      this.latestProducts = data;
    });
  }
}
</script>