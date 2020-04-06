<?php

require 'config.php';

try {
    $fname = $_POST['fname'];
    $lname = $_POST['lname'];
    $status = $_POST['status'];
    $role = $_POST['role'];

    $stmt = $pdo->prepare("INSERT INTO users (fname, lname, status, role) VALUES (:fname, :lname, :status, :role)");
    $stmt->bindParam(':fname', $fname);
    $stmt->bindParam(':lname', $lname);
    $stmt->bindParam(':status', $status);
    $stmt->bindParam(':role', $role);
    
    $stmt->execute();
    
}
catch (PDOException $e) {
    print $e->getMessage();
}
