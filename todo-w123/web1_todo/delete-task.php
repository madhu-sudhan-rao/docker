<?php
if (isset($_GET['index'])) {
    $index = (int)$_GET['index'];
    $tasks = file('tasks.txt', FILE_IGNORE_NEW_LINES);
    unset($tasks[$index]);
    file_put_contents('tasks.txt', implode(PHP_EOL, $tasks) . PHP_EOL);
}
header('Location: index.php');
exit();
?>