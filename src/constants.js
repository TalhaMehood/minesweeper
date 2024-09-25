// Defines types of dimensions that can be modified in the Minesweeper board settings.
export const dimensionTypes = {
    WIDTH: "width",
    HEIGHT: "height"
  }

// Defines limits for the adjustable dimensions of the Minesweeper board.
export  const limits = {
    MAX: 20,
    MIN: 2
  }

// Lists all possible directions to check adjacent tiles from a given tile in the Minesweeper board.
export const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1]
  ];