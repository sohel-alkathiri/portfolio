<?php
$conn = new mysqli("sql213.infinityfree.com", "if0_40097979", "4GAy9BITXp", "if0_40097979_contactform_db");

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$result = $conn->query("SELECT * FROM message ORDER BY submitted_at DESC");

while ($row = $result->fetch_assoc()) {
  echo "<tr>
    <td>{$row['id']}</td>
    <td>{$row['name']}</td>
    <td>{$row['email']}</td>
    <td>{$row['message']}</td>
    <td>{$row['submitted_at']}</td>
  </tr>";
}

$conn->close();
?>
