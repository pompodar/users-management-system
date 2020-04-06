<?php

require 'config.php';

try {
    $fname = $_POST['fname'];
    $lname = $_POST['lname'];
    $status = $_POST['status'];
    $role = $_POST['role'];
    $id = $_POST['id'];

   $pdo->exec("UPDATE users SET fname = '$fname', lname = '$lname', status = '$status', role = '$role' WHERE id = $id");
}
catch (PDOException $e) {
    print $e->getMessage();
}
