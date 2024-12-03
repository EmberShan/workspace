import React, { useState, useEffect } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { gridSpecs } from '../../../recoil/atoms';

const HowToUse = () => {
  const [selectedGrid, setSelectedGrid] = useState(null);
  const setGridSpecs = useSetRecoilState(gridSpecs);
  const grid = useRecoilValue(gridSpecs);  // Get the current grid specs from the atom

  useEffect(() => {
    // Initialize selectedGrid with the current atom values
    if (grid.r === 2 && grid.c === 3) {
      setSelectedGrid('2X6');
    } else if (grid.r === 3 && grid.c === 4) {
      setSelectedGrid('3X6');
    } else if (grid.r === 3 && grid.c === 5) {
      setSelectedGrid('3X4');
    }
  }, [grid]);

  const handleGridSelection = (grid) => {
    setSelectedGrid(grid);
  };

  const handleSetLayout = () => {
    if (selectedGrid) {
      let newR, newC;

      switch (selectedGrid) {
        case '2X6':
          newR = 2;
          newC = 6;
          break;
        case '3X6':
          newR = 3;
          newC = 6;
          break;
        case '3X4':
          newR = 3;
          newC = 4;
          break;
        default:
          newR = 3;
          newC = 6; // Default to 2x6 if nothing is selected
      }

      // Set the new values in the gridSpecs atom
      setGridSpecs((prev) => ({
        ...prev,
        r: newR,
        c: newC,
      }));
    }
  };

  return (
    <div className="flex items-center justify-center space-x-4 p-6">
      <h2 className="text-xl">Layout</h2>
      <button
        className={`px-4 py-2 border-[1px] border-gray-300 rounded-md hover:bg-gray-100 hover:bg-opacity-20 transition-all duration-200 ${selectedGrid === '2X6' ? 'bg-blue-500 text-white' : ''}`}
        onClick={() => handleGridSelection('2X6')}
      >
        2X6
      </button>
      <button
        className={`px-4 py-2 border-[1px] border-gray-300 rounded-md hover:bg-gray-100 hover:bg-opacity-20 transition-all duration-200 ${selectedGrid === '3X6' ? 'bg-blue-500 text-white' : ''}`}
        onClick={() => handleGridSelection('3X6')}
      >
        3X6
      </button>
      <button
        className={`px-4 py-2 border-[1px] border-gray-300 rounded-md hover:bg-gray-100 hover:bg-opacity-20 transition-all duration-200 ${selectedGrid === '3X4' ? 'bg-blue-500 text-white' : ''}`}
        onClick={() => handleGridSelection('3X4')}
      >
        3X4
      </button>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition-all duration-200"
        onClick={handleSetLayout}
      >
        Set
      </button>
    </div>
  );
};

export default HowToUse;
