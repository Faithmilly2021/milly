
import { createApp } from 'vue';
import Layout from './Layout.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


import './assets/css/style.css';
// import './assets/vendor/boxicons/css/boxicons.min.css';
import { createRouter, createWebHistory } from 'vue-router';

import Profile from './components/Profile.vue';
import Home from './components/Home.vue';
import Register from './Auth/Register.vue';
import Login from './Auth/Login.vue';
import Contact from './Auth/Contact.vue';
import Faq from './Auth/Faq.vue';
import ToDoList from './ToDo/ToDoList.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/profile', component: Profile },
    { path: '/register', component: Register },
    { path: '/login', component: Login },
    { path: '/contact', component: Contact },
    { path: '/faq', component: Faq },
    {path: '/todolist', component: ToDoList },


  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes
  });

const app = createApp(Layout)
app.use(router);
app.mount('#app');


