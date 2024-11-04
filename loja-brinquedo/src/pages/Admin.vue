<template>
    <div class="container">
      <h2>Administração de Brinquedos</h2>
      <table class="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Preço (R$)</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="brinquedo in brinquedos" :key="brinquedo.id">
            <td>{{ brinquedo.nome }}</td>
            <td>{{ brinquedo.categoria }}</td>
            <td>{{ brinquedo.preco.toFixed(2) }}</td>
            <td>
              <button @click="editarBrinquedo(brinquedo.id)" class="button-edit">Editar</button>
              <button @click="excluirBrinquedo(brinquedo.id)" class="button-delete">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
      <router-link to="/admin/cadastrar">
        <button class="btn btn-success">Cadastrar Novo Brinquedo</button>
      </router-link>
    </div>
  </template>
  
  <script lang="ts">
import { defineComponent } from 'vue';
import { useBrinquedosStore } from '../stores/brinquedos';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Admin',
  setup() {
    const brinquedosStore = useBrinquedosStore();
    const router = useRouter();

    const editarBrinquedo = (id: number): void => {
      router.push(`/admin/editar/${id}`);
    };

    const excluirBrinquedo = async (id: number): Promise<void> => {
  if (confirm('Tem certeza que deseja excluir este brinquedo?')) {
    try {
      const response = await fetch(`https://76ac-2804-7f0-a218-1c58-580d-3852-e55b-d5da.ngrok-free.app/product/delete/${id}`, {
        method: 'DELETE',
        headers: {
          "ngrok-skip-browser-warning": "true",
        }
      });

      if (!response.ok) {
        throw new Error(`Erro ao excluir o brinquedo: ${await response.text()}`);
      }

      // Remove o brinquedo da loja Pinia
      brinquedosStore.excluirBrinquedo(id);
      alert('Brinquedo excluído com sucesso!');
    } catch (error) {
      console.error('Erro na exclusão do brinquedo:', error);
      alert('Ocorreu um erro ao excluir o brinquedo.');
    }
  }
};

    return {
      brinquedos: brinquedosStore.brinquedos,
      editarBrinquedo,
      excluirBrinquedo,
    };
  },
});
</script>
  
  <style scoped>
  .container {
    padding: 20px;
  }
  .table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  .table th,
  .table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }
  .button-edit {
    margin-right: 10px;
    padding: 5px 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .button-delete {
    padding: 5px 10px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .button-add {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 15px;
    background-color: #008cba;
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 24px;
    cursor: pointer;
  }
  </style>
  