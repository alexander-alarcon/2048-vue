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
  const merged = [...row];
  let points = 0;

  if (isBackward) {
    for (let i = merged.length; i > 0; i -= 1) {
      if (merged[i] === merged[i - 1]) {
        merged[i] *= 2;
        merged[i - 1] = 0;
        points += merged[i];
      }
    }
  } else {
    for (let i = 0; i < merged.length - 1; i += 1) {
      if (merged[i] === merged[i + 1]) {
        merged[i] *= 2;
        merged[i + 1] = 0;
        points += merged[i];
      }
    }
  }

  return { merged, points };
}

function createBoard(boardSize) {
  const board = Array.from({ length: boardSize }).map(() =>
    Array.from({ length: boardSize }).fill(0)
  );

  return board;
}

const initialState = {
  boardSize: 4,
  history: [],
  score: parseInt(localStorage.getItem("score") || 0, 10),
  bestScore: parseInt(localStorage.getItem("bestScore") || 0, 10),
};

function initBoard(boardSize) {
  const board = createBoard(boardSize);
  const { x: x1, y: y1 } = getRandomEmptyCell(board, getRandomItem(DIRECTIONS));
  board[y1][x1] = getRandomItem([2, 2, 2, 4]);

  const { x: x2, y: y2 } = getRandomEmptyCell(board, getRandomItem(DIRECTIONS));
  board[y2][x2] = getRandomItem([2, 2, 2, 4]);

  return board;
}

const useMainStore = defineStore("main", {
  state() {
    let board = localStorage.getItem("board");
    if (!board) {
      board = initBoard(initialState.boardSize);
    } else {
      board = JSON.parse(board);
    }

    return {
      boardSize: initialState.boardSize,
      board,
      history: initialState.history,
      score: initialState.score,
      bestScore: initialState.bestScore,
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
      return state.history.length > 0 && !state.hasWin;
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
        mergedCol.merged.forEach((current, i) => {
          currentBoard[i][column] = current;
        });
        this.score += mergedCol.points;
        if (this.score > this.bestScore) {
          this.bestScore = this.score;
        }
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

        mergedCol.merged.forEach((current, i) => {
          currentBoard[i][column] = current;
        });
        this.score += mergedCol.points;
        if (this.score > this.bestScore) {
          this.bestScore = this.score;
        }
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
        mergedRow.merged.forEach((current, i) => {
          currentBoard[row][i] = current;
        });
        this.score += mergedRow.points;
        if (this.score > this.bestScore) {
          this.bestScore = this.score;
        }
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
        mergedRow.merged.forEach((current, i) => {
          currentBoard[row][i] = current;
        });
        this.score += mergedRow.points;
        if (this.score > this.bestScore) {
          this.bestScore = this.score;
        }
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
    reset() {
      localStorage.removeItem("board");
      localStorage.removeItem("score");
      this.history = initialState.history;
      this.board = initBoard(initialState.boardSize);
      this.score = 0;
    },
  },
});

export default useMainStore;
