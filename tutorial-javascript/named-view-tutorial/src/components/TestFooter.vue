<template>
  <div>
    <h2>About Footer</h2>
    <p>Prop provided - {{ value }}</p>
  </div>
</template>

<script>
export default {
  name: "TestFooter",
  props: {
    value: {
      required: true,
    },
  },
};
</script>