<script >
import {ref, onMounted } from 'vue';
import Sidebar from './components/Sidebar.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'


export default{

  components:{
    Sidebar,
    Header,
    Footer
  },
    setup(props){
          const products = ref(null);
          const singleProduct = ref(null);
          let showModal = ref(false)
          onMounted(() => {
            fetch('https://fakestoreapi.com/products/category/electronics?limit=24')
            .then(res => res.json())
            .then(json => {
              products.value = json;
            })
              .catch(error => {
                console.error('Error fetching products:', error);
              });
          })

          function limit(string='', limit=130){
          if(string){
            if(string.length >= limit){
          return string.substring(0, limit) + '...'
           }  
          return string.substring(0, limit)
          }
          
        }

        function getSingleProduct(id){
          showModal = true;
          fetch(`https://fakestoreapi.com/carts/${id}`)
            .then(res=>res.json())
            .then(json => {
              singleProduct.value = json;
            })
        }

          return {
            products,
            limit,singleProduct,
            getSingleProduct,
            showModal
          }
    }
}
</script>

<template>
  <Header/>
  <Sidebar />
 <main id="main" class="main">

  <router-view></router-view>

</main>
<Footer />
</template>

<style scoped>
.card-img-top{
  max-height: 300px;
  min-height: 200px;
}
</style>
