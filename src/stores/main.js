import { defineStore } from "pinia";

const DIRECTIONS = ["up", "down", "left", "right"];

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomEmptyCell(board, direction) {
  let cell = null;
  const boardSize = board.length;

  while (!cell) {
    const emptyCells = [];

    switch (direction) {
      case "up": {
        for (let i = 0; i < boardSize; i += 1) {
          if (board[0][i] === 0) {
            emptyCells.push({ x: 0, y: i });
          }
        }
        break;
      }
      case "down": {
        for (let i = boardSize - 1; i >= 0; i -= 1) {
          if (board[0][i] === 0) {
            emptyCells.push({ x: boardSize - 1, y: i });
          }
        }
        break;
      }
      case "left": {
        for (let i = 0; i < boardSize; i += 1) {
          if (board[i][0] === 0) {
            emptyCells.push({ x: i, y: 0 });
          }
        }
        break;
      }
      case "right": {
        for (let i = boardSize - 1; i >= 0; i -= 1) {
          if (board[i][0] === 0) {
            emptyCells.push({ x: i, y: boardSize - 1 });
          }
        }
        break;
      }
      default:
        break;
    }

    cell = getRandomItem(emptyCells);
  }

  return cell;
}

const useMainStore = defineStore("main", {
  state() {
    const boardSize = 4;

    const board = Array.from({ length: boardSize }).map(() =>
      Array.from({ length: boardSize }).fill(0)
    );

    const { x: x1, y: y1 } = getRandomEmptyCell(
      board,
      getRandomItem(DIRECTIONS)
    );
    board[x1][y1] = 2;

    const { x: x2, y: y2 } = getRandomEmptyCell(
      board,
      getRandomItem(DIRECTIONS)
    );
    board[x2][y2] = 2;

    return {
      boardSize,
      board,
    };
  },
  getters: {
    cellCount(state) {
      return state.boardSize * state.boardSize;
    },
  },
  actions: {},
});

export default useMainStore;
