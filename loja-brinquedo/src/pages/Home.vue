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
      <div class="card" v-for="brinquedo in brinquedos" :key="brinquedo.id">
        <div class="card-img">
          <img :src="brinquedo.imagem" :alt="brinquedo.nome" class="image" />
        </div>
        <div class="card-info">
          <p class="text-title">{{ brinquedo.nome }} </p>
          <p class="text-body">{{ brinquedo.descricao }}</p>
        </div>
        <div class="card-footer">
          <span class="text-title">R$ {{ brinquedo.preco.toFixed(2) }}</span>
          <div class="card-button">
            <router-link :to="`/detalhes/${brinquedo.id}`" class="link">
             <button class="btn"><img src="../assets/icons8-carrinho-24.png" alt="">Comprar</button>
            </router-link>
          </div>
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
  gap: 5%;
  margin: 20px;
  margin-bottom: 20dvh;
}

.image {
  height: 160px;
  width: 100%;
  border-radius: .5rem;
  transition: .3s ease;
}


/* From Uiverse.io by alexruix */
.card {
  width: 250px;
  height: 53dvh;
  padding: .8em;
  background: #f5f5f5;
  position: relative;
  overflow: visible;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.card-img {
  height: 160px;
  width: 100%;
  border-radius: .5rem;
  transition: .3s ease;
  background-color: antiquewhite;
}

.card-info {
  padding-top: 10%;
  
}

svg {
  width: 20px;
  height: 20px;
}

.card-footer {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  border-top: 1px solid #ddd;
  /* background-color: #41ff1c; */
}

/*Text*/
.text-title {
  font-weight: 900;
  font-size: 1em;
  line-height: 1.5;
}

.text-body {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  line-height: 1.5em; 
  max-height: 3em; 
  text-align: left;
}

.link{
  display: flex;
  align-items: center;
  justify-content: center ;
  color: #ffff;
}

/*Button*/
.card-button {
   display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  cursor: pointer;
  border-radius: 6px;
  transition: .3s ease-in-out;
  background-color: #22a800;
  color: #ffff;
}

.btn{
  color: #f1f1f1;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
}

/*Hover*/
.card-img:hover {
  transform: translateY(-25%);
  box-shadow: rgba(73, 70, 58, 0.25) 0px 13px 47px -5px, rgba(180, 71, 71, 0.3) 0px 8px 16px -8px;
}

h2{
  font-family: "Poppins", sans-serif;
  font-weight: 600;
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
