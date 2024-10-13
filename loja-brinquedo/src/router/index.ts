import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../pages/Home.vue'; 
import Catalogo from '../pages/Catalogo.vue';
import DetalhesBrinquedo from '../pages/DetalhesBrinquedo.vue';
import Admin from '../pages/Admin.vue';
import CadastroBrinquedo from '../pages/CadastroBrinquedo.vue';
import SobreEquipe from '../pages/SobreEquipe.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/catalogo',
    name: 'Catalogo',
    component: Catalogo,
  },
  {
    path: '/detalhes/:id',
    name: 'DetalhesBrinquedo',
    component: DetalhesBrinquedo,
    props: true,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
  },
  {
    path: '/admin/cadastrar',
    name: 'CadastroBrinquedo',
    component: CadastroBrinquedo,
  },
  {
    path: '/sobre',
    name: 'SobreEquipe',
    component: SobreEquipe,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
