import React, { useState, useRef } from 'react';

const AddTaskForm = ({ columnId, onAdd }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Normal');
  const formRef = useRef(null);
  const titleRef = useRef(null);

  const priorities = ['Low', 'Normal', 'High'];

  const handleAdd = () => {
    if (title.trim()) {
      const newTask = {
        title,
        priority,
        columnId,
      };
      onAdd(newTask);
      setTitle('');
    }
  };

  const handleOutsideClick = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      dismissForm();
    }
  };

  const dismissForm = () => {
    setTitle('');
    setPriority('Normal');
  };

  const handleEscape = (event) => {
    if (event.key === 'Escape') {
      dismissForm();
    }
  };

  React.useEffect(() => {
    titleRef.current.focus();
    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div ref={formRef} className="add-task-form">
      <input
        type="text"
        ref={titleRef}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        className="task-title-input"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="priority-select"
      >
        {priorities.map((pri) => (
          <option key={pri} value={pri}>
            {pri}
          </option>
        ))}
      </select>
      <button onClick={handleAdd} className="quick-add-button">
        Add
      </button>
    </div>
  );
};

export default AddTaskForm;
