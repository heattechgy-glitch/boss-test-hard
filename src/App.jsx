import React, { useState } from 'react';

const App = () => {
  const [boards, setBoards] = useState([
    { id: '1', name: 'Work' },
    { id: '2', name: 'Personal' }
  ]);
  const [activeBoardId, setActiveBoardId] = useState('1');

  const handleBoardClick = (id) => {
    setActiveBoardId(id);
  };

  const createBoard = () => {
    const newBoard = { id: Date.now().toString(), name: `Board ${boards.length + 1}` };
    setBoards([...boards, newBoard]);
  };

  return (
    <div className="flex h-screen bg-gray-800 text-white">
      <div className="w-1/4 bg-gray-900 p-4">
        <h2 className="text-xl mb-4">Boards</h2>
        <ul>
          {boards.map((board) => (
            <li
              key={board.id}
              onClick={() => handleBoardClick(board.id)}
              className={`p-2 cursor-pointer ${
                activeBoardId === board.id ? 'bg-gray-700' : ''
              }`}
            >
              {board.name}
            </li>
          ))}
        </ul>
        <button
          onClick={createBoard}
          className="mt-4 p-2 bg-blue-500 rounded hover:bg-blue-600"
        >
          Create Board
        </button>
      </div>
      <div className="flex-1 p-4">
        <h2 className="text-2xl mb-4">{boards.find(b => b.id === activeBoardId)?.name} Board</h2>
        <div className="bg-gray-700 p-5 rounded h-full">
          {/* Kanban Board content goes here */}
        </div>
      </div>
    </div>
  );
};

export default App;
