<template>
  <div class="container">
    <div class="banner">
      <div class="banner-content">
        <h1>Brinquedos que <span>Encantam!</span></h1>
        <p>Descubra a magia dos brinquedos que fazem a alegria das crianças.</p>
      </div>
      <div class="banner-images">
        <img src="../assets/Image  --lummi.png" alt="Brinquedo 1">
        <img src="../assets/Image  --lummi (1).png " alt="Brinquedo 2">
        <img src="../assets/Image  --lummi (2).png " alt="Brinquedo 3">
        <img src="../assets/Image  --lummi (3).png " alt="Brinquedo 4">
      </div>
    </div>
    <h2>Brinquedos em Destaque</h2>
    <div class="grid">
      <div class="card" style="width: 18rem;" v-for="brinquedo in brinquedos" :key="brinquedo.id">
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
  width: 100%;
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

.banner {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0099e0;
  padding: 40px;
  border-radius: 10px;
  /* width: 94%; */
  max-width: 100%;
  gap: 20%;
  margin-bottom: 30px;
}

.banner-content {
  max-width: 40%;
  position: relative;
}

.banner-content h1 {
  font-size: 3.5em;
  color: #fff;
  margin-bottom: 20px;
  text-align: left;
}

.banner-content h1 span {
  font-weight: bold;
  color: #ffffff;
}

.banner-content p {
  font-size: 1.2em;
  color: #f1f1f1;
  margin-bottom: 20px;
}

.banner-images {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.banner-images img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
}

.card-body p {
  text-align: left;
}
</style>
