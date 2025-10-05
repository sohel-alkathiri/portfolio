<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = $_POST["name"];
  $email = $_POST["email"];
  $message = $_POST["message"];

  $to = "sohel.alkathiri@email.com";
  $subject = "New Contact Form Message";
  $body = "Name: $name\nEmail: $email\nMessage:\n$message";

  if (mail($to, $subject, $body)) {
    echo "Message Sent.";
  } else {
    echo "Message Not Send.";
  }
}
?>
