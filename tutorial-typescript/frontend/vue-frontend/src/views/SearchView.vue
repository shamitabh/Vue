<template>
  <div class="page-search">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Search</h1>
        <h2 class="is-size-5 has-text-grey">Search term: "{{ query }}"</h2>
      </div>

      <ProductBox :products="products" />
    </div>
  </div>
</template>

<script lang="ts">
import { searchProductsApi } from "@/api";
import ProductBox from "@/components/ProductBox.vue";
import { productType } from "@/interfaces";
import { Options, Vue } from "vue-class-component";

@Options({
  components: {
    ProductBox,
  },
})
export default class SearchView extends Vue {
  products: productType[] = [];

  created() {
    searchProductsApi(this.query).then((data) => {
      this.products = data;
    });

    // set page title
    document.title = "Search | Djackets";
  }

  get query() {
    return this.$route.query.query;
  }
}
</script>

<style>
</style>