import PropTypes from 'prop-types';
import { useState } from 'react';
import { directions } from '../constants';
import { generateBoard } from '../utils/generateBoard';
import { gameOverMessages, winningMessages } from '../utils/messages';
import { getRandomMessage } from '../utils/utils';
import Tile from './Tile';

const Board = ({ width, height, mines }) => {
  const [board, setBoard] = useState(generateBoard(width, height, mines));
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  // Handles tile clicks, revealing tiles, and updating game status
  const handleTileClick = (x, y) => {
    if (gameOver || won) return;
    if (board[x][y].isRevealed) return;

    const newBoard = [...board];
    const tile = newBoard[x][y];

    if (tile.isMine) {
      tile.isRevealed = true;

      newBoard.forEach(row =>
        row.forEach(tile => {
          if (tile.isMine) {
            tile.isRevealed = true;
          }
        })
      );
      setBoard(newBoard);

      setTimeout(() => {
        setGameOver(true);
        alert(getRandomMessage(gameOverMessages));
      }, 100);
    } else {
      revealTile(newBoard, x, y); // Recursive reveal
      setBoard(newBoard);
      checkWin(newBoard);
    }
  };

  // Recursively reveals tiles
  const revealTile = (board, x, y) => {
    const stack = [[x, y]]; // Start with the clicked tile
    const visited = new Set(); // Keep track of visited tiles

    while (stack.length > 0) {
      const [currentX, currentY] = stack.pop();

      // If out of bounds or already visited, skip this tile
      if (currentX < 0 || currentX >= width || currentY < 0 || currentY >= height || visited.has(`${currentX},${currentY}`)) {
        continue;
      }

      const tile = board[currentX][currentY];
      tile.isRevealed = true;
      visited.add(`${currentX},${currentY}`); // Mark this tile as visited

      // If no adjacent mines, add neighboring tiles to the stack
      if (tile.number === 0) {
        directions.forEach(([dx, dy]) => {
          const newX = currentX + dx;
          const newY = currentY + dy;
          stack.push([newX, newY]);
        });
      }
    }
  };

  // Checks if all non-mine tiles are revealed
  const checkWin = (board) => {
    const totalTiles = width * height;
    const revealedTiles = board.flat().filter(tile => tile.isRevealed).length;
    const mineTiles = board.flat().filter(tile => tile.isMine).length;

    if (revealedTiles === totalTiles - mineTiles) {
      setTimeout(() => {
        setWon(true);
        alert(getRandomMessage(winningMessages));
      }, 100);
    }
  };

  return (
    <div className="text-center">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${width}, minmax(40px, 1fr))`,
          gridTemplateRows: `repeat(${height}, 1fr)`,
          gap: '5px',
        }}
        className="mx-auto w-fit"
      >
        {board.map((row, rowIndex) =>
          row.map((tile, colIndex) => (
            <Tile
              key={`${rowIndex}-${colIndex}`}
              tile={tile}
              onClick={() => handleTileClick(rowIndex, colIndex)}
            />
          ))
        )}
      </div>
    </div>
  );
};

Board.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  mines: PropTypes.number.isRequired,
};

export default Board;
