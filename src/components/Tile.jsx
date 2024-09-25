import classnames from 'classnames';
import PropTypes from 'prop-types';

const getTileContent = (tile) => {
  if (!tile.isRevealed) {
    return '';
  }

  if (tile.isMine) {
    return '💣';
  }

  if (tile.number > 0) {
    return tile.number;
  }

  if (tile.number === 0) {
    return '';
  }

  return '';
};

const Tile = ({ tile, onClick }) => {
  const tileClass = classnames(
    'w-10 h-10 text-black flex items-center justify-center cursor-pointer rounded-sm',
    {
      'bg-gray-400': tile.isRevealed && tile.number === 0,
      'bg-gray-300': tile.isRevealed && tile.number > 0,
      'bg-red-500': tile.isMine && tile.isRevealed,
      'bg-gray-700 hover:bg-gray-500': !tile.isRevealed,
    }
  );

  return (
    <button className={tileClass} onClick={onClick}>
      {getTileContent(tile)}
    </button>
  );
};

Tile.propTypes = {
  tile: PropTypes.shape({
    isRevealed: PropTypes.bool.isRequired,
    isMine: PropTypes.bool.isRequired,
    number: PropTypes.number,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Tile;
