import React, { useState } from 'react';
import Board from './components/Board';
import { IoIosRefresh } from 'react-icons/io'

const App = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) return;

    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const winner = calculateWinner(squares);
  const isBoardFull = squares.every(square => square !== null);
  const status = winner
    ? `Winner: ${winner}`
    : isBoardFull
    ? 'It\'s a Tie!'
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  const statusClass = winner ? 'bg-green-500 text-white' : 'bg-gray-200';

  const restartGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex items-center mb-8">
        <h1 className="text-4xl font-bold">Tic Tac Toe</h1>
        <button
          className="ml-4 text-gray-600 hover:text-gray-900"
          onClick={restartGame}
        >
          <IoIosRefresh />
        </button>
      </div>
      <Board squares={squares} onClick={handleClick} />
      <div className="mt-8">
        <p className={`text-xl font-semibold mb-4 p-2 ${statusClass}`}>
          {status}
        </p>
        {(winner || isBoardFull) && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={restartGame}
          >
            Play Again
          </button>
        )}
      </div>
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

export default App;
