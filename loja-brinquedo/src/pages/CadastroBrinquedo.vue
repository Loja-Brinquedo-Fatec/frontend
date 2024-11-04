<template>
  <div class="container">
    <h2>Cadastrar Novo Brinquedo</h2>

    <form @submit.prevent="handleSubmit" class="form">
      <input type="text" name="nome" v-model="form.nome" placeholder="Nome" required />
      <input name="descricao" v-model="form.descricao" placeholder="Descrição" required />
      <input type="text" name="categoria" v-model="form.categoria" placeholder="Categoria" required />
      <input type="text" name="marca" v-model="form.marca" placeholder="Marca" required />
      <input type="file" name="imagem" @change="handleImageChange" accept="image/*" required />
      <label for="">Preço</label>
      <input type="number" step="0.01" name="preco" v-model.number="form.preco" placeholder="Preço" required />
      <label for="">Quantidade</label>
      <input type="number" name="quantidade" v-model.number="form.quantidade" placeholder="Quantidade" required />
      <input name="detalhes" v-model="form.detalhes" placeholder="Detalhes" required />
      <button type="submit" class="btn btn-success">Salvar</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

export default defineComponent({
  name: 'CadastroBrinquedo',
  setup() {
    const router = useRouter();
    const form = reactive({
      nome: '',
      preco: 0,
      descricao: '',
      categoria: '',
      marca: '',
      quantidade: 0,
      detalhes: '',
      imagem: null,
    });

    const handleImageChange = (event: Event) => {
      const fileInput = event.target as HTMLInputElement;
      if (fileInput.files && fileInput.files.length > 0) {
        form.imagem = fileInput.files[0];
      }
    };

    const handleSubmit = async () => {
      if (form.nome && form.preco && form.quantidade && form.categoria) {
        const formData = new FormData();
        formData.append('imagem', form.imagem);
        formData.append('nome', form.nome);
        formData.append('preco', form.preco.toString());
        formData.append('descricao', form.descricao);
        formData.append('categoria', form.categoria);
        formData.append('marca', form.marca);
        formData.append('quantidade', form.quantidade.toString());
        formData.append('detalhes', form.detalhes);

        try {
          const response = await fetch('https://76ac-2804-7f0-a218-1c58-580d-3852-e55b-d5da.ngrok-free.app/product/register', {
            method: 'POST',
            body: formData,
          });

          if (response.ok) {
            Swal.fire({
              icon: 'success',
              title: 'Cadastrado',
              text: 'Brinquedo cadastrado com sucesso!',
              showConfirmButton: false,
              timer: 1500,
            });
            router.push('/admin');
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Erro ao Cadastrar',
              text: 'Falha ao cadastrar o brinquedo. Tente novamente.',
            });
          }
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Ocorreu um erro ao conectar ao servidor.',
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao Cadastrar',
          text: 'Insira todos os dados corretamente.',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    };

    return { form, handleSubmit, handleImageChange };
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

input:focus,
textarea:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
}

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
