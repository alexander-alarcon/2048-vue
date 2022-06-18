<script setup>
import { watch } from "vue";
import { storeToRefs } from "pinia";

import GameCell from "./GameCell.vue";
import GameScore from "./GameScore.vue";

import useMainStore from "../stores/main";

const mainStore = useMainStore();
const { board, cellCount, boardSize, score } = storeToRefs(mainStore);
let { bestScore } = storeToRefs(mainStore);

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") {
    mainStore.moveUp();
  } else if (event.key === "ArrowDown") {
    mainStore.moveDown();
  } else if (event.key === "ArrowLeft") {
    mainStore.moveLeft();
  } else if (event.key === "ArrowRight") {
    mainStore.moveRight();
  }
});

watch(bestScore, (newScore) => {
  if (newScore > bestScore) {
    bestScore = newScore;
  }
  localStorage.setItem("bestScore", bestScore.value);
});

watch(
  board,
  (newBoard) => {
    localStorage.setItem("board", JSON.stringify(newBoard));
  },
  { deep: true }
);

watch(score, () => {
  localStorage.setItem("score", score.value);
});
</script>

<template>
  <div class="container mx-auto">
    <div class="flex flex-row">
      <div class="flex flex-row items-center justify-center space-x-2">
        <game-score title="Score" :score="mainStore.score" />
        <game-score title="Best" :score="mainStore.bestScore" />
      </div>
      <div class="flex w-full justify-end">
        <button
          v-if="mainStore.canGoBack"
          class="m-4 rounded bg-[#8f7a66]/75 px-6 py-2 font-bold text-white"
          type="button"
          @click="mainStore.goBack()"
        >
          Back
        </button>
        <button
          class="m-4 rounded bg-[#8f7a66] px-6 py-2 font-bold text-white"
          @click="mainStore.reset()"
        >
          New game
        </button>
      </div>
    </div>

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
      />
    </div>
  </div>
</template>
