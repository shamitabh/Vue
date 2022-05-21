<template>
  <div class="home">
    <section class="hero is-medium is-dark mb-6">
      <div class="herobody has-text-centered">
        <p class="title mb-6">Welcome to Mantra</p>
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
        <div class="box">
          <figure class="image mb-4">
            <img :src="get_thumbnail(product.thumbnail)" :alt="product.name" />
          </figure>
          <h3 class="is-size-4">{{ product.name }}</h3>
          <p class="is-size-6 has-text-grey">INR {{ product.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import axios, { AxiosResponse } from "axios";

@Options({})
export default class HomeView extends Vue {
  latestProducts: any[] = [];

  created() {
    this.get_latest_products();
  }

  get_thumbnail(thumbnail: string) {
    return process.env.VUE_APP_BASE_API + thumbnail;
  }

  async get_latest_products() {
    try {
      let response: AxiosResponse = await axios.get("/api/products/latest");
      this.latestProducts = response.data;
    } catch (error) {
      console.log(error);
    }
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