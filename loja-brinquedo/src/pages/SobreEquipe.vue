<template>
  <div class="container">
    <h2>Equipe Desenvolvedora</h2>
    <div class="grid">
      <div class="card" style="width: 18rem;" v-for="(membro, index) in membros" :key="index">
        <img :src="membro.foto" :alt="membro.nome" class="image">
        <div class="card-body">
          <h5 class="card-title">
            {{ membro.nome }}
          </h5>
          <p><strong>RA:</strong> {{ membro.codigo }}</p>
          <div class="links">
            <a :href="membro.linkedin" target="_blank" rel="noopener noreferrer"><img class="imglogo"
                src="../assets/logotipolinkedin.avif" alt=""></a><br />
            <a :href="membro.github" target="_blank" rel="noopener noreferrer"><img class="imglogo"
                src="../assets/logotipogit.webp" alt=""></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import fotoCamille from '../assets/camille-foto.png';
import fotoIsaias from '../assets/isaias-foto.jpg';
import fotoVictor from '../assets/foto-victor.jpg';

export default defineComponent({
  name: 'SobreEquipe',
  data() {
    return {
      membros: [
        {
          nome: 'Camille Alves Cruz',
          codigo: '2571392322027',
          linkedin: 'https://www.linkedin.com/in/camille-alves-cruz-42a229288?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
          github: 'https://github.com/CamilleAlvesC',
          foto: fotoCamille,
        },
        {
          nome: 'Isaias B. Souza',
          codigo: '2571392322003',
          linkedin: 'https://www.linkedin.com/in/isaias-souza-819295227/',
          github: 'https://github.com/IsaiasSorriso',
          foto: fotoIsaias,
        },
        {
          nome: 'Victor Daniel',
          codigo: '2571392322038',
          linkedin: 'https://www.linkedin.com/in/victor-daniel-b0a5a4214?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
          github: 'https://github.com/vdanviel',
          foto: fotoVictor,
        },
      ],
    };
  },
});
</script>

<style scoped>
.container {
  padding: 20px;
}

.links{
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.imglogo {
  max-width: 50px;
}

.grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 100px;
  margin-bottom: 50px;
}

.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  width: 200px;
  text-align: left;
}

.image {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

a {
  color: #008cba;
  text-decoration: none;
}

h2{
  margin-bottom: 30px;
}
</style>