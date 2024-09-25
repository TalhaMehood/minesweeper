import { directions } from '../constants';
export const generateBoard = (width, height, mines) => {
  
  // Initialize the board with all tiles set to non-mined, unrevealed, and with no adjacent mines.
  const board = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => ({
      isMine: false,
      isRevealed: false,
      number: 0,
    }))
  );

  let placedMines = 0;
  // Place mines randomly on the board until the specified number of mines is reached.
  while (placedMines < mines) {
    
    // x is the column index, y is the row index on the board.
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    if (!board[y][x].isMine) {
      board[y][x].isMine = true;
      placedMines++;

      // Update adjacent tiles to increment their adjacent mines count.
      directions.forEach(([dx, dy]) => {
        const newRow = y + dy;
        const newCol = x + dx;

         // Ensure the adjacent tile is within board boundaries.
        if (newRow >= 0 && newRow < height && newCol >= 0 && newCol < width) {
          board[newRow][newCol].number += 1;
        }
      });
    }
  }

  return board;
};
