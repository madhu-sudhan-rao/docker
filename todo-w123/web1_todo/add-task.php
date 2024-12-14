<?php 
    if(isset($_POST['task'])) {
        $task = htmlspecialchars($_POST['task']);
        file_put_contents('tasks.txt', $task . PHP_EOL, FILE_APPEND);
    }
    header('Location: index.php');
    exit();
?>