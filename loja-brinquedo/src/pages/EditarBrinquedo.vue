<template>
  <div class="edit-item">
    <h1>Editar Produto</h1>
    <form @submit.prevent="updateProduct">
      <div class="form-group">
        <label for="nome">Nome:</label>
        <input type="text" id="nome" v-model="product.nome" required />
      </div>

      <div class="form-group">
        <label for="preco">Preço:</label>
        <input type="number" id="preco" v-model="product.preco" required />
      </div>

      <div class="form-group">
        <label for="descricao">Descrição:</label>
        <textarea id="descricao" v-model="product.descricao" required></textarea>
      </div>

      <div class="form-group">
        <label for="categoria">Categoria:</label>
        <input type="text" id="categoria" v-model="product.categoria" required />
      </div>

      <div class="form-group">
        <label for="marca">Marca:</label>
        <input type="text" id="marca" v-model="product.marca" required />
      </div>

      <div class="form-group">
        <label for="imagem">Imagem do Produto:</label>
        <!-- Alteração: campo de upload de arquivo -->
        <input type="file" id="imagem" @change="handleImageChange" accept="image/*" />
        <!-- Exibir a imagem selecionada (opcional) -->
        <img v-if="product.imagem" :src="product.imagem" alt="Pré-visualização da imagem" class="image-preview"/>
      </div>

      <div class="form-group">
        <label for="quantidade">Quantidade:</label>
        <input type="number" id="quantidade" v-model="product.quantidade" required />
      </div>

      <div class="form-group">
        <label for="detalhes">Detalhes:</label>
        <textarea id="detalhes" v-model="product.detalhes" required></textarea>
      </div>

      <button type="submit">Atualizar Produto</button>
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

.form-group {
  margin-bottom: 1em;
}

label {
  display: block;
  margin-bottom: 0.5em;
}

input,
textarea {
  width: 100%;
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.image-preview {
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin-top: 10px;
}
</style>
