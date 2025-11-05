<?php
// content type header to JSON
header('Content-Type: application/json');

$to_email = 'dev.sohelchaus@gmail.com';
$website_name = "My Portfolio Website"; 

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
    $email_subject = "New Inquiry from " . $website_name . " (" . ucfirst($subject) . ")";
    
    $email_body    = "You have received a new message from your contact form.\n\n";
    $email_body   .= "Name: " . $name . "\n";
    $email_body   .= "Email: " . $email . "\n";
    $email_body   .= "Phone: " . (empty($phone) ? 'N/A (Optional)' : $phone) . "\n";
    $email_body   .= "Subject: " . ucfirst($subject) . "\n\n";
    $email_body   .= "--- Message ---\n" . $message . "\n-----------------\n";

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
