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
      <!-- Alteração: campo de upload de arquivo -->
      <input
        type="file"
        name="imagem"
        @change="handleImageChange"
        accept="image/*"
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
    
    // Estado reativo para armazenar os dados do formulário, incluindo a imagem
    const form = reactive<Omit<Brinquedo, 'id'>>({
      nome: '',
      descricao: '',
      categoria: '',
      marca: '',
      imagem: '', // Isso agora armazenará o nome ou URL da imagem
      preco: 0,
      detalhes: '',
      quantidade: 0,
    });

    let imagemSelecionada: File | null = null; // Variável para armazenar o arquivo selecionado

    // Manipulador de mudança de arquivo (para capturar a imagem selecionada)
    const handleImageChange = (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        imagemSelecionada = input.files[0]; // Armazena o arquivo selecionado
        form.imagem = URL.createObjectURL(imagemSelecionada); // Opcional: exibe a imagem localmente
      }
    };

    const handleSubmit = () => {
      if (form.nome && form.preco && form.quantidade && imagemSelecionada) {
        // Aqui você pode enviar a imagem selecionada junto com os outros dados
        const formData = new FormData();
        formData.append('nome', form.nome);
        formData.append('descricao', form.descricao);
        formData.append('categoria', form.categoria);
        formData.append('marca', form.marca);
        formData.append('imagem', imagemSelecionada); // Adiciona o arquivo de imagem
        formData.append('preco', form.preco.toString());
        formData.append('quantidade', form.quantidade.toString());
        formData.append('detalhes', form.detalhes);

        brinquedosStore.adicionarBrinquedo({ ...form }); // Simula a adição de brinquedo
        alert('Brinquedo cadastrado com sucesso!');
        router.push('/admin');
      } else {
        alert('Por favor, preencha todos os campos obrigatórios.');
      }
    };

    return { form, handleImageChange, handleSubmit };
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
