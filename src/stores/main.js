import { defineStore } from "pinia";

const DIRECTIONS = ["up", "down", "left", "right"];

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomEmptyCell(board) {
  let cell = null;
  const boardSize = board.length;

  while (!cell) {
    const x = Math.floor(Math.random() * boardSize);
    const y = Math.floor(Math.random() * boardSize);

    if (board[y][x] === 0) {
      cell = { x, y };
    }
  }

  return cell;
}

/**
 *
 * @param {Number[][]} board
 * @param {Number} index
 * @param {Boolean} [isRow=false]
 * @param {Boolean} [isBackward=false]
 * @returns
 */
function move(board, index, isRow = false, isBackward = false) {
  let elements = null;
  const size = board.length;
  if (isRow) {
    elements = board[index];
  } else {
    elements = board.map((row) => row[index]);
  }
  elements = elements.filter((element) => element !== 0);
  if (isBackward) {
    return [...Array(size - elements.length).fill(0), ...elements];
  }
  return [...elements, ...Array(size - elements.length).fill(0)];
}

/**
 *
 * @param {Number[]} row
 * @param {Boolean} isBackward
 * @returns
 */
function mergeRow(row, isBackward = false) {
  const mergedRow = [...row];

  if (isBackward) {
    for (let i = mergedRow.length; i > 0; i -= 1) {
      if (mergedRow[i] === mergedRow[i - 1]) {
        mergedRow[i] *= 2;
        mergedRow[i - 1] = 0;
      }
    }
  } else {
    for (let i = 0; i < mergedRow.length - 1; i += 1) {
      if (mergedRow[i] === mergedRow[i + 1]) {
        mergedRow[i] *= 2;
        mergedRow[i + 1] = 0;
      }
    }
  }

  return mergedRow;
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
    board[y1][x1] = getRandomItem([2, 2, 2, 4]);

    const { x: x2, y: y2 } = getRandomEmptyCell(
      board,
      getRandomItem(DIRECTIONS)
    );
    board[y2][x2] = getRandomItem([2, 2, 2, 4]);

    return {
      boardSize,
      board,
      history: [],
    };
  },
  getters: {
    cellCount(state) {
      return state.boardSize * state.boardSize;
    },
    hasWin(state) {
      return state.board.some((column) => column.some((cell) => cell === 2048));
    },
    hasEmptyCell(state) {
      return state.board.some((column) => column.some((cell) => cell === 0));
    },
    canGoBack(state) {
      return state.history.length > 0;
    },
  },
  actions: {
    moveUp() {
      // const hasMerge = false;
      if (this.hasWin) return;
      const prevBoard = JSON.parse(JSON.stringify(this.board));
      const currentBoard = JSON.parse(JSON.stringify(this.board));

      for (let column = 0; column < this.boardSize; column += 1) {
        const nextCol = move(currentBoard, column);
        const mergedCol = mergeRow(nextCol);
        mergedCol.forEach((current, i) => {
          currentBoard[i][column] = current;
        });
      }

      this.board = currentBoard;

      if (this.hasEmptyCell) {
        const { x, y } = getRandomEmptyCell(this.board);
        this.board[y][x] = getRandomItem([2, 2, 2, 4]);
        this.history.push(prevBoard);
      }
    },
    moveDown() {
      if (this.hasWin) return;
      // const hasMerge = false;
      const prevBoard = JSON.parse(JSON.stringify(this.board));
      const currentBoard = JSON.parse(JSON.stringify(this.board));

      for (let column = 0; column < this.boardSize; column += 1) {
        const nextCol = move(currentBoard, column, false, true);
        const mergedCol = mergeRow(nextCol, true);

        mergedCol.forEach((current, i) => {
          currentBoard[i][column] = current;
        });
      }

      this.board = currentBoard;

      if (this.hasEmptyCell) {
        const { x, y } = getRandomEmptyCell(this.board);
        this.board[y][x] = getRandomItem([2, 2, 2, 4]);
        this.history.push(prevBoard);
      }
    },
    moveLeft() {
      if (this.hasWin) return;
      // const hasMerge = false;
      const prevBoard = JSON.parse(JSON.stringify(this.board));
      const currentBoard = JSON.parse(JSON.stringify(this.board));

      for (let row = 0; row < this.boardSize; row += 1) {
        const nextRow = move(currentBoard, row, true);
        const mergedRow = mergeRow(nextRow);
        mergedRow.forEach((current, i) => {
          currentBoard[row][i] = current;
        });
      }

      this.board = currentBoard;

      if (this.hasEmptyCell) {
        const { x, y } = getRandomEmptyCell(this.board);
        this.board[y][x] = getRandomItem([2, 2, 2, 4]);
        this.history.push(prevBoard);
      }
    },
    moveRight() {
      if (this.hasWin) return;
      // const hasMerge = false;
      const prevBoard = JSON.parse(JSON.stringify(this.board));
      const currentBoard = JSON.parse(JSON.stringify(this.board));
      for (let row = 0; row < this.boardSize; row += 1) {
        const nextRow = move(currentBoard, row, true, true);
        const mergedRow = mergeRow(nextRow, true);
        mergedRow.forEach((current, i) => {
          currentBoard[row][i] = current;
        });
      }

      this.board = currentBoard;

      if (this.hasEmptyCell) {
        const { x, y } = getRandomEmptyCell(this.board);
        this.board[y][x] = getRandomItem([2, 2, 2, 4]);
        this.history.push(prevBoard);
      }
    },
    goBack() {
      this.board = this.history.pop();
    },
  },
});

export default useMainStore;
