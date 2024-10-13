<template>
  <div v-if="brinquedo" class="container">
    <img :src="brinquedo.imagem" :alt="brinquedo.nome" class="image" />
    <div class="info">
      <h2>{{ brinquedo.nome }}</h2>
      <p><strong>Código:</strong> {{ brinquedo.id }}</p>
      <p><strong>Descrição:</strong> {{ brinquedo.descricao }}</p>
      <p><strong>Quantidade:</strong> {{ brinquedo.quantidade }}</p>
      <p><strong>Preço:</strong> R$ {{ brinquedo.preco.toFixed(2) }}</p>
      <p><strong>Categoria:</strong> {{ brinquedo.categoria }}</p>
      <p><strong>Marca:</strong> {{ brinquedo.marca }}</p>
      <p><strong>Detalhes:</strong> {{ brinquedo.detalhes }}</p>
    </div>
  </div>
  <p v-else>Brinquedo não encontrado.</p>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue';
import { useBrinquedosStore, Brinquedo } from '../stores/brinquedos';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'DetalhesBrinquedo',
  setup() {
    const brinquedosStore = useBrinquedosStore();
    const route = useRoute();
    const idParam = route.params.id;

    const id = typeof idParam === 'string' ? parseInt(idParam, 10) : NaN;

    onMounted(() => {
      brinquedosStore.carregarBrinquedos();
    });

    const brinquedo = computed<Brinquedo | undefined>(() =>
      brinquedosStore.brinquedos.find(b => b.id === id)
    );

    return { brinquedo };
  },
});
</script>

<style scoped>
.container {
  display: flex;
  padding: 20px;
  gap: 20px;
}
.image {
  width: 300px;
  height: 300px;
  object-fit: cover;
}
.info {
  flex: 1;
}
</style>
