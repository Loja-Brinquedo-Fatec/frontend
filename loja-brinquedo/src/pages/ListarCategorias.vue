<template>
    <div class="container">
      <h2>Lista de Categorias</h2>
      <div v-if="categorias.length === 0">Nenhuma categoria encontrada.</div>
      <ul>
        <li v-for="categoria in categorias" :key="categoria.id" class="categoria-item">
          <div>
            <strong>{{ categoria.nome }}</strong> - {{ categoria.descricao }}
          </div>
          <button @click="editCategoria(categoria)" class="btn btn-edit">Editar</button>
          <button @click="deleteCategoria(categoria.id)" class="btn btn-delete">Excluir</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import Swal from 'sweetalert2';
  import { useRouter } from 'vue-router';

  export default defineComponent({
    name: 'ListarCategorias',
    setup() {
      const categorias = ref([]);
  
      // Função para buscar as categorias da API
      const fetchCategorias = async () => {
        try {
          const response = await fetch('https://0f57-2804-7f0-a218-1c58-e8a9-5fc1-e202-d786.ngrok-free.app/categories');
          categorias.value = await response.json();
        } catch (error) {
          console.error('Erro ao buscar categorias:', error);
        }
      };
  
      // Função para excluir uma categoria
      const deleteCategoria = async (id: string) => {
        try {
          const response = await fetch(`https://0f57-2804-7f0-a218-1c58-e8a9-5fc1-e202-d786.ngrok-free.app/categories/delete/${id}`, {
            method: 'DELETE',
          });
          if (response.ok) {
            Swal.fire('Sucesso', 'Categoria excluída com sucesso!', 'success');
            fetchCategorias(); // Atualiza a lista após a exclusão
          } else {
            Swal.fire('Erro', 'Falha ao excluir a categoria.', 'error');
          }
        } catch (error) {
          console.error(error);
          Swal.fire('Erro', 'Falha ao excluir a categoria.', 'error');
        }
      };
  
      const router = useRouter(categorias);
      // Função para abrir o formulário de edição
      const editCategoria = () => {
        router.push(`/admin/editar/categoria/${categorias.id}`);
      };    
  
      onMounted(fetchCategorias); // Carrega as categorias ao montar o componente
  
      return { categorias, deleteCategoria, editCategoria };
    },
  });
  </script>
  
  <style scoped>
  .container {
    padding: 20px;
  }
  .categoria-item {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    padding: 10px;
    background-color: #f1f1f1;
    border-radius: 6px;
  }
  .btn {
    margin-left: 5px;
  }
  .btn-edit {
    background-color: #007bff;
    color: white;
  }
  .btn-delete {
    background-color: #dc3545;
    color: white;
  }
  </style>
  