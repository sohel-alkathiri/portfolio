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