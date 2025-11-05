document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', function (event) { 
        event.preventDefault();

        if (validateForm()) {
            sendFormData(form);
        }
        else {
            console.log("Form is invalid!. Cannot send.");
        }
    });

    // --------------------------------
    // Client Side - Validation Funtion
    // --------------------------------
    function validateForm() {
        let isValid = true;

        const nameInput = document.querySelector('[name="name"]');
        const emailInput = document.querySelector('[name="email"]');
        const phoneInput = document.querySelector('[name="phone"]');
        const subjectSelect = document.querySelector('[name="subject"]');
        const messageArea = document.querySelector('[name="message"]');

        // Helper function - show/hide error styling
        const toggleError = (element, condition) => {
            if (condition) {
                element.classList.add('error');
                isValid = false;
            } else {
                element.classList.remove('error');
            }
        };

        // --- NAME Validation ---
        toggleError(nameInput, nameInput.value.trim() === '');

        // --- MESSAGE Validation ---
        toggleError(messageArea, messageArea.value.trim() === '');

        // --- SUBJECT Validation ---
        toggleError(subjectSelect, subjectSelect.value === '');

        // --- EMAIL Validation ---
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  //Regex pattern
        if (!emailPattern.test(emailInput.value.trim())) {
            toggleError(emailInput, true);
        } else {
            toggleError(emailInput, false);
        }

        // --- PHONE Validation ---
        const phonePattern = /^[\d\s\-\(\)\+]{7,20}$/;
        if (phoneInput.value.trim() !== '' && !phonePattern.test(phoneInput.value.trim())) {
            toggleError(phoneInput, true); // Invalid format if something is entered
        } else {
            toggleError(phoneInput, false);
        }
        return isValid;
    }

    // -------------
    // Send Function
    // -------------
    function sendFormData(form) {
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    const loader = document.getElementById('formLoader');

    // Disable button and show loader
    submitButton.disabled = true;
    loader.style.display = 'inline-block';

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
        form.reset();
        showPopup(data.message, data.success ? 'success' : 'error');
    })
    .catch(error => {
        console.error('Fetch error:', error);
        showPopup('A network error occurred. Please try again later.', 'error');
    })
    .finally(() => {
        // Re-enable button and hide loader
        submitButton.disabled = false;
        loader.style.display = 'none';
    });
    }

    // ---------------
    // Pop-Up Function
    // ---------------
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
});