<script >
import {ref, onMounted } from 'vue';
import Button from './components/Button.vue'

export default{

  components:{
      Button
  },
    setup(props){
          const products = ref(null);
          const singleProduct = ref(null);
          let showModal = ref(false)
          let isLoading = ref(false)
          onMounted(() => {
            isLoading = true;
            fetch('https://fakestoreapi.com/products/category/electronics?limit=24')
            .then(res => res.json())
            .then(json => {
              isLoading = false;
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
            products,isLoading,
            limit,singleProduct,
            getSingleProduct,
            showModal
          }
    }
}
</script>

<template>
  <div class="container-fluid mt-4">
    <h3 class="text-center">My Fake Store API</h3>

   <div class="row">

    <div class="spinner-grow text-center" role="status" v-if="isLoading">
      <span class="visually-hidden">Loading...</span>
    </div>

    <div class="col-3" v-for="product in products" :key="product.id">
      <div class="card" style="width: 18rem;">
        <img :src="product.image" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">{{ product.title }}</h5>
          <p class="card-text">{{ limit(product.description) }}</p>
          <a href="#" class="btn btn-primary" @click="getSingleProduct(product.id)" data-bs-toggle="modal" data-bs-target="#exampleModal">Shop</a>
        </div>
      </div>
    </div>
   </div>
 </div>

<!-- Modal -->
<div v-if="showModal" class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-12">
            <!-- <div class="card" style="width: 18rem;">
              <img :src="viewProduct.image" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">{{ viewProduct.title }}</h5>
                <p class="card-text">{{ viewProduct.description }}</p>
              </div>
            </div> -->
          </div>
         </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
.card-img-top{
  max-height: 300px;
  min-height: 200px;
}
</style>
