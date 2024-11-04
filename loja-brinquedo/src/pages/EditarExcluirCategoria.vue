<template>
    <div v-if="categoria">
      <h2>Editar Categoria</h2>
      <form @submit.prevent="handleEdit" class="form">
        <input
          type="text"
          v-model="categoria.nome"
          placeholder="Nome da Categoria"
          required
        />
        <input
          v-model="categoria.descricao"
          type="text"
          placeholder="Descrição da Categoria"
          required
        />
        <button type="submit" class="btn btn-primary">Salvar Alterações</button>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, watch, PropType } from 'vue';
  import Swal from 'sweetalert2';
  
  export default defineComponent({
    name: 'EditarExcluirCategoria',
    props: {
      categoriaProp: {
        type: Object as PropType<{ id: string; nome: string; descricao: string }>,
        required: true,
      },
    },
    setup(props) {
      const categoria = ref({ ...props.categoriaProp });
  
      // Função para enviar as alterações para o servidor
      const handleEdit = async () => {
        try {
          const response = await fetch(`https://0f57-2804-7f0-a218-1c58-e8a9-5fc1-e202-d786.ngrok-free.app/categories/edit/${categoria.value.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(categoria.value),
          });
  
          if (response.ok) {
            Swal.fire('Sucesso', 'Categoria atualizada com sucesso!', 'success');
          } else {
            Swal.fire('Erro', 'Falha ao atualizar a categoria.', 'error');
          }
        } catch (error) {
          console.error(error);
          Swal.fire('Erro', 'Falha ao atualizar a categoria.', 'error');
        }
      };
  
      // Atualiza a categoria local quando a prop muda
      watch(() => props.categoriaProp, (newCategoria) => {
        categoria.value = { ...newCategoria };
      });
  
      return { categoria, handleEdit };
    },
  });
  </script>
  
  <style scoped>
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
    background-color: #007bff;
    color: white;
    font-size: 18px;
    font-weight: bold;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  button:hover {
    background-color: #0056b3;
  }
  </style>
  