// Run all logic after DOM has fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Load saved tasks from Local Storage on page load
  loadTasks();

  // Add button click event
  addButton.addEventListener('click', () => addTask(taskInput.value.trim()));

  // Pressing "Enter" in input field adds task
  taskInput.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
      addTask(taskInput.value.trim());
    }
  });

  // Load tasks from Local Storage and display them
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false)); // prevent duplicate save
  }

  // Add a task to the DOM and optionally save to Local Storage
  function addTask(taskText, save = true) {
    if (!taskText) {
      alert('Please enter a task.');
      return;
    }

    // Create task <li>
    const listItem = document.createElement('li');
    listItem.textContent = taskText;

    // Create remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';

    // Remove task on button click
    removeBtn.onclick = () => {
      taskList.removeChild(listItem);
      removeFromLocalStorage(taskText);
    };

    listItem.appendChild(removeBtn);
    taskList.appendChild(listItem);

    // Clear input field
    taskInput.value = '';

    // Save task to Local Storage
    if (save) {
      const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      storedTasks.push(taskText);
      localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }
  }

  // Remove a task from Local Storage
  function removeFromLocalStorage(taskText) {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const updatedTasks = storedTasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }
});
