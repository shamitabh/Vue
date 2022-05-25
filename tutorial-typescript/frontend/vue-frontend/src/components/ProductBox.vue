<template>
  <div class="column is-3" v-for="product in products" :key="product.id">
    <Product :product="product" />
  </div>
</template>

<script lang="ts">
import { productType } from "@/interfaces";
import { Options, prop, Vue } from "vue-class-component";
import Product from "./Product.vue";

class Props {
  products: productType[] = prop({ required: true });
}

@Options({
  components: {
    Product,
  },
})
export default class ProductBox extends Vue.with(Props) {}
</script>

<style>
</style>