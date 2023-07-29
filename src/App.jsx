// src/App.js
import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TaskForm from './Components/TaskForm';
import TaskList from './Components/TaskList';
import FeedbackNotification from './Components/FeedbackNotification';
import users,{ fetchUserTasks, addTask, markTaskAsCompleted, deleteTask } from './Components/MockAPI'
import './Style.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  useEffect(() => {
    // Simulate user login - Replace with your authentication logic
    const loggedInUser = users.find((u) => u.id === 1); // User ID 1 (User 1)
    setUser(loggedInUser);
    //const ws = new WebSocket('ws://localhost:8080');

    // Handle WebSocket connection open
    //ws.onopen = () => {
      // Send a join group message to the WebSocket server
     // ws.send(JSON.stringify({ type: 'join_group', group: user.group }));
    //};

    // Handle incoming notifications from the WebSocket server
   // ws.onmessage = (event) => {
    //  const notification = JSON.parse(event.data);
    // Fetch tasks for the logged-in user
    fetchUserTasks(loggedInUser.id)
      .then((userTasks) => setTasks(userTasks))
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);

  const handleAddTask = (newTask) => {
    // Add user ID to the new task
    const taskToAdd = { ...newTask, userId: user.id };

    // Add task to the API
    addTask(taskToAdd)
      .then((addedTask) => {
        setTasks([...tasks, addedTask]);
        setFeedbackMessage('Task added successfully.');
        setShowFeedback(true);
      })
      .catch((error) => console.error('Error adding task:', error));
  };

  const handleTaskCompletion = (taskId) => {
    // Mark task as completed in the API
    markTaskAsCompleted(taskId)
      .then(() => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId ? { ...task, completed: true } : task
          )
        );
        setFeedbackMessage('Task marked as completed.');
        setShowFeedback(true);
      })
      .catch((error) => console.error('Error marking task as completed:', error));
  };

  const handleTaskDeletion = (taskId) => {
    // Delete task from the API
    deleteTask(taskId)
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== taskId));
        setFeedbackMessage('Task deleted.');
        setShowFeedback(true);
      })
      .catch((error) => console.error('Error deleting task:', error));
  };

  const handleFeedbackClose = () => {
    setShowFeedback(false);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container">
        <h1>Task Management System</h1>
        <TaskForm addTask={handleAddTask} />
        <TaskList
          tasks={tasks}
          markAsCompleted={handleTaskCompletion}
          deleteTask={handleTaskDeletion}
        />
        {showFeedback && (
          <FeedbackNotification
            message={feedbackMessage}
            onClose={handleFeedbackClose}
          />
        )}
      </div>
    </DndProvider>
  );
};

export default App;
