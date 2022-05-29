<template>
  <tr>
    <td>{{ item.product.name }}</td>
    <td>{{ item.product.price?.toFixed(2) }}</td>
    <td>{{ item.quantity }}</td>
    <td>{{ itemTotal.toFixed(2) }}</td>
  </tr>
</template>

<script lang="ts">
import { cartItemType } from "@/interfaces";
import { prop, Vue } from "vue-class-component";

class Props {
  item: cartItemType = prop({ required: true });
}

export default class CheckoutItem extends Vue.with(Props) {
  get itemTotal() {
    return this.item.quantity * this.item.product.price!;
  }
}
</script>

<style>
</style>