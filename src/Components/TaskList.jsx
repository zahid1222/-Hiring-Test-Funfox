// src/components/TaskList.js
import React, { useState } from 'react';
import Task from './Task';

const TaskList = ({ tasks, markAsCompleted, deleteTask }) => {
  const [completedTasks, setCompletedTasks] = useState([]);

  const handleTaskCompletion = (taskId) => {
    const taskToComplete = tasks.find((task) => task.id === taskId);
    setCompletedTasks([...completedTasks, taskToComplete]);
    markAsCompleted(taskId);
  };

  return (
    <ul>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          markAsCompleted={handleTaskCompletion}
          deleteTask={deleteTask}
        />
      ))}
    </ul>
  );
};

export default TaskList;
