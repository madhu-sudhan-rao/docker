
const API_END_POINT = 'http://localhost:8000'

// Fetch tasks from the server
function fetchTasks() {
    fetch(`${API_END_POINT}/tasks`)
        .then(response => response.json())
        .then(tasks => {
            const taskList = document.getElementById('task-list');
            taskList.innerHTML = ''; // Clear existing tasks
            tasks.forEach((task, index) => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `${task} <a href="#" onclick="deleteTask(${index})">Delete</a>`;
                taskList.appendChild(listItem);
            });
        });
}

// Add a new task
document.getElementById('add-button').addEventListener('click', function(event) {
    event.preventDefault();
    const taskInput = document.getElementById('task');
    const task = taskInput.value;

    fetch(`${API_END_POINT}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task })
    }).then(() => {
        taskInput.value = ''; // Clear input field
        fetchTasks(); // Refresh task list
    });
});

// Delete a task
function deleteTask(index) {
    event.preventDefault()
    fetch(`${API_END_POINT}/tasks/${index}`, { method: 'DELETE' })
        .then(() => fetchTasks()); // Refresh task list
}

// Load tasks on page load
fetchTasks();
