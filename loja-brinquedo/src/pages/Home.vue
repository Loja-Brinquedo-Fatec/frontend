<template>
  <div class="container">
    <h2>Todos os Brinquedos</h2>
    <div class="grid">
      <div v-for="brinquedo in brinquedos" :key="brinquedo.id" class="card">
        <img :src="brinquedo.imagem" :alt="brinquedo.nome" class="image" />
        <h3>{{ brinquedo.nome }}</h3>
        <p>Preço: R$ {{ brinquedo.preco.toFixed(2) }}</p>
        <p>{{ brinquedo.descricao }}</p>
        <router-link :to="`/detalhes/${brinquedo.id}`">Ver Detalhes</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue';
import { useBrinquedosStore, Brinquedo } from '../stores/brinquedos';

export default defineComponent({
  name: 'Home',
  setup() {
    const brinquedosStore = useBrinquedosStore();
    onMounted(() => {
      brinquedosStore.carregarBrinquedos();
    });

    const brinquedos = computed<Brinquedo[]>(() => brinquedosStore.brinquedos);

    return { brinquedos };
  },
});
</script>

<style scoped>
.container {
  padding: 20px;
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
