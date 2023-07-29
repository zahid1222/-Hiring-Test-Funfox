// src/mockAPI.js
// Mock user data
const users = [
    { id: 1, name: 'User 1', group: 'Group A' },
    { id: 2, name: 'User 2', group: 'Group B' },
    { id: 3, name: 'User 3', group: 'Group A' },
  ];
  
  // Mock task data
  let tasks = [
    { id: 1, title: 'Task Hiring Test', description: 'Hiring refer to the final  ', completed: false, userId: 1 },
    { id: 2, title: 'Task Shortlisted Candindate', description: 'Shortlisted candiate will be selected to test', completed: true, userId: 2 },
    { id: 3, title: 'Task Hiried Person', description: 'You Deserve this job', completed: false, userId: 1 },
  ];
  
  // Mock API functions
  export const fetchUserTasks = (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userTasks = tasks.filter((task) => task.userId === userId);
        resolve(userTasks);
      }, 500);
    });
  };
  
  export const addTask = (task) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTask = { ...task, id: tasks.length + 1, completed: false, userId: task.userId };
        tasks.push(newTask);
        resolve(newTask);
      }, 500);
    });
  };
  
  export const markTaskAsCompleted = (taskId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        tasks = tasks.map((task) =>
          task.id === taskId ? { ...task, completed: true } : task
        );
        resolve();
      }, 500);
    });
  };
  
  export const deleteTask = (taskId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        tasks = tasks.filter((task) => task.id !== taskId);
        resolve();
      }, 500);
    });
  };
  export default users;