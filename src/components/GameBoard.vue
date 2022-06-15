<script setup>
import { storeToRefs } from "pinia";

import GameCell from "./GameCell.vue";
import useMainStore from "../stores/main";

const mainStore = useMainStore();
const { board, cellCount, boardSize } = storeToRefs(mainStore);
</script>

<template>
  <div class="container mx-auto">
    <div
      class="game-board mx-auto grid aspect-square min-w-[320px] max-w-md gap-2 rounded-lg bg-board p-2"
      :style="{ gridTemplateColumns: `repeat(${board.length}, 1fr)` }"
    >
      <game-cell
        v-for="cell in cellCount"
        :key="cell"
        :cell="
          board[Math.floor((cell - 1) / boardSize)][
            Math.floor((cell - 1) % boardSize)
          ]
        "
        :index="cell"
      />

      <!--     <game-cell v-for="(cell, index) in cellCount" :key="index" :cell="cell" /> -->
    </div>
  </div>
</template>
