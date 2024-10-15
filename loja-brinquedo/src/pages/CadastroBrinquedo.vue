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
      <label for="">Preço</label>
      <input
        type="number"
        step="0.01"
        name="preco"
        v-model.number="form.preco"
        placeholder="Preço"
        required
      />
      <label for="">Quantidade</label>
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
      <button type="submit" class="btn btn-success">Salvar</button>
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
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
input,
textarea {
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.3s, box-shadow 0.3s;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Cor do texto do placeholder */
input::placeholder,
textarea::placeholder {
  color: #888;
  font-style: italic;
}

.label{
  width: 100%;
  text-align: left;
}

/* Estilo de foco (quando o input é clicado) */
input:focus,
textarea:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
}

/* Estilo do botão de upload de arquivo */
input[type="file"] {
  padding: 0;
  border: none;
  background-color: transparent;
  font-size: 16px;
}

/* Estilo especial para o botão de upload (estilizado para parecer um botão) */
input[type="file"]::file-selector-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

input[type="file"]::file-selector-button:hover {
  background-color: #0056b3;
}

/* Estilo para o botão submit */
button {
  display: block;
  width: 100%;
  padding: 12px;
  background-color: #28a745;
  color: white;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #218838;
}
</style>
