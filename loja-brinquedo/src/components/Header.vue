<template>
    <header class="header">
      <h1>Loja de Brinquedos</h1>
      <nav>
        <router-link to="/" class="link">Home</router-link>
        <router-link to="/catalogo" class="link">Catálogo</router-link>
        <router-link to="/admin" class="link">Admin</router-link>
        <router-link to="/sobre" class="link">Sobre a Equipe</router-link>
      </nav>
    </header>
  </template>
  
  <script>
  export default {
    name: 'Header',
  };
  </script>
  
  <style scoped>
  .header {
    background-color: #ffcc00;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .link {
    margin: 0 10px;
    text-decoration: none;
    color: #333;
  }
  </style>
  