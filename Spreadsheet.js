"use client";

import { useState, useCallback, useRef } from "react";

const NUM_ROWS = 25;
const NUM_COLS = 40;

// Cell Component to handle individual cell rendering and editing
const Cell = ({ rowIndex, colIndex, value, onChange, bgColor, alignment, fontSize, validation }) => {
  const handleChange = (e) => {
    const newValue = e.target.value;
    if (validation && !validation(newValue)) {
      // Optionally show an error or feedback
      return;
    }
    onChange(rowIndex, colIndex, newValue);
  };

  return (
    <td className="border border-gray-300">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        style={{
          backgroundColor: bgColor,
          textAlign: alignment,
          fontSize: `${fontSize}px`,
        }}
        className="w-full p-2 border-none outline-none"
      />
    </td>
  );
};

const Spreadsheet = () => {
  const [data, setData] = useState(
    Array.from({ length: NUM_ROWS }, () => Array(NUM_COLS).fill(''))
  );
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [alignment, setAlignment] = useState('left');
  const [fontSize, setFontSize] = useState(14);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle cell value changes
  const handleChange = useCallback((row, col, value) => {
    setHistory((prevHistory) => [...prevHistory, data]);
    setRedoStack([]);
    setData((prevData) => {
      const newData = [...prevData];
      newData[row] = [...newData[row]];
      newData[row][col] = value;
      return newData;
    });
  }, [data]);

  // Undo last change
  const handleUndo = () => {
    setRedoStack((prevRedoStack) => [data, ...prevRedoStack]);
    setData((prevData) => {
      const lastHistory = history[history.length - 1];
      return lastHistory || prevData;
    });
    setHistory((prevHistory) => prevHistory.slice(0, -1));
  };

  // Redo last undone change
  const handleRedo = () => {
    setHistory((prevHistory) => [...prevHistory, data]);
    setData((prevData) => {
      const nextRedo = redoStack[0];
      return nextRedo || prevData;
    });
    setRedoStack((prevRedoStack) => prevRedoStack.slice(1));
  };

  // Filter data based on search query
  const filteredData = data.map(row =>
    row.map(cell => cell.toLowerCase().includes(searchQuery.toLowerCase()) ? cell : '')
  );

  // Validation functions
  const numericValidation = (value) => !isNaN(value) || value === '';
  const textValidation = (value) => /^[a-zA-Z0-9]*$/.test(value);

  return (
    <div className="p-4">
      {/* Cell Formatting Controls */}
      <div className="mb-4 flex space-x-4">
        <div>
          <label className="mr-2">Cell Background Color:</label>
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className="border border-gray-300 rounded p-1"
          />
        </div>

        <div>
          <label className="mr-2">Text Alignment:</label>
          <select
            value={alignment}
            onChange={(e) => setAlignment(e.target.value)}
            className="border border-gray-300 rounded p-1"
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>

        <div>
          <label className="mr-2">Font Size:</label>
          <input
            type="number"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="border border-gray-300 rounded p-1"
            min="8"
            max="36"
          />
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <label className="mr-2">Search:</label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>

      {/* Undo and Redo Buttons */}
      <div className="mb-4 flex space-x-4">
        <button
          onClick={handleUndo}
          disabled={history.length === 0}
          className="bg-gray-300 p-2 rounded"
        >
          Undo
        </button>
        <button
          onClick={handleRedo}
          disabled={redoStack.length === 0}
          className="bg-gray-300 p-2 rounded"
        >
          Redo
        </button>
      </div>

      {/* Spreadsheet Grid */}
      <table className="table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            {Array.from({ length: NUM_COLS }).map((_, index) => (
              <th key={index} className="border border-gray-300 p-2">Column {index + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <Cell
                  key={colIndex}
                  rowIndex={rowIndex}
                  colIndex={colIndex}
                  value={cell}
                  onChange={handleChange}
                  bgColor={bgColor}
                  alignment={alignment}
                  fontSize={fontSize}
                  validation={colIndex % 2 === 0 ? numericValidation : textValidation}  // Example: numeric validation for even columns
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Spreadsheet;
