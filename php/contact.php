<?php
// PHP Mailer Function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'Exception.php'; 
require 'PHPMailer.php';
require 'SMTP.php';

// content type header to JSON
header('Content-Type: application/json');

$to_email = 'dev.sohelchaus@gmail.com';
$website_name = "My Portfolio"; 

if ($_SERVER["REQUEST_METHOD"] == "POST" && !empty($_POST)) {

    $name    = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_SPECIAL_CHARS);
    $email   = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $phone   = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_SPECIAL_CHARS);
    $subject = filter_input(INPUT_POST, 'subject', FILTER_SANITIZE_SPECIAL_CHARS);
    $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_SPECIAL_CHARS);

    // Server-Side - Validation Funtion
    if (empty($name) || !filter_var($email, FILTER_VALIDATE_EMAIL) || empty($subject) || empty($message)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Validation error: Please fill in all required fields.']);
        exit;
    }

    // Email Validation (Form Validation)
    $email_subject = "Inquiry from " . $website_name . " (" . ucfirst($subject) . ")";
    
    $email_body    = "You have received a new message from your contact form.\n\n";
    $email_body   .= "Name: " . $name . "\n";
    $email_body   .= "Email: " . $email . "\n";
    $email_body   .= "Phone: " . (empty($phone) ? 'N/A (Optional)' : $phone) . "\n";
    $email_body   .= "Subject: " . ucfirst($subject) . "\n\n";
    $email_body   .= "--- Message ---\n" . $message . "\n-----------------\n";

    // PHPMailer - Error Handling
$mail = new PHPMailer(true); // Create a new PHPMailer object

try {
    // Server settings
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com'; 
    $mail->SMTPAuth   = true;
    $mail->Username   = 'dev.sohelchaus@gmail.com';
    $mail->Password   = 'mqkk nyim iibf zkjg';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = 465;                        

    // Recipients
    $mail->setFrom($email, $name);     
    $mail->addAddress($to_email);      // Sends to your defined $to_email

    // Content
    $mail->isHTML(false); // Plain text
    $mail->Subject = $email_subject;
    $mail->Body    = $email_body;

    $mail->send();
    
    // Success response for JavaScript
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Message Sent Successfully!']);

    } catch (Exception $e) {
    // Failure response for JavaScript (catches errors during connection/authentication)
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => "Server error: Message could not be sent. Mailer Error: {$mail->ErrorInfo}"]);
}

    // 5. Define Email Header
    $headers  = 'From: ' . $website_name . ' <noreply@yourdomain.com>' . "\r\n";
    $headers .= 'Reply-To: ' . $email . "\r\n";
    $headers .= 'X-Mailer: PHP/' . phpversion();

    // 6. Send the Email
    if (mail($to_email, $email_subject, $email_body, $headers)) {
        http_response_code(200);
        echo json_encode(['success' => true, 'message' => 'Message Sent!']);
    } else {
        http_response_code(500); 
        echo json_encode(['success' => false, 'message' => 'Server error: Failed to send email. Check mail server settings.']);
    }

} else {
    // Handle incorrect access
    http_response_code(405); 
    echo json_encode(['success' => false, 'message' => 'Invalid request method or no data received.']);
}
?>
