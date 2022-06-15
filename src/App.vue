<script setup>
import { ref } from 'vue'

const message = ref('Hello World!')

message.value = 'Hello Vue!'

</script>

<template>
  <h1>2048 clone</h1>
  <p>{{ message }}</p>
</template>
