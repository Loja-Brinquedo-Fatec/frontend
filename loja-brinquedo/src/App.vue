<template>
  <div id="app">

    <Header />
    <router-view />
    <Footer />

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from './components/Header.vue'; 
import Footer from './components/Footer.vue'; 

export default defineComponent({
  name: 'App',
  components: {
    Header, 
    Footer, 
  },
});
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  overflow-x: hidden;
}

#app {
  text-align: center;
}
</style>
