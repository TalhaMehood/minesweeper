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

  return board;
};
