<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = $_POST["name"];
  $email = $_POST["email"];
  $message = $_POST["message"];

  /------------------
  // MYSQL CONNECTION
  // ----------------

  $conn = new mysqli("sql213.infinityfree.com", "if0_40097979", "4GAy9BITXp", "if0_40097979_contactform_db");

  if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
  }

  // ---------------------
  // INSERT MESSAGE - MYSQL
  // ----------------------

  $sql = "INSERT INTO message (name, email, message) VALUES ('$name', '$email', '$message')";
  if ($conn->query($sql) === TRUE) {
    echo "Message stored successfully!";
  } else {
    echo "Error storing message: " . $conn->error;
  }

  $conn->close();
}
?>
