// Install react-dnd and react-dnd-html5-backend
// npm install react-dnd react-dnd-html5-backend

// src/components/Task.js
import React from 'react';
import { useDrag } from 'react-dnd';

const Task = ({ task, markAsCompleted, deleteTask }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'TASK',
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleComplete = () => {
    markAsCompleted(task.id);
  };

  const handleDelete = () => {
    deleteTask(task.id);
  };

  return (
    <li
      ref={dragRef}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className={`task-item ${task.completed ? 'completed' : ''}`}
      data-id={task.id}
    >
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <button onClick={handleComplete} className="complete-btn">
        Complete
      </button>
      <button onClick={handleDelete} className="delete-btn">
        Delete
      </button>
    </li>
  );
};

export default Task;
