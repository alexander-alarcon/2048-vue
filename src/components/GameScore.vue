<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div
    class="inline-flex w-20 flex-col items-center justify-center rounded bg-[#bbada0] px-4 py-1"
  >
    <span class="text-sm font-semibold text-white">{{ title }}</span>
    <span class="text-2xl font-semibold text-white">{{ score }}</span>
  </div>
</template>
