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
      <div class="card" v-for="brinquedo in brinquedosFiltrados" :key="brinquedo.id">
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
             <button class="btn"><img src="../assets/icons8-carrinho-24.png" alt="">
              Comprar</button>
            </router-link>
          </div>
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
  -webkit-line-clamp: 2; /* Limite de 2 linhas */
  line-height: 1.5em; /* Altura da linha */
  max-height: 3em; /* Altura máxima do elemento = 2 * line-height */
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
  /* border: 1px solid #252525; */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  /* padding: .3em; */
  cursor: pointer;
  border-radius: 6px;
  transition: .3s ease-in-out;
  /* background-color: #23d100; */
  /* border: 1px solid #1e85c9; */
  background-color: #22a800;
  color: #ffff;
  /* padding: 3px; */
}

.btn{
  color: #f1f1f1;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
}

.card-button img{
  width: 15px;
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

p{
  text-align: left;
}
</style>
