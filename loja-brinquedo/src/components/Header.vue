<template>
  <header :class="headerClass" class="header">
    <h1>Loja de Brinquedos</h1>
    <nav>
      <router-link to="/" class="link" @click="setActiveLink('home')">Home</router-link>
      <router-link to="/catalogo" class="link" @click="setActiveLink('catalogo')">Catálogo</router-link>
      <router-link to="/admin" class="link" @click="setActiveLink('admin')">Admin</router-link>
      <router-link to="/sobre" class="link" @click="setActiveLink('sobre')">Sobre a Equipe</router-link>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref, computed  } from 'vue';

export default defineComponent({
  setup() {
    const activeLink = ref('home'); // Estado para controlar o link ativo

    const setActiveLink = (link: string) => {
      activeLink.value = link; // Atualiza o link ativo
    };

    // Computa a classe do header com base no link ativo
    const headerClass = computed(() => {
      switch (activeLink.value) {
        case 'home':
          return 'header home-bg';
        case 'catalogo':
          return 'header catalogo-bg';
        case 'admin':
          return 'header admin-bg';
        case 'sobre':
          return 'header sobre-bg';
        default:
          return 'header';
      }
    });

    return {
      setActiveLink,
      headerClass,
    };
  },
});
</script>

<style scoped>
.header {
  background-color: #ffcc00;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease;
  /* Animação suave */
}

.home-bg{
  background-color: #f8d7da;
  /* Cor de fundo para a Home */
}

.catalogo-bg {
  background-color: #d1ecf1;
  /* Cor de fundo para o Catálogo */
}

.admin-bg {
  background-color: #d4edda;
  /* Cor de fundo para Admin */
}

.sobre-bg {
  background-color: #fff3cd;
  /* Cor de fundo para Sobre a Equipe */
}

.link {
  margin: 0 10px;
  text-decoration: none;
  color: #333;
}
</style>