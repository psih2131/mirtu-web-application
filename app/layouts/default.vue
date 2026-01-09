<template>
  
    <div class="app-wrapper">

        <headerComponent />
                
        <slot/>
    
        <!-- <componentFooter />         -->

    </div>
  
</template>


<script setup lang="ts">
//IMPORT

import { ref, onMounted, onBeforeUnmount, computed, watch  } from 'vue';

import headerComponent from '@/components/header.vue'



// import { useCounterStore } from '@/stores/counter'

// import { useNuxtApp } from '#app'



</script>

