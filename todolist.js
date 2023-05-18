const addButton = document.getElementById('addButton');
const todoList = document.querySelector('.todo-list');

// Load tasks from local storage
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task
addButton.addEventListener('click', addTask);

function addTask(e) {
  e.preventDefault();
  
  const taskInput = document.getElementById('taskInput').value;
  const taskDate = document.getElementById('taskDate').value;
  
  if (taskInput !== '' && taskDate !== '') {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    
    const taskSpan = document.createElement('input');
    taskSpan.classList.add('task');
    taskSpan.maxLength = '40'
    taskSpan.value = taskInput;
    
    const dateSpan = document.createElement('span');
    dateSpan.classList.add('date');
    dateSpan.textContent = taskDate;
    
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'Delete';
    
    li.appendChild(taskSpan);
    li.appendChild(dateSpan);
    li.appendChild(deleteButton);
    
    todoList.appendChild(li);
    
    saveTask(taskInput, taskDate);
    
    document.getElementById('taskInput').value = '';
    document.getElementById('taskDate').value = '';
  }
}

// Delete task
todoList.addEventListener('click', deleteTask);

function deleteTask(e) {
  if (e.target.classList.contains('delete-button')) {
    const li = e.target.parentElement;
    const taskInput = li.querySelector('.task').value;
    const taskDate = li.querySelector('.date').textContent;
    li.remove();
    removeTask(taskInput, taskDate);
  }
}

// Save edited task on Enter key press
todoList.addEventListener('keypress', saveEditedTask);

function saveEditedTask(e) {
  if (e.target.classList.contains('task') && e.key === 'Enter') {
    e.preventDefault();
    e.target.blur();
    
    const li = e.target.parentElement;
    const oldTaskInput = e.target.getAttribute('data-task');
    const taskInput = e.target.value;
    const taskDate = li.querySelector('.date').textContent;
    
    e.target.setAttribute('data-task', taskInput);
    updateTask(oldTaskInput, taskInput, taskDate);
  }
}

// Save task to local storage
function saveTask(taskInput, taskDate) {
  const tasks = getTasksFromStorage();
  
  tasks.push({
    input: taskInput,
    date: taskDate
  });
  
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task from local storage
function removeTask(taskInput, taskDate) {
  const tasks = getTasksFromStorage();
  
  const updatedTasks = tasks.filter(task => task.input !== taskInput || task.date !== taskDate);
  
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

// Update task in local storage
function updateTask(oldTaskInput, newTaskInput, taskDate) {
  const tasks = getTasksFromStorage();
  
  const updatedTasks = tasks.map(task => {
    if (task.input === oldTaskInput && task.date === taskDate) {
      task.input = newTaskInput;
    }
    return task;
  });
  
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

// Load tasks from local storage
function loadTasks() {
  const tasks = getTasksFromStorage();
  
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    
    const taskSpan = document.createElement('input');
    taskSpan.classList.add('task');
    taskSpan.style.outline = 'none';
    taskSpan.style.border = 'none';
    taskSpan.style.backgroundColor = 'transparent';
    taskSpan.maxLength = '40';
    taskSpan.value = task.input;
    taskSpan.setAttribute('data-task', task.input);
    
    const dateSpan = document.createElement('span');
    dateSpan.classList.add('date');
    dateSpan.textContent = task.date;
    
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'Delete';
    
    li.appendChild(taskSpan);
    li.appendChild(dateSpan);
    li.appendChild(deleteButton);
    
    todoList.appendChild(li);
  });
}

// Retrieve tasks from local storage
function getTasksFromStorage() {
  let tasks;
  
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  
  return tasks;
}
