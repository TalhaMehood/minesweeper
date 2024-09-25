import { useEffect, useState } from 'react';
import Board from './components/Board';

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


  const handleChange = (setter, value, dimensionType) => {
    const newValue = parseInt(value) || 2;

    if (dimensionType === 'width') {

      if (newValue * height <= mines) {
        setMines(newValue * height - 1);
      }
    } else if (dimensionType === 'height') {

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
          {/* Width Input */}
          <label>Width: </label>
          <input
            type="number"
            value={width}
            min="2"
            max="20"
            onChange={(e) => handleChange(setWidth, e.target.value, 'width')}
            className="border rounded px-2 text-black"
          />

          {/* Height Input */}
          <label>Height: </label>
          <input
            type="number"
            value={height}
            min="2"
            max="20"
            onChange={(e) => handleChange(setHeight, e.target.value, 'height')}
            className="border rounded px-2 text-black"
          />

          {/* Mines Input */}
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


        {/* Render the Board */}
        <Board key={key} width={width} height={height} mines={mines} />
      </div>
    </div>
  );
};

export default App;
