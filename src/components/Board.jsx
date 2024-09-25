import PropTypes from 'prop-types';
import { useState } from 'react';
import { generateBoard } from '../utils/generateBoard';
import Tile from './Tile';

const Board = ({ width, height, mines }) => {
  const [board, setBoard] = useState(generateBoard(width, height, mines));

  const handleTileClick = () => {
    console.log("click")
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
