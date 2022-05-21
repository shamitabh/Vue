<template>
  <div class="home">Home</div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class HomeView extends Vue {
  name: string;
}
</script>
