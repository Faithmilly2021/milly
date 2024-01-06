<template>
    <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div class="container">
          <div class="row justify-content-center">

            <div class="col-lg-8 col-md-6 d-flex flex-column align-items-center justify-content-center">
              <div class="card">
            <div class="card-body">
              <h5 class="card-title">My TODOLIST!</h5>

              <!-- Table with stripped rows -->
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Category</th>
                    <th scope="col">Description</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="getAllTodos" v-for="(todo, index) in getAllTodos()" :key="todo.id">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ todo.title }}</td>
                    <td>{{ getCategory(todo.category) }}</td>
                    <td>{{ todo.description }}</td>
                    <td>
                      <div class="d-flex">
                      <button type="button" class="btn btn-sm btn-primary mx-2" @click="editTodo(todo)">Edit</button>
                      <button type="button" class="btn btn-sm btn-danger" @click="deleteTodo(todo.id)">Delete</button>
                    </div>
                    </td>

                  
                  </tr>
                </tbody>
              </table>
              <!-- End Table with stripped rows -->

            </div>
          </div>
            </div>
          
          
         
            <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">


              <div class="card mb-3">

                <div class="card-body">

                  <div class="pt-4 pb-2">
                    <h5 class="card-title text-center pb-0 fs-4">My TODOLIST!</h5>
                  </div>

                  <form @submit.prevent="submit" class="row g-3 needs-validation" >
                    <div class="col-12">
                      <label for="" class="form-label">Title</label>
                      <input v-model="form_data.title" type="text" class="form-control" >
                    </div>

                    <div class="col-12">
                      <label for="yourEmail" class="form-label">Category</label>
                      <select v-model="form_data.category" type="text" class="form-control" >
                          <option selected :value="''">Select Category</option>
                          <option v-for="category in categories" :key="category.id" :value="category.id">{{category.name}}</option>
                        </select>
                    </div>

                    <div class="col-12">
                      <label for="yourUsername" class="form-label">Description</label>
                      <div class="input-group has-validation">
                        <textarea class="form-control" v-model="form_data.description" cols="30" rows="4"></textarea>
                      </div>
                    
                    </div>
                    <div class="col-12">
                      <button class="btn btn-primary w-100" type="submit">{{ form_data.id ? 'Update' : 'Add' }}</button>
                    </div>
                  </form>
     
                </div>
              </div>
              <!-- footer was here -->

            </div>
          </div>
        </div>

      </section>

</template>

<script>
import { reactive } from 'vue';
import { watch } from 'vue';

export default {
  name: 'ToDo',

  setup (){

    let existingTodos = reactive(JSON.parse(localStorage.getItem('todos')) || []);

    const categories = [
      {id: 1, name: 'Work'},
      {id: 2, name: 'Personal'},
      {id: 3, name: 'School'},
      {id: 4, name: 'Other'},
    ]
    const form_data = reactive({
      title: '',
      category: '',
      description: '',  
    })

  const  updateTodo = (id) => {
  existingTodos = JSON.parse(localStorage.getItem('todos')) || [];
  const index = existingTodos.findIndex((todo) => todo.id == id);
  existingTodos[index] = form_data;
  localStorage.setItem('todos', JSON.stringify(existingTodos));
}


    const submit = () => {

      if(form_data.id){
       return updateTodo(form_data.id);
      }
   existingTodos = JSON.parse(localStorage.getItem('todos')) || [];

  const newTodo = {
    id: generateId(),
    title: form_data.title,
    category: form_data.category,
    description: form_data.description,
  };

  existingTodos.push(newTodo);

  localStorage.setItem('todos', JSON.stringify(existingTodos));
}



const getCategory = (id) => {
  return categories.find((category) => category.id == id).name
}
//generate random IDs
const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
}
const deleteTodo = (id) => {
  if (confirm('Are you sure you want to delete this todo?')) {
    existingTodos = existingTodos.filter((todo) => todo.id != id);
  localStorage.setItem('todos', JSON.stringify(existingTodos)); 
  }
  
}

const editTodo = (todo) => {
  form_data.id = todo.id,
  form_data.title = todo.title,
  form_data.category = todo.category,
  form_data.description = todo.description
}
watch(existingTodos, () => {
  // Handle changes in todos here
  console.log('Todos updated:', existingTodos);
  getAllTodos();
});

const getAllTodos = () => {
  return existingTodos
}

  return {
     form_data,
     submit,
     getCategory,
     categories,
     existingTodos,
     getAllTodos,
     deleteTodo,
     generateId,
     editTodo,
     updateTodo

  }
  }
}
</script>