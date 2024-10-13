<template>
  <div id="app">
    <!-- Componente de Cabeçalho -->
    <Header />

    <!-- Renderiza a página correspondente à rota atual -->
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from './components/Header.vue'; // Certifique-se de que o caminho está correto

export default defineComponent({
  name: 'App',
  components: {
    Header, // Registra o componente Header
  },
});
</script>

<style>
/* Estilos Globais */
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

#app {
  text-align: center;
}
</style>
