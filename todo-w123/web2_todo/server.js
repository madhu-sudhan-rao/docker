const express = require('express');
const fs = require('fs');
const cors = require('cors')
const app = express();
const PORT = 8000;
const TASK_FILE = 'tasks.json';

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors())

// Serve static files (frontend)
// app.use(express.static('public'));

// Fetch all tasks
app.get('/tasks', (req, res) => {
    fs.readFile(TASK_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Could not read tasks.' });
        }
        const tasks = JSON.parse(data || '[]');
        res.json(tasks);
    });
});

// Add a new task
app.post('/tasks', (req, res) => {
    const newTask = req.body.task;

    fs.readFile(TASK_FILE, 'utf8', (err, data) => {
        const tasks = JSON.parse(data || '[]');
        tasks.push(newTask);
        fs.writeFile(TASK_FILE, JSON.stringify(tasks), err => {
            if (err) {
                return res.status(500).json({ error: 'Could not save task.' });
            }
            res.json({ success: true });
        });
    });
});

// Delete a task
app.delete('/tasks/:index', (req, res) => {
    const taskIndex = parseInt(req.params.index, 10);

    fs.readFile(TASK_FILE, 'utf8', (err, data) => {
        let tasks = JSON.parse(data || '[]');
        if (taskIndex < 0 || taskIndex >= tasks.length) {
            return res.status(400).json({ error: 'Invalid task index.' });
        }
        tasks.splice(taskIndex, 1);
        fs.writeFile(TASK_FILE, JSON.stringify(tasks), err => {
            if (err) {
                return res.status(500).json({ error: 'Could not update tasks.' });
            }
            res.json({ success: true });
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
