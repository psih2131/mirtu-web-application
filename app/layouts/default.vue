<template>
  
    <div class="app-wrapper">

        <headerComponent />
                
        <slot/>
    
        <footerComponent />

    </div>
  
</template>


<script setup>
//IMPORT

import { ref, onMounted, onBeforeUnmount, computed, watch  } from 'vue';

import headerComponent from '@/components/header.vue'

import footerComponent from '@/components/footer.vue'



// import { useCounterStore } from '@/stores/counter'

// import { useNuxtApp } from '#app'



</script>

