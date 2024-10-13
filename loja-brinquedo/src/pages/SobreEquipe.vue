<template>
    <div class="container">
      <h2>Sobre a Equipe</h2>
      <div class="grid">
        <div v-for="(membro, index) in membros" :key="index" class="card">
          <img :src="membro.foto" :alt="membro.nome" class="image" />
          <h3>{{ membro.nome }}</h3>
          <p><strong>Código:</strong> {{ membro.codigo }}</p>
          <a :href="membro.linkedin" target="_blank" rel="noopener noreferrer">LinkedIn</a><br />
          <a :href="membro.github" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SobreEquipe',
    data() {
      return {
        membros: [
          {
            nome: 'João Silva',
            codigo: 'JS123',
            linkedin: 'https://linkedin.com/in/joaosilva',
            github: 'https://github.com/joaosilva',
            foto: 'https://example.com/joao.jpg',
          },
          {
            nome: 'Maria Oliveira',
            codigo: 'MO456',
            linkedin: 'https://linkedin.com/in/mariaoliveira',
            github: 'https://github.com/mariaoliveira',
            foto: 'https://example.com/maria.jpg',
          },
          // Adicione mais membros conforme necessário
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .container {
    padding: 20px;
  }
  .grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  .card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px;
    width: 200px;
    text-align: center;
  }
  .image {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }
  a {
    color: #008cba;
    text-decoration: none;
  }
  </style>
  