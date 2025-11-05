document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', function (event) {
        // Prevent the form from submitting immediately
        event.preventDefault();

        if (validateForm()) {
            sendFormData(form);
        }
        else {
            console.log("Form is invalid. Cannot send.");
        }
    });

    // Client Side - Validation Funtion
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

    // Send Function
    function sendFormData(form) {
        const formData = new FormData(form);

        const actionUrl = form.getAttribute('action');

        fetch(actionUrl, {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
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

});
