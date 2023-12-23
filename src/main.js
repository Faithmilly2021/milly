
import { createApp } from 'vue';
import Layout from './Layout.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


import './assets/css/style.css';
// import './assets/vendor/boxicons/css/boxicons.min.css';
import { createRouter, createWebHistory } from 'vue-router';

import Profile from './components/Profile.vue';
import Home from './components/Home.vue';


const routes = [
    { path: '/', component: Home },
    { path: '/profile', component: Profile }

  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes
  });

const app = createApp(Layout)
app.use(router);
app.mount('#app');


