<template>
  <header :class="headerClass" class="header">
    <img src="../assets/logoToyStory.png" alt="" class="logo">
    <nav>
      <router-link 
        to="/" 
        class="link" 
        :class="{ active: activeLink === 'home' }" 
        @click="setActiveLink('home')"
      >Home</router-link>

      <router-link 
        to="/catalogo" 
        class="link" 
        :class="{ active: activeLink === 'catalogo' }" 
        @click="setActiveLink('catalogo')"
      >Catálogo</router-link>

      <router-link 
        to="/admin" 
        class="link" 
        :class="{ active: activeLink === 'admin' }" 
        @click="setActiveLink('admin')"
      >Admin</router-link>

      <router-link 
        to="/sobre" 
        class="link" 
        :class="{ active: activeLink === 'sobre' }" 
        @click="setActiveLink('sobre')"
      >Sobre a Equipe</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      activeLink: 'home', // Define o link inicial como 'home'
    };
  },
  methods: {
    setActiveLink(link) {
      this.activeLink = link; // Atualiza o link ativo
    },
  },
};
</script>

<style scoped>
.header {
  padding: 10px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.logo{
  width: 20%;
}

nav {
  /* margin-top: 20px; */
}

.link {
  margin: 0 10px;
  text-decoration: none;
  color: #333;
  padding: 5px;
  border-radius: 4px;
  transition: border 0.3s ease, color 0.3s ease;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.link:hover {
  color: #ff8f7d;
}

.active {
  border-bottom: 2px solid #ff8f7d; /* A borda de cor para o link ativo */
  border-top: 2px solid #ff8f7d; /* A borda de cor para o link ativo */
  color: #ff8f7d; /* Cor do texto para o link ativo */
  margin: 0;
}
</style>
