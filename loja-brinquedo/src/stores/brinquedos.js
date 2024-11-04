import { defineStore } from 'pinia';

export const useBrinquedosStore = defineStore('brinquedos', {
  state: () => ({
    brinquedos: [],
  }),
  actions: {
    async carregarBrinquedos() {
      try {
        const response = await fetch('https://607c-2804-7f0-a218-1c58-580d-3852-e55b-d5da.ngrok-free.app/product/',{
          method: 'GET'
        });
        if (!response.ok) {
          throw new Error('Erro ao carregar os brinquedos',  console.log(response.text()));
        }
        const data = await response.json();
        this.brinquedos = data; // Supondo que a resposta é um array de brinquedos
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    },
    adicionarBrinquedo(novoBrinquedo) {
      const idMax = this.brinquedos.length > 0 ? Math.max(...this.brinquedos.map(b => b.id)) : 0;
      const brinquedoComId = { id: idMax + 1, ...novoBrinquedo };
      this.brinquedos.push(brinquedoComId);
    },
    excluirBrinquedo(id) {
      this.brinquedos = this.brinquedos.filter(b => b.id !== id);
    },
    editarBrinquedo(id, dadosAtualizados) {
      const index = this.brinquedos.findIndex(b => b.id === id);
      if (index !== -1) {
        this.brinquedos[index] = { ...this.brinquedos[index], ...dadosAtualizados };
      }
    },
  },
});
