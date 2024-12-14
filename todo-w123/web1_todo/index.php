<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Web1 To-Do List</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>To-DO List</h1>
    <ul>
        <?php 
            $tasks = file('tasks.txt', FILE_IGNORE_NEW_LINES);
            foreach ($tasks as $index => $task) {
                echo "<li>$task <a href='delete-task.php?index=$index'>Delete</a></li>";
            }
        ?>
    </ul>
    <form action="add-task.php" method="POST">
        <label for="task">Add a new task:</label>
        <input type="text" id="task" name="task" required>
        <button type="submit">Add Task</button>
    </form>
</body>
</html>