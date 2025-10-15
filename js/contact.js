document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();

  emailjs.sendForm("service_o0jg7lj", "template_awe32rr", this)
    .then(function() {
      alert("Message Sent");
    }, function(error) {
      alert("Message Not Sent " + error.text);
    });
});
