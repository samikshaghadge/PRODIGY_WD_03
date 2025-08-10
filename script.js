const boardElement = document.getElementById('game-board');
const statusElement = document.getElementById('status');
const resetButton = document.getElementById('reset');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

// Create 9 cells
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleCellClick);
    boardElement.appendChild(cell);
}

function handleCellClick(e) {
    const index = e.target.dataset.index;

    if (board[index] !== '' || !gameActive) return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add('taken');

    if (checkWinner()) {
        statusElement.textContent = `Player ${currentPlayer} wins! 🎉`;
        gameActive = false;
        return;
    }

    if (!board.includes('')) {
        statusElement.textContent = "It's a draw! 🤝";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusElement.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    return winningCombinations.some(combo => {
        return combo.every(index => board[index] === currentPlayer);
    });
}

resetButton.addEventListener('click', () => {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    statusElement.textContent = `Player X's turn`;
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken');
    });
});
