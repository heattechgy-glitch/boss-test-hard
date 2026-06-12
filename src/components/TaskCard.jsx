import React from 'react';
import PropTypes from 'prop-types';
import './TaskCard.css'; // Assuming there's a CSS file for styles

const TaskCard = ({ task, onSelectTask }) => {
  const {
    title,
    description,
    priority,
    assignee,
    dueDate,
    tags
  } = task;

  const isOverdue = new Date(dueDate) < new Date();

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'High':
        return '🔴';
      case 'Medium':
        return '🟡';
      default:
        return '🟢';
    }
  };

  const getAssigneeInitials = (name) => {
    const initials = name
      ? name.split(' ').map(part => part.charAt(0)).join('')
      : '?';
    return initials.toUpperCase();
  };

  return (
    <div 
      className="task-card"
      onClick={() => onSelectTask(task.id)}
    >
      <div className="task-header">
        <h3 className="task-title">{title}</h3>
        <span className="task-priority">{getPriorityBadge(priority)}</span>
      </div>
      <p className="task-description">
        {description.length > 100 ? `${description.substring(0, 100)}...` : description}
      </p>
      <div className="task-footer">
        <div className="task-due-date" style={{ color: isOverdue ? 'red' : 'inherit' }}>
          <i className="calendar-icon" />
          {dueDate}
        </div>
        <div className="task-tags">
          {tags.map((tag, index) => (
            <span key={index} className="task-tag">{tag}</span>
          ))}
        </div>
        <div className="task-assignee">
          <span className="assignee-avatar">
            {getAssigneeInitials(assignee)}
          </span>
        </div>
      </div>
    </div>
  );
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    priority: PropTypes.oneOf(['High', 'Medium', 'Low']).isRequired,
    assignee: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  onSelectTask: PropTypes.func.isRequired
};

export default TaskCard;