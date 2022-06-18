<script setup>
const COLORS = {
  2: { bg: "bg-orange-50", color: "text-orange-800" },
  4: { bg: "bg-orange-100", color: "text-orange-800" },
  8: { bg: "bg-yellow-300", color: "text-yellow-800" },
  16: { bg: "bg-yellow-400", color: "text-yellow-900" },
  32: { bg: "bg-emerald-300", color: "text-emerald-800" },
  64: { bg: "bg-emerald-400", color: "text-emerald-900" },
  128: { bg: "bg-blue-300", color: "text-blue-800" },
  256: { bg: "bg-blue-400", color: "text-blue-900" },
  512: { bg: "bg-indigo-300", color: "text-indigo-800" },
  1024: { bg: "bg-indigo-400", color: "text-indigo-900" },
  2048: { bg: "bg-violet-600", color: "text-violet-50 " },
};

defineProps({
  cell: {
    default: () => 0,
    type: Number,
  },
});
</script>

<template>
  <div class="cell relative rounded-md bg-cell p-4">
    <div
      v-if="cell !== 0"
      class="absolute inset-0 flex items-center justify-center rounded-md font-bold"
      :class="[COLORS[Number(cell)]?.bg, COLORS[Number(cell)]?.color]"
    >
      {{ cell }}
    </div>
  </div>
</template>
