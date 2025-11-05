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



   function showPopup(message, type) {
    const popup = document.getElementById('responseMessage');
    popup.textContent = message;

    if (type === 'success') {
        popup.style.backgroundColor = '#d4edda';
        popup.style.color = '#155724';
        popup.style.border = '1px solid #c3e6cb';
    } else {
        popup.style.backgroundColor = '#f8d7da';
        popup.style.color = '#721c24';
        popup.style.border = '1px solid #f5c6cb';
    }
    
    // Make it visible
    popup.style.display = 'block';

    // Optional: Make it disappear after a few seconds
    setTimeout(() => {
        popup.style.display = 'none';
    }, 5000);
}