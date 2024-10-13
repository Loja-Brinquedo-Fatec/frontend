<template>
  <div class="container">
    <h2>Cadastrar Novo Brinquedo</h2>
    <form @submit.prevent="handleSubmit" class="form">
      <input
        type="text"
        name="nome"
        v-model="form.nome"
        placeholder="Nome"
        required
      />
      <textarea
        name="descricao"
        v-model="form.descricao"
        placeholder="Descrição"
        required
      ></textarea>
      <input
        type="text"
        name="categoria"
        v-model="form.categoria"
        placeholder="Categoria"
        required
      />
      <input
        type="text"
        name="marca"
        v-model="form.marca"
        placeholder="Marca"
        required
      />
      <input
        type="url"
        name="imagem"
        v-model="form.imagem"
        placeholder="URL da Imagem"
        required
      />
      <input
        type="number"
        step="0.01"
        name="preco"
        v-model.number="form.preco"
        placeholder="Preço"
        required
      />
      <input
        type="number"
        name="quantidade"
        v-model.number="form.quantidade"
        placeholder="Quantidade"
        required
      />
      <textarea
        name="detalhes"
        v-model="form.detalhes"
        placeholder="Detalhes"
        required
      ></textarea>
      <button type="submit" class="button">Salvar</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useBrinquedosStore, Brinquedo } from '../stores/brinquedos';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'CadastroBrinquedo',
  setup() {
    const brinquedosStore = useBrinquedosStore();
    const router = useRouter();
    const form = reactive<Omit<Brinquedo, 'id'>>({
      nome: '',
      descricao: '',
      categoria: '',
      marca: '',
      imagem: '',
      preco: 0,
      detalhes: '',
      quantidade: 0,
    });

    const handleSubmit = () => {
      // Validar os dados antes de adicionar
      if (form.nome && form.preco && form.quantidade) {
        brinquedosStore.adicionarBrinquedo({ ...form });
        alert('Brinquedo cadastrado com sucesso!');
        router.push('/admin');
      } else {
        alert('Por favor, preencha todos os campos obrigatórios.');
      }
    };

    return { form, handleSubmit };
  },
});
</script>

<style scoped>
.container {
  padding: 20px;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
}
input,
textarea {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.button {
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
