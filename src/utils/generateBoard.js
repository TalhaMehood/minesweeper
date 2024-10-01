import { directions } from '../constants';
export const generateBoard = (width, height, mines) => {
  const board = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => ({
      isMine: false,
      isRevealed: false,
      number: 0,
    }))
  );

  // Step 1: Create a flat list of all tile indices (0 to width * height - 1)
  const totalTileCount = width * height;
  const tileIndices = Array.from({ length: totalTileCount }, (_, tileIndex) => tileIndex);

  // Step 2: Shuffle the tileIndices list 
  for (let currentIndex = totalTileCount - 1; currentIndex > 0; currentIndex--) {
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    [tileIndices[currentIndex], tileIndices[randomIndex]] = [tileIndices[randomIndex], tileIndices[currentIndex]];
  }  

  // Step 3: Place mines at the first 'mines' number of shuffled tileIndices
  for (let mineIndex = 0; mineIndex < mines; mineIndex++) {
    const flatIndex = tileIndices[mineIndex];
    const rowIndex = Math.floor(flatIndex / width);
    const colIndex = flatIndex % width; 
    board[rowIndex][colIndex].isMine = true;

    // Step 4: Update adjacent tiles to increment their adjacent mine counts
    directions.forEach(([dx, dy]) => {
      const adjacentRow = rowIndex + dx;
      const adjacentCol = colIndex + dy;

      if (
        adjacentRow >= 0 && adjacentRow < height && 
        adjacentCol >= 0 && adjacentCol < width && 
        !board[adjacentRow][adjacentCol].isMine
      ) {
        board[adjacentRow][adjacentCol].number += 1;
      }
    });
  }

  return board;
};
