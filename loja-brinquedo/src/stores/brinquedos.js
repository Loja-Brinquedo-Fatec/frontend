import { defineStore } from 'pinia';
import brinquedosData from '../data/brinquedos.json';

export const useBrinquedosStore = defineStore('brinquedos', {
  state: () => ({
    brinquedos: [],
  }),
  actions: {
    carregarBrinquedos() {
      // Simulando uma chamada de API
      this.brinquedos = brinquedosData;
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
