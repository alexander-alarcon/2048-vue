<script setup>
import { ref } from 'vue'

const message = ref('Hello World!')

message.value = 'Hello Vue!'

</script>

<template>
  <h1 class="text-3xl text-stone-800 p-4">2048 clone</h1>
  <p class="text-lg text-slate-500 px-4">{{ message }}</p>
</template>
