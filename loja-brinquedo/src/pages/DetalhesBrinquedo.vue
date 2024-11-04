<template>
  <div v-if="brinquedo" class="container">
    <img :src="brinquedo.imagem" :alt="brinquedo.nome" class="image" />
    <div class="info">
      <div class="top">
        <p><strong>Cód:</strong> {{ brinquedo.id }}</p>
      <p>Quantidade: {{ brinquedo.quantidade }}</p>
      <p><strong>Categoria:</strong> {{ brinquedo.categoria }}</p>
      </div>
      
      <div class="principal">
      <p><strong>Marca:</strong> {{ brinquedo.marca }}</p>
      <h1>{{ brinquedo.nome }}</h1>
      <h2><strong>Preço:</strong> R$ {{ brinquedo.preco.toFixed(2) }}</h2>
      </div>

      <div class="bottom">
        <p><strong>Descrição:</strong> {{ brinquedo.descricao }}</p>
      <p><strong>Detalhes:</strong> {{ brinquedo.detalhes }}</p>
      </div>

      
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
  gap: 20px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  width: 100%;
  margin: auto;
  background-color: #fafafa;
}
.image {
  width: 300px;
  height: 300px;
  object-fit: cover;
  background-color: aquamarine; 
  flex: 1;
}
.info {
  flex: 1;
  text-align: left;
  margin: 10px;
}
.top{
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.principal{
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
