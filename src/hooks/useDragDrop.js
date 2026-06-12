import { useState, useCallback } from 'react';

function useDragDrop(moveTask) {
  const [draggingId, setDraggingId] = useState(null);

  const dragHandlers = {
    onDragStart: (event, taskId) => {
      event.dataTransfer.setData('text/plain', taskId);
      setDraggingId(taskId);
      event.currentTarget.style.opacity = '0.5';
    },
    onDragEnd: (event) => {
      setDraggingId(null);
      event.currentTarget.style.opacity = '1';
    },
  };

  const dropHandlers = {
    onDragOver: (event) => {
      event.preventDefault();
    },
    onDrop: (event, toColumnId) => {
      event.preventDefault();
      const taskId = event.dataTransfer.getData('text/plain');
      if (taskId && toColumnId) {
        moveTask(taskId, draggingId, toColumnId);
        setDraggingId(null);
      }
    },
  };

  return { dragHandlers, dropHandlers, draggingId };
}

export default useDragDrop;