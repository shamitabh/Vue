<template>
  <tr>
    <td>
      <router-link :to="item.product.absolute_url">{{
        item.product.name
      }}</router-link>
    </td>
    <td>{{ item.product.price?.toFixed(2) }}</td>
    <td>
      {{ item.quantity }}
      <a @click="decrementQuantity(item)"> - </a>
      <a @click="incrementQuantity(item)"> + </a>
    </td>
    <td>INR {{ itemTotal.toFixed(2) }}</td>
    <td><button class="delete" @click="removeFromCart(item)"></button></td>
  </tr>
</template>

<script lang="ts">
import { cartItemType, cartType } from "@/interfaces";
import { prop, Vue } from "vue-class-component";
import { namespace } from "vuex-class";

const cart = namespace("cart");

class Props {
  item: cartItemType = prop({
    required: true,
  });
}

export default class CartItem extends Vue.with(Props) {
  @cart.State cart!: cartType;

  get itemTotal() {
    return this.item.quantity * this.item.product.price!;
  }

  decrementQuantity(item: cartItemType) {
    item.quantity--;

    if (!item.quantity) {
      this.removeFromCart(item);
    } else {
      this.updateCart();
    }
  }

  incrementQuantity(item: cartItemType) {
    item.quantity++;
    this.updateCart();
  }

  removeFromCart(item: cartItemType) {
    this.$emit("removeFromCart", item);
    this.updateCart();
  }

  updateCart() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }
}
</script>

<style>
</style>