<?php

require 'config.php';

try {
    $sql = "SELECT * FROM users";
    $query = $pdo->query($sql);
    $result = [];
while ($row = $query->fetch(PDO::FETCH_OBJ))
  {
     $result[] = $row;
  }
echo json_encode($result);
}
catch (PDOException $e) {
    print $e->getMessage();
    }
