<template>
    <button style="background-color: blueviolet;">{{ count }}</button>
</template>

<script >
import { ref } from 'vue';

export default{

props:{
    count: Number
},
 
    setup(props){
         let count = ref(props.count)
          return {
            count
          }
    }
}
</script>

