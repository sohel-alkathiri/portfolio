// --- NEW FUNCTION TO HANDLE SENDING ---
function sendFormData(form) {
    const formData = new FormData(form);
    
    // The URL should match the 'action' in your HTML form, 
    // or the name of your PHP file (e.g., 'process_form.php')
    const actionUrl = form.getAttribute('action'); 

    fetch(actionUrl, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        // Check if the server responded with an OK status (200)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Assuming your PHP returns JSON
    })
    .then(data => {
        // Handle the response from the PHP script
        if (data.success) {
            alert('✅ Message Sent Successfully! Thank you.');
            form.reset(); // Clear the form fields
        } else {
            alert('❌ Error: ' + data.message);
        }
    })
    .catch(error => {
        // Handle network errors or issues with the fetch request
        console.error('Fetch error:', error);
        alert('An error occurred while sending the message. Please try again later.');
    });
}
