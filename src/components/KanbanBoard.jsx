import React from 'react';
import PropTypes from 'prop-types';
import TaskCard from './TaskCard';
import './KanbanBoard.css';

const KanbanBoard = ({ board }) => {
  return (
    <div className="kanban-container">
      {board.columns.map(column => (
        <div key={column.id} className="kanban-column">
          <div className="column-header">
            <h2>{column.name}</h2>
            <span className="task-count">{column.tasks.length}</span>
          </div>
          <div className="task-list">
            {column.tasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      ))}
      <button className="add-column-button">+ Add Column</button>
    </div>
  );
};

KanbanBoard.propTypes = {
  board: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    columns: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      tasks: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
      })).isRequired
    })).isRequired
  }).isRequired
};

export default KanbanBoard;
