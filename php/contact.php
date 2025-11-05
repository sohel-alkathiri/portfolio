<?php
error_reporting(0);
header('Content-Type: application/json');

// Load PHPMailer classes
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'Exception.php'; 
require 'PHPMailer.php';
require 'SMTP.php';

// Configuration
$to_email     = 'dev.sohelchaus@gmail.com';
$website_name = "My Portfolio";

// Handle POST request
if ($_SERVER["REQUEST_METHOD"] === "POST" && !empty($_POST)) {
    // Sanitize inputs
    $name    = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_SPECIAL_CHARS);
    $email   = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $phone   = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_SPECIAL_CHARS);
    $subject = filter_input(INPUT_POST, 'subject', FILTER_SANITIZE_SPECIAL_CHARS);
    $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_SPECIAL_CHARS);

    // Validate required fields
    if (empty($name) || !filter_var($email, FILTER_VALIDATE_EMAIL) || empty($subject) || empty($message)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Validation error: Please fill in all required fields.'
        ]);
        exit;
    }

    // Compose email
    $email_subject = "Inquiry from $website_name (" . ucfirst($subject) . ")";
    $email_body    = "You have received a new message from your contact form.\n\n";
    $email_body   .= "Name: $name\n";
    $email_body   .= "Email: $email\n";
    $email_body   .= "Phone: " . ($phone ?: 'N/A (Optional)') . "\n";
    $email_body   .= "Subject: " . ucfirst($subject) . "\n\n";
    $email_body   .= "--- Message ---\n$message\n-----------------\n";

    // Send using PHPMailer
    $mail = new PHPMailer(true);

    try {
        // SMTP settings
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'dev.sohelchaus@gmail.com';
        $mail->Password   = 'mqkk nyim iibf zkjg';
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;

        // Recipients
        $mail->setFrom($email, $name);
        $mail->addAddress($to_email);

        // Content
        $mail->isHTML(false);
        $mail->Subject = $email_subject;
        $mail->Body    = $email_body;

        $mail->send();

        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Message Sent Successfully!'
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => "Server error: Message could not be sent. Mailer Error: {$mail->ErrorInfo}"
        ]);
    }
} else {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method or no data received.'
    ]);
}