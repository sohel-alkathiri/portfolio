document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        if (validateForm()) {
            sendFormData(form);
        } else {
            console.log("Form is invalid!");
        }
    });

    // ----------------------------
    // Client Side - Validation
    // ----------------------------
    function validateForm() {
        let isValid = true;

        const nameInput = document.querySelector('[name="name"]');
        const emailInput = document.querySelector('[name="email"]');
        const phoneInput = document.querySelector('[name="phone"]');
        const subjectSelect = document.querySelector('[name="subject"]');
        const messageArea = document.querySelector('[name="message"]');

        const toggleError = (element, condition) => {
            if (condition) {
                element.classList.add('error');
                isValid = false;
            } else {
                element.classList.remove('error');
            }
        };

        toggleError(nameInput, nameInput.value.trim() === '');
        toggleError(messageArea, messageArea.value.trim() === '');
        toggleError(subjectSelect, subjectSelect.value === '');

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        toggleError(emailInput, !emailPattern.test(emailInput.value.trim()));

        const phonePattern = /^[\d\s\-\(\)\+]{7,20}$/;
        if (phoneInput.value.trim() !== '' && !phonePattern.test(phoneInput.value.trim())) {
            toggleError(phoneInput, true);
        } else {
            toggleError(phoneInput, false);
        }

        return isValid;
    }

    // ----------------------------
    // Send Function
    // ----------------------------
    function sendFormData(form) {
        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');
        const loader = document.getElementById('formLoader');

        submitButton.disabled = true;
        loader.classList.add('active');

        fetch('https://sohelchaus.byethost17.com/contact.php', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                console.log("Response status:", response.status);
                console.log("Response headers:", [...response.headers.entries()]);
                if (!response.ok) {
                    throw new Error('Network response was not ok, status: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                console.log("Response JSON:", data);
                form.reset();
                showPopup(data.message, data.success ? 'success' : 'error');
            })
            .catch(error => {
                console.error('Fetch error:', error);
                showPopup('⚠️ Network error occurred. Please try again later.', 'error');
            })
            .finally(() => {
                submitButton.disabled = false;
                loader.classList.remove('active');
            });
    }

    // ----------------------------
    // Pop-Up Function
    // ----------------------------
    function showPopup(message, type) {
        const successBox = document.getElementById('successMessage');
        const errorBox = document.getElementById('errorMessage');

        successBox.style.display = 'none';
        errorBox.style.display = 'none';
        successBox.classList.remove('show');
        errorBox.classList.remove('show');

        if (type === 'success') {
            successBox.querySelector('span').textContent = message;
            successBox.style.display = 'flex';
            successBox.classList.add('show');
        } else {
            errorBox.querySelector('span').textContent = message;
            errorBox.style.display = 'flex';
            errorBox.classList.add('show');
        }

        setTimeout(() => {
            successBox.style.display = 'none';
            errorBox.style.display = 'none';
            successBox.classList.remove('show');
            errorBox.classList.remove('show');
        }, 5000);
    }
});
