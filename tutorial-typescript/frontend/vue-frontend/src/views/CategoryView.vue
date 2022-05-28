<template>
  <div class="page-category">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">
          {{ category.name }}
        </h2>
      </div>

      <ProductBox :products="category.products" />
    </div>
  </div>
</template>

<script lang="ts">
import { getCategoryApi } from "@/api";
import ProductBox from "@/components/ProductBox.vue";
import { productType } from "@/interfaces";
import { Options, Vue } from "vue-class-component";
import { RouteLocation } from "vue-router";

interface CategoryType {
  id?: number;
  name?: string;
  slug?: string;
  products?: productType[];
}

@Options({
  components: {
    ProductBox,
  },
  watch: {
    categorySlug: {
      handler(newVal: string, _oldVal: string) {
        getCategoryApi(newVal).then((data) => {
          this.category = data;

          // set page title
          document.title = `${this.category.name} | Djackets`;
        });
      },
      immediate: true,
    },
  },
})
export default class CategoryView extends Vue {
  category: CategoryType = {};

  get categorySlug() {
    return this.$route.params.category_slug;
  }
}
</script>

<style>
</style>
