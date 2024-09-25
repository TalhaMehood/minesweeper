// Updated generateBoard function
export const generateBoard = (width, height, mines) => {
  const board = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => ({
      isMine: false,
      isRevealed: false,
      number: 0,
    }))
  );

  return board;
};
