import React from 'react';

const Square = ({ value, onClick }) => (
  <button
    className="w-20 h-20 bg-white border border-gray-400 text-2xl font-bold flex items-center justify-center"
    onClick={onClick}
  >
    {value}
  </button>
);

export default Square;
