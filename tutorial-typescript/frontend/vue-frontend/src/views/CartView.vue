<template>
  <div class="page-cart">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Cart</h1>
      </div>

      <div class="column is-12 box">
        <table class="table is-fullwidth" v-if="cartTotalLength">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <CartItem
              v-for="item in cart.items"
              :key="item.product.id"
              :item="item"
              @removeFromCart="removeFromCart"
            />
          </tbody>
        </table>

        <p v-else>You don't have any product in your cart...</p>
      </div>

      <div class="column is-12 box" v-show="cartTotalLength">
        <h2 class="subtitle">Summary</h2>
        <strong>INR {{ cartTotalPrice.toFixed(2) }}</strong
        >, {{ cartTotalLength }} item(s)
        <hr />
        <router-link to="/" class="button is-dark"
          >Proceed to checkout</router-link
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CartItem from "@/components/CartItem.vue";
import { cartItemType, cartType } from "@/interfaces";
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";

const cart = namespace("cart");

@Options({
  components: {
    CartItem,
  },
})
export default class CartView extends Vue {
  @cart.Getter cartTotalLength!: number;
  @cart.State cart!: cartType;
  @cart.Mutation removeFromCart!: (item: cartItemType) => void;

  get cartTotalPrice() {
    return this.cart.items.reduce(
      (sum, item) => (sum += item.quantity * item.product.price!),
      0
    );
  }
}
</script>

<style>
</style>