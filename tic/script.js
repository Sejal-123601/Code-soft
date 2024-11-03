const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const restartButton = document.getElementById("restart");

let currentPlayer = "X"; // Human player
let boardState = ["", "", "", "", "", "", "", "", ""];

// Winning combinations
const winCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

// Event listener for cells
cells.forEach(cell => {
  cell.addEventListener("click", handleClick, { once: true });
});

// Restart the game
restartButton.addEventListener("click", restartGame);

// Handle cell click
function handleClick(e) {
  const cell = e.target;
  const index = cell.getAttribute("data-index");

  if (!boardState[index]) {
    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    if (checkWinner(currentPlayer)) {
      setTimeout(() => alert(`${currentPlayer} Wins!`), 10);
      endGame();
    } else if (isDraw()) {
      setTimeout(() => alert("It's a Draw!"), 10);
      endGame();
    } else {
      currentPlayer = "O"; // Switch to AI player
      aiMove();
    }
  }
}

// AI makes a move
function aiMove() {
  const bestMove = findBestMove(boardState);
  boardState[bestMove] = "O";
  cells[bestMove].textContent = "O";
  cells[bestMove].removeEventListener("click", handleClick); // Prevent clicking on this cell again

  if (checkWinner("O")) {
    setTimeout(() => alert("AI Wins!"), 10);
    endGame();
  } else if (isDraw()) {
    setTimeout(() => alert("It's a Draw!"), 10);
    endGame();
  } else {
    currentPlayer = "X"; // Switch back to human player
  }
}

// Check if current player is the winner
function checkWinner(player) {
  return winCombinations.some(combination => {
    return combination.every(index => boardState[index] === player);
  });
}

// Check for draw
function isDraw() {
  return boardState.every(cell => cell !== "");
}

// Restart the game
function restartGame() {
  boardState = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(cell => {
    cell.textContent = "";
    cell.addEventListener("click", handleClick, { once: true });
  });
  currentPlayer = "X"; // Start with human
}

// Minimax algorithm
function findBestMove(board) {
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") {
      board[i] = "O"; // AI move
      let score = minimax(board, 0, false);
      board[i] = ""; // Undo the move
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
}

function minimax(board, depth, isMaximizing) {
  if (checkWinner("O")) return 10 - depth;
  if (checkWinner("X")) return depth - 10;
  if (isDraw()) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = "O";
        let score = minimax(board, depth + 1, false);
        board[i] = "";
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = "X";
        let score = minimax(board, depth + 1, true);
        board[i] = "";
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

// End game and disable further moves
function endGame() {
  cells.forEach(cell => {
    cell.removeEventListener("click", handleClick);
  });
}
