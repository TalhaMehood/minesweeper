import { useEffect, useState } from 'react';
import Board from './components/Board';
import { dimensionTypes, limits } from './constants';

const App = () => {
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
  const [mines, setMines] = useState(10);
  const [key, setKey] = useState(0);


  const totalTiles = width * height;

  useEffect(() => {
    if (mines >= totalTiles) {
      setMines(totalTiles - 1);
    }
    setKey((key) => key + 1);
  }, [width, height, mines, totalTiles]);

  // Handler for changes in board dimensions
  const handleChange = (setter, value, dimensionType) => {
    const newValue = Math.min(parseInt(value) || limits.MIN, limits.MAX);

    if (dimensionType === dimensionTypes.WIDTH) {

      if (newValue * height <= mines) {
        setMines(newValue * height - 1);
      }
    } else if (dimensionType === dimensionTypes.HEIGHT) {

      if (width * newValue <= mines) {
        setMines(width * newValue - 1);
      }
    }

    setter(newValue);
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white flex justify-center">
      <div className="space-y-4 text-center py-20">
        <h1 className="text-2xl font-bold bg-slate-700">Minesweeper</h1>
        <div className="space-x-2">
          <label>Width: </label>
          <input
            type="number"
            value={width}
            min={limits.MIN}
            max={limits.MAX}
            onChange={(e) => handleChange(setWidth, e.target.value, dimensionTypes.WIDTH)}
            className="border rounded px-2 text-black"
          />

          <label>Height: </label>
          <input
            type="number"
            value={height}
            min={limits.MIN}
            max={limits.MAX}
            onChange={(e) => handleChange(setHeight, e.target.value, dimensionTypes.HEIGHT)}
            className="border rounded px-2 text-black"
          />

          <label>Mines: </label>
          <input
            type="number"
            value={mines}
            min="1"
            max={totalTiles - 1}
            onChange={(e) => setMines(Math.min(parseInt(e.target.value) || 1, totalTiles - 1))}
            className="border rounded px-2 text-black"
          />
          <button
            onClick={() => setKey((key) => key + 1)}
            className="mt-4 bg-slate-500 text-white py-2 px-4 rounded"
          >
            Reset Game
          </button>
        </div>

        <Board key={key} width={width} height={height} mines={mines} />
      </div>
    </div>
  );
};

export default App;
