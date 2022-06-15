<script setup>
import useMainStore from './stores/main'

const mainStore = useMainStore()
</script>

<template>
  <h1 class="text-3xl text-stone-800 p-4">2048 clone</h1>
  <p class="text-lg text-slate-500 px-4">{{ mainStore.message }}</p>
</template>
