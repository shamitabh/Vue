<template>
  <div class="page-my-account">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">My account</h1>
      </div>

      <div class="column is-12">
        <button @click="onLogout" class="button is-danger">Logout</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { toast } from "bulma-toast";
import { Vue } from "vue-class-component";
import { namespace } from "vuex-class";

const auth = namespace("auth");

export default class AccountView extends Vue {
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

<style>
</style>