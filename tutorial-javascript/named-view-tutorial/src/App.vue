<template>
  <div id="app">
    <router-link :to="{ name: 'home' }">Home</router-link>
    <router-link :to="{ name: 'about' }">About</router-link>
    <router-link :to="{ name: 'test' }">Test</router-link>

    <!-- By default MAIN view will show both the route contents('Home', 'About' and 'Test'). But the 'footer' secion will not be shown in 'About' and 'Test' page. -->
    <!-- If NAMED view is enabled, then MAIN view will only show contents for 'Home' page, instead NAMED view will take care of 'About' and 'Test' page, where the 'footer' will be shown. -->

    <!-- MAIN view -->
    <router-view />

    <!-- NAMED view -->
    <router-view name="footer" />
  </div>
</template>

<style>
</style>
