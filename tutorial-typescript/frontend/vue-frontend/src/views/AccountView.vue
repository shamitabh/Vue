<template>
  <div class="page-my-account">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">My account</h1>
      </div>

      <div class="column is-12">
        <p class="subtitle">
          User ID - <strong>{{ username }}</strong>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { namespace } from "vuex-class";

const auth = namespace("auth");

export default class AccountView extends Vue {
  @auth.State username!: string;
}
</script>

<style>
</style>