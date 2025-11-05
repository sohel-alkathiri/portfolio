 function sendFormData(form) {
        
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    const loader = document.getElementById('formLoader');

    fetch('php/contact.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok, status: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            form.reset();
            showPopup(data.message, 'success');
        } 
        else {
            showPopup(data.message, 'error');
        }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        showPopup('A network error occurred. Please try again later.', 'error');
    });
}
