<?php

require 'config.php';

try {
    $id = $_POST['id'];

    $pdo->exec("DELETE FROM users WHERE id = $id");
}
catch (PDOException $e) {
    print $e->getMessage();
}