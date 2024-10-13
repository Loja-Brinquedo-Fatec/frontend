<template>
    <div class="container">
      <h2>Catálogo de Brinquedos</h2>
      <div class="filtros">
        <input
          type="text"
          placeholder="Buscar por nome..."
          v-model="filtro"
          class="input"
        />
        <select v-model="categoriaSelecionada" class="select">
          <option value="">Todas as Categorias</option>
          <option v-for="categoria in categorias" :key="categoria" :value="categoria">
            {{ categoria }}
          </option>
        </select>
      </div>
      <div class="grid">
        <div v-for="brinquedo in brinquedosFiltrados" :key="brinquedo.id" class="card">
          <img :src="brinquedo.imagem" :alt="brinquedo.nome" class="image" />
          <h3>{{ brinquedo.nome }}</h3>
          <p>Preço: R$ {{ brinquedo.preco.toFixed(2) }}</p>
          <p>{{ brinquedo.descricao }}</p>
          <router-link :to="`/detalhes/${brinquedo.id}`">Ver Detalhes</router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useBrinquedosStore } from '../stores/brinquedos';
  import { onMounted, computed, ref } from 'vue';
  
  export default {
    name: 'Catalogo',
    setup() {
      const brinquedosStore = useBrinquedosStore();
      const filtro = ref('');
      const categoriaSelecionada = ref('');
      onMounted(() => {
        brinquedosStore.carregarBrinquedos();
      });
      const categorias = computed(() => {
        const cats = brinquedosStore.brinquedos.map(b => b.categoria);
        return [...new Set(cats)];
      });
      const brinquedosFiltrados = computed(() => {
        return brinquedosStore.brinquedos.filter(b => {
          const correspondeNome = b.nome.toLowerCase().includes(filtro.value.toLowerCase());
          const correspondeCategoria =
            categoriaSelecionada.value === '' || b.categoria === categoriaSelecionada.value;
          return correspondeNome && correspondeCategoria;
        });
      });
      return { filtro, categoriaSelecionada, categorias, brinquedosFiltrados };
    },
  };
  </script>
  
  <style scoped>
  .container {
    padding: 20px;
  }
  .filtros {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  .input {
    flex: 1;
    padding: 8px;
  }
  .select {
    padding: 8px;
  }
  .grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  .card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px;
    width: 200px;
    text-align: center;
  }
  .image {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }
  </style>
  