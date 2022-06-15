<script setup>
defineProps({
  cell: {
    default: () => 0,
    type: Number,
  },
});
</script>

<template>
  <div class="cell relative rounded-md bg-cell p-4">
    <div class="absolute inset-0 flex items-center justify-center rounded-md">
      {{ cell }}
    </div>
  </div>
</template>
