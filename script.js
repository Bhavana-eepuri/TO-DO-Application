document.addEventListener('DOMContentLoaded', function () {
    loadTasks();

    document.getElementById('task-input').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const taskList = document.getElementById('task-list');

        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <span>${taskText}</span>
            <button onclick="toggleTaskCompletion(this)">Done</button>
            <button onclick="removeTask(this)">Remove</button>
        `;

        taskList.appendChild(taskItem);
        saveTask(taskText);

        taskInput.value = '';
        taskInput.focus();
    }
}

function toggleTaskCompletion(button) {
    const taskItem = button.parentNode;
    taskItem.classList.toggle('completed');

    updateLocalStorage();
}

function removeTask(button) {
    const taskItem = button.parentNode;
    taskItem.remove();

    updateLocalStorage();
}

function saveTask(taskText) {
    const tasks = getSavedTasks();
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = getSavedTasks();
    const taskList = document.getElementById('task-list');

    tasks.forEach(taskText => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <span>${taskText}</span>
            <button onclick="toggleTaskCompletion(this)">Done</button>
            <button onclick="removeTask(this)">Remove</button>
        `;

        taskList.appendChild(taskItem);
    });
}

function getSavedTasks() {
    const tasksJSON = localStorage.getItem('tasks');
    return tasksJSON ? JSON.parse(tasksJSON) : [];
}

function updateLocalStorage() {
    const tasks = [];
    const taskList = document.getElementById('task-list');

    taskList.querySelectorAll('li').forEach(taskItem => {
        const taskText = taskItem.querySelector('span').innerText;
        tasks.push(taskText);
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
