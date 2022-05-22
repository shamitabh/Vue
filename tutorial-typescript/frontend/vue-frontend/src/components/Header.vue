<template>
  <nav class="navbar is-dark">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item"
        ><strong>Djackets</strong></router-link
      >
      <a
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbar-menu"
        @click="showMobileMenu = !showMobileMenu"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div
      class="navbar-menu"
      id="navbar-menu"
      :class="{ 'is-active': showMobileMenu }"
    >
      <div class="navbar-end">
        <router-link to="/summer" class="navbar-item">Summer</router-link>
        <router-link to="/winter" class="navbar-item">Winter</router-link>
        <div class="navbar-item">
          <div class="buttons">
            <router-link to="/login" class="button is-light"
              >Log in</router-link
            >
            <router-link to="/cart" class="button is-success">
              <span class="icon">
                <i class="fa-solid fa-cart-shopping"></i>
              </span>
              <span>Cart ({{ cartTotalLength }})</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { cartType } from "@/interfaces";

export default class Header extends Vue {
  showMobileMenu: boolean = false;
  cart: cartType = {
    items: [],
  };

  get cartTotalLength() {
    return this.cart.items.reduce(
      (sum, item) => (sum = sum + item.quantity),
      0
    );
  }
}
</script>