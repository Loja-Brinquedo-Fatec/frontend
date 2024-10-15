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
      <div v-for="brinquedo in brinquedosFiltrados" :key="brinquedo.id" class="card" style="width: 18rem;">
        <img :src="brinquedo.imagem" :alt="brinquedo.nome" class="image" />
        <div class="card-body">
          <h5 class="card-title">{{ brinquedo.nome }}</h5>
          <p class="card-text">{{ brinquedo.descricao }}</p>
          <p>R$ {{ brinquedo.preco.toFixed(2) }}</p>
        </div>
        <div class="card-body">
          <router-link :to="`/detalhes/${brinquedo.id}`" class="link"> <button class="btn btn-success">Ver
              Detalhes</button> </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref } from 'vue';
import { useBrinquedosStore, Brinquedo } from '../stores/brinquedos';

export default defineComponent({
  name: 'Catalogo',
  setup() {
    const brinquedosStore = useBrinquedosStore();
    const filtro = ref<string>('');
    const categoriaSelecionada = ref<string>('');

    onMounted(() => {
      brinquedosStore.carregarBrinquedos();
    });

    const categorias = computed<string[]>(() => {
      const cats = brinquedosStore.brinquedos.map(b => b.categoria);
      return Array.from(new Set(cats));
    });

    const brinquedosFiltrados = computed<Brinquedo[]>(() => {
      return brinquedosStore.brinquedos.filter(b => {
        const correspondeNome = b.nome.toLowerCase().includes(filtro.value.toLowerCase());
        const correspondeCategoria =
          categoriaSelecionada.value === '' || b.categoria === categoriaSelecionada.value;
        return correspondeNome && correspondeCategoria;
      });
    });

    return { filtro, categoriaSelecionada, categorias, brinquedosFiltrados };
  },
});
</script>

<style scoped>
.container {
  width: 100%;
}
.filtros {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  width: 100%;
  justify-content: center;
}
.input {
  flex: 1;
  padding: 8px;
  width: 10px;
}
.select {
  padding: 8px;
}
.grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin: 20px;
  margin-bottom: 20dvh;
}

.card {
 padding: 10px;
}

.image{
  width: 100%;
  height: auto;
  max-height: 200px;
  object-fit: cover;
  border-radius: 8px;
}

p{
  text-align: left;
}
</style>
