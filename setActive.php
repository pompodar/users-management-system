<?php

require 'config.php';

try {    
    $id_array = $_POST['id_array'];

    for ($i = 0; $i < count($id_array); $i++) {
        $id = $id_array[$i];
        $pdo->exec("UPDATE users SET status = 'active' WHERE id = $id");
    }
}
catch (PDOException $e) {
    print $e->getMessage();
    }