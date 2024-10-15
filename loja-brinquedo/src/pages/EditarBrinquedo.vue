<template>
  <div class="edit-item">
    <h1>Editar Produto</h1>
    <form @submit.prevent="updateProduct">
      <input
        type="text"
        name="nome"
        v-model="product.nome"
        placeholder="Nome"
        required
      />
      <textarea
        name="descricao"
        v-model="product.descricao"
        placeholder="Descrição"
        required
      ></textarea>
      <input
        type="text"
        name="categoria"
        v-model="product.categoria"
        placeholder="Categoria"
        required
      />
      <input
        type="text"
        name="marca"
        v-model="product.marca"
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
        v-model.number="product.preco"
        placeholder="Preço"
        required
      />
      <label for="">Quantidade</label>
      <input
        type="number"
        name="quantidade"
        v-model.number="product.quantidade"
        placeholder="Quantidade"
        required
      />
      <textarea
        name="detalhes"
        v-model="product.detalhes"
        placeholder="Detalhes"
        required
      ></textarea>
      <button type="submit" class="btn btn-success">Salvar</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useBrinquedosStore } from '../stores/brinquedos'; // Importando a loja Pinia

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useBrinquedosStore();

    // Criar um estado reativo para o produto
    const product = ref({
      id: 0,
      nome: '',
      preco: 0,
      descricao: '',
      categoria: '',
      marca: '',
      imagem: '', // Agora pode armazenar o URL ou o arquivo de imagem
      quantidade: 0,
      detalhes: '',
    });

    let imagemSelecionada: File | null = null; // Variável para armazenar o arquivo de imagem selecionado

    // Monta o produto quando o componente é montado
    onMounted(() => {
      const id = Number(route.params.id);
      const brinquedo = store.brinquedos.find(b => b.id === id);
      if (brinquedo) {
        product.value = { ...brinquedo };
      }
    });

    // Manipulador de mudança de arquivo (para capturar a imagem selecionada)
    const handleImageChange = (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        imagemSelecionada = input.files[0]; // Armazena o arquivo selecionado
        product.value.imagem = URL.createObjectURL(imagemSelecionada); // Exibe a imagem localmente
      }
    };

    // Atualiza o produto
    const updateProduct = () => {
      // Se uma nova imagem foi selecionada, ela é tratada aqui
      if (imagemSelecionada) {
        // Aqui você pode adicionar a lógica para enviar a imagem para o servidor se necessário
        // Exemplo: adicionar ao FormData para ser enviado via API
        const formData = new FormData();
        formData.append('imagem', imagemSelecionada);
        // Adiciona os outros campos ao formData
        formData.append('nome', product.value.nome);
        formData.append('preco', product.value.preco.toString());
        formData.append('descricao', product.value.descricao);
        formData.append('categoria', product.value.categoria);
        formData.append('marca', product.value.marca);
        formData.append('quantidade', product.value.quantidade.toString());
        formData.append('detalhes', product.value.detalhes);
        // Aqui você pode enviar formData para um servidor, se houver uma API
      }

      // Atualiza o produto na store Pinia
      store.editarBrinquedo(product.value.id, {
        nome: product.value.nome,
        preco: product.value.preco,
        descricao: product.value.descricao,
        categoria: product.value.categoria,
        marca: product.value.marca,
        imagem: product.value.imagem, // Usa o novo URL da imagem se alterado
        quantidade: product.value.quantidade,
        detalhes: product.value.detalhes,
      });

      router.push({ name: 'Catalogo' }); // Redireciona após a atualização
    };

    return {
      product,
      handleImageChange,
      updateProduct,
    };
  },
});
</script>

<style scoped>
.edit-item {
  max-width: 600px;
  margin: auto;
}

form {
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
