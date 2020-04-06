<?php
$dsn = "mysql:host=localhost;port=3308;dbname=softsprint";
$user = "root";
$passwd = "";

try {
    $pdo = new PDO($dsn, $user, $passwd);
}
catch (PDOException $e) {
    print $e->getMessage();
}