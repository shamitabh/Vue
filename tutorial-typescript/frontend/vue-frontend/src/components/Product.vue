<template>
  <div class="box">
    <figure class="image mb-4">
      <img :src="absoluteThumbnailUrl" :alt="product.name" />
    </figure>
    <h3 class="is-size-4">{{ product.name }}</h3>
    <p class="is-size-6 has-text-grey">INR {{ product.price }}</p>
    <router-link :to="product.absolute_url" class="button is-dark mt-4"
      >View details</router-link
    >
  </div>
</template>

<script lang="ts">
import { prop, Vue } from "vue-class-component";
import { productType } from "@/interfaces";

class Props {
  product: productType = prop({ required: true });
}

export default class Product extends Vue.with(Props) {
  get absoluteThumbnailUrl() {
    return process.env.VUE_APP_BASE_API + this.product.thumbnail;
  }
}
</script>

<style lang="scss" scoped>
$image-margin: -1.25rem;
.image {
  margin-top: $image-margin;
  margin-left: $image-margin;
  margin-right: $image-margin;
}
</style>