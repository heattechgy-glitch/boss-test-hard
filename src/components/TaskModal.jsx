import React, { useState } from 'react';
import './TaskModal.css'; // Import CSS for styling

const TaskModal = ({ task, onClose, onSave }) => {
  const [updatedTask, setUpdatedTask] = useState({ ...task });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSave = () => {
    onSave(updatedTask);
  };

  const handleBackdropClick = (e) => {
    if (e.target.className === 'task-modal-backdrop') {
      onClose();
    }
  };

  return (
    <div className="task-modal-backdrop" onClick={handleBackdropClick}>
      <div className="task-modal">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Edit Task</h2>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={updatedTask.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={updatedTask.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Priority</label>
          <select
            name="priority"
            value={updatedTask.priority}
            onChange={handleInputChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="form-group">
          <label>Status</label>
          <select
            name="status"
            value={updatedTask.status}
            onChange={handleInputChange}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div className="form-group">
          <label>Assignee</label>
          <input
            type="text"
            name="assignee"
            value={updatedTask.assignee}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={updatedTask.dueDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Tags</label>
          <input
            type="text"
            name="tags"
            value={updatedTask.tags}
            onChange={(e) =>
              handleInputChange({
                target: {
                  name: 'tags',
                  value: e.target.value.split(',').map((tag) => tag.trim()),
                },
              })
            }
          />
        </div>
        <button className="save-button" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default TaskModal;
