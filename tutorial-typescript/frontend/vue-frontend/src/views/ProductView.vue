<template>
  <div class="page-product">
    <div class="columns is-multiline">
      <div class="column is-9">
        <figure class="image mb-6">
          <img :src="absoluteImageUrl" :alt="product.name" />
        </figure>
        <h1 class="title">{{ product.name }}</h1>
        <p>{{ product.description }}</p>
      </div>
      <div class="column is-3">
        <h2 class="subtitle">Information</h2>
        <p><strong>Price: </strong>${{ product.price?.toFixed(2) }}</p>
        <div class="field has-addons mt-6">
          <div class="control">
            <input type="number" class="input" min="1" v-model="quantity" />
          </div>
          <div class="control">
            <a class="button is-dark" @click="updateCart">Add to cart</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { cartItemType, productType } from "@/interfaces";
import { getProductApi } from "@/api";
import { namespace } from "vuex-class";

const cart = namespace("cart");

export default class ProductView extends Vue {
  product: productType = {};
  quantity: number = 1;
  @cart.Mutation addToCart!: (item: cartItemType) => void;

  created() {
    this.getProduct();
  }

  get categorySlug() {
    return this.$route.params.categorySlug;
  }

  get productSlug() {
    return this.$route.params.productSlug;
  }

  get absoluteImageUrl() {
    return process.env.VUE_APP_BASE_API + this.product.image;
  }

  get cartItem() {
    return {
      product: this.product,
      quantity: this.quantity,
    };
  }

  getProduct() {
    getProductApi(this.categorySlug, this.productSlug).then((data) => {
      this.product = data;

      // set page title
      document.title = `${this.product.name} | Djackets`;
    });
  }

  updateCart() {
    if (this.quantity < 1) {
      this.quantity = 1;
    }

    this.addToCart(this.cartItem);
  }
}
</script>

<style>
</style>