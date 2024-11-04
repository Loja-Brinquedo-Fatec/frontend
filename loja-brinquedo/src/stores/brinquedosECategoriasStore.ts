// // brinquedosECategoriasStore.ts
// import { defineStore } from 'pinia';
// import { ref } from 'vue';
// import Swal from 'sweetalert2';

// export const useBrinquedosECategoriasStore = defineStore('brinquedosECategorias', () => {
//   const brinquedos = ref<Brinquedo[]>([]);
//   const categorias = ref<Categoria[]>([]);

//   const carregarBrinquedos = async () => {
//     try {
//       const response = await fetch('https://d360-2804-7f0-a218-1c58-a521-ee2a-aa6e-bb7a.ngrok-free.app/product/');
//       if (response.ok) {
//         brinquedos.value = await response.json();
//       } else {
//         console.error('Erro ao carregar brinquedos');
//       }
//     } catch (error) {
//       console.error('Erro na requisição:', error);
//     }
//   };

//   const carregarCategorias = async () => {
//     try {
//       const response = await fetch('https://d360-2804-7f0-a218-1c58-a521-ee2a-aa6e-bb7a.ngrok-free.app/categories',
//         {
//           method:'GET'
//         }
//       );
//       if (response.ok) {
//         categorias.value = await response.json();
//       } else {
//         console.error('Erro ao carregar categorias');
//       }
//     } catch (error) {
//       console.error('Erro na requisição:', error);
//     }
//   };

  
//   const cadastrarBrinquedo = async (novoBrinquedo: {
//     nome: string;
//     preco: number;
//     descricao: string;
//     categoria: string;
//     marca: string;
//     quantidade: number;
//     detalhes: string;
//     imagem: string; // Base64
//   }) => {
//     try {
//       const response = await fetch('https://d360-2804-7f0-a218-1c58-a521-ee2a-aa6e-bb7a.ngrok-free.app/product/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(novoBrinquedo),
//       });

//       if (response.ok) {
//         Swal.fire({
//           icon: 'success',
//           title: 'Sucesso',
//           text: 'Brinquedo cadastrado com sucesso!',
//         });
//         // Recarregar a lista de brinquedos
//         await carregarBrinquedos();
//       } else {
//         Swal.fire({
//           icon: 'error',
//           title: 'Erro',
//           text: 'Falha ao cadastrar o brinquedo.',
//         });
//       }
//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Erro na Conexão',
//         text: 'Não foi possível conectar ao servidor.',
//       });
//     }
//   };

//   return { 
//     brinquedos, 
//     carregarBrinquedos, 
//     categorias, 
//     carregarCategorias, 
//     cadastrarBrinquedo 
//   };
// });
