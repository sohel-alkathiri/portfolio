// INPUT REQUIRED FIELD

document.getElementById("contact-form").addEventListener("submit", function (e) {
  const name = this.name.value.trim();
  const email = this.email.value.trim();
  const message = this.message.value.trim();

  if (!name || !email || !message) {
    alert("All fields are required.");
    e.preventDefault();
  }
});

// FORM SUBMISSION
document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();

  emailjs.sendForm("service_o0jg7lj", "template_awe32rr", this)
    .then(function() {
      alert("Message Sent");
    }, function(error) {
      alert("Message Not Sent " + error.text);
    });
});

// FORM VALIDATION
function validateForm() {
  const email = document.getElementById("email").value;
  const emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;

  if (!emailPattern.test(email)) {
    alert("Invalid Email Address.");
    return false;
  }

  alert("Message sent successfully!");
  return true;
}
