// Updated generateBoard function
export const generateBoard = (width, height, mines) => {
  const board = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => ({
      isMine: false,
      isRevealed: false,
      number: 0,
    }))
  );

  let placedMines = 0;
  while (placedMines < mines) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    if (!board[y][x].isMine) {
      board[y][x].isMine = true;
      placedMines++;
    }
  }

  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1]
  ];

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      if (!board[row][col].isMine) {
        let mineCount = 0;
        directions.forEach(([dx, dy]) => {
          const newRow = row + dx;
          const newCol = col + dy;
          if (newRow >= 0 && newRow < height && newCol >= 0 && newCol < width) {
            if (board[newRow][newCol].isMine) {
              mineCount++;
            }
          }
        });
        board[row][col].number = mineCount;
      }
    }
  }

  return board;
};
