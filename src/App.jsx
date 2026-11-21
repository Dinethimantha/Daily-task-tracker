
import { useState, useEffect } from 'react';
import './App.css';

function App() {

  // Load saved tasks
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('All');

  // Save tasks whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add task
  const addTask = () => {
    if (newTask.trim() === '') {
      alert('Please enter a task!');
      return;
    }

    const task = {
      id: Date.now(),
      title: newTask,
      completed: false
    };

    setTasks([...tasks, task]);
    setNewTask('');
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Complete task
  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    if (filter === 'Completed') return task.completed;
    if (filter === 'Pending') return !task.completed;
    return true;
  });

  const completedCount = tasks.filter(task => task.completed).length;

  return (
    <div className="app">
      <div className="task-container">

        <h1>🌸 Daily Task Tracker</h1>
        <p className="subtitle">
          Organize your day, one task at a time!
        </p>

        <div className="task-input">
          <input
            type="text"
            placeholder="Enter your task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
          />

          <button onClick={addTask}>Add Task</button>
        </div>

        <div className="task-summary">
          <p>Total: {tasks.length}</p>
          <p>Completed: {completedCount}</p>
          <p>Pending: {tasks.length - completedCount}</p>
        </div>

        <div className="filter-buttons">
          {['All', 'Pending', 'Completed'].map(option => (
            <button
              key={option}
              className={filter === option ? 'active-filter' : ''}
              onClick={() => setFilter(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <h2>My Tasks ({filteredTasks.length})</h2>

        <div className="task-list">

          {filteredTasks.length === 0 ? (
            <p className="empty-message">
              No tasks found. Add a new task!
            </p>
          ) : (
            filteredTasks.map(task => (
              <div className="task-item" key={task.id}>

                <span
                  className={task.completed ? 'completed' : ''}
                  onClick={() => toggleTask(task.id)}
                >
                  {task.completed ? '✅' : '⭕'} {task.title}
                </span>

                <button
                  className="delete-btn"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>

              </div>
            ))
          )}

        </div>
      </div>
    </div>
  );
}

export default App;
