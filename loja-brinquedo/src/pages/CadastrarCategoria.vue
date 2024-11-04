<template>
  <div class="container">
    <h2>Cadastrar Nova Categoria</h2>

    <form @submit.prevent="handleSubmit" class="form">
      <input type="text" v-model="form.nome" placeholder="Nome da Categoria" name="nome" required />
      <input v-model="form.descricao" type="text" name="descricao" placeholder="Descrição da Categoria" required />
      <button type="submit" class="btn btn-success">Salvar</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import Swal from 'sweetalert2';

export default defineComponent({
  name: 'CadastroCategoria',
  setup() {
    const form = reactive({
      nome: '',
      descricao: '',
    });

    const handleSubmit = async () => {
      if (form.nome && form.descricao) {
        try {
          const response = await fetch('https://e007-2804-7f0-a218-1c58-580d-3852-e55b-d5da.ngrok-free.app/categories/register', {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({
              nome: form.nome,
              descricao: form.descricao,
            }),
          });

          const data = await response.json();
          console.log(data);

          if (response.ok) {
            Swal.fire('Sucesso', 'Categoria cadastrada com sucesso!', 'success');
            form.nome = '';
            form.descricao = '';
          } else {
            Swal.fire('Erro', 'Falha ao cadastrar a categoria. Verifique os dados enviados.', 'error');
          }
        } catch (error) {
          console.error('Error:', error);
          Swal.fire('Erro', 'Ocorreu um erro ao conectar com o servidor.', 'error');
        }
      } else {
        Swal.fire('Erro', 'Por favor, preencha todos os campos.', 'error');
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
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

input {
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.3s, box-shadow 0.3s;
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
