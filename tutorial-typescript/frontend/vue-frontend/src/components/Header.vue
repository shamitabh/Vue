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
      <div class="navbar-start">
        <div class="navbar-item">
          <form action="/search">
            <div class="field has-addons">
              <div class="control">
                <input
                  type="text"
                  class="input"
                  placeholder="What are you looking for?"
                  name="query"
                />
              </div>
              <div class="control">
                <button class="button is-success">
                  <span class="icon">
                    <i class="fa-solid fa-magnifying-glass"></i>
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="navbar-end">
        <router-link to="/summer" class="navbar-item">Summer</router-link>
        <router-link to="/winter" class="navbar-item">Winter</router-link>
        <div class="navbar-item">
          <div class="buttons">
            <button
              @click="onLogout"
              class="button is-danger"
              v-if="isAuthenticated"
            >
              Logout
            </button>
            <router-link to="/login" class="button is-light" v-else
              >Login</router-link
            >
            <router-link to="/cart" class="button is-success">
              <span class="icon">
                <i class="fa-solid fa-cart-shopping"></i>
              </span>
              <span>Cart ({{ cartTotalLength }})</span>
            </router-link>
          </div>
        </div>
        <router-link to="/account" class="navbar-item" v-show="username">{{
          username
        }}</router-link>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { toast } from "bulma-toast";
import { Vue } from "vue-class-component";
import { namespace } from "vuex-class";

const cart = namespace("cart");
const auth = namespace("auth");

export default class Header extends Vue {
  showMobileMenu: boolean = false;
  @cart.Getter cartTotalLength!: number;
  @auth.State isAuthenticated!: boolean;
  @auth.State username!: boolean;
  @auth.Action logout!: () => Promise<void>;

  onLogout() {
    this.logout().then(() => {
      toast({
        message: "Logged out successfully.",
        type: "is-success",
      });
      this.$router.push({ name: "login" });
    });
  }
}
</script>