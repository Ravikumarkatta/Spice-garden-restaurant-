document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        // Real-time validation
        nameInput.addEventListener('input', validateName);
        emailInput.addEventListener('input', validateEmail);
        messageInput.addEventListener('input', validateMessage);
        
        function validateName() {
            const name = nameInput.value.trim();
            const nameError = document.getElementById('name-error') || createErrorElement(nameInput, 'name-error');
            
            if (name.length === 0) {
                showError(nameInput, nameError, 'Name is required');
                return false;
            } else if (name.length < 2) {
                showError(nameInput, nameError, 'Name must be at least 2 characters');
                return false;
            } else {
                showSuccess(nameInput, nameError);
                return true;
            }
        }
        
        function validateEmail() {
            const email = emailInput.value.trim();
            const emailError = document.getElementById('email-error') || createErrorElement(emailInput, 'email-error');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email.length === 0) {
                showError(emailInput, emailError, 'Email is required');
                return false;
            } else if (!emailRegex.test(email)) {
                showError(emailInput, emailError, 'Please enter a valid email');
                return false;
            } else {
                showSuccess(emailInput, emailError);
                return true;
            }
        }
        
        function validateMessage() {
            const message = messageInput.value.trim();
            const messageError = document.getElementById('message-error') || createErrorElement(messageInput, 'message-error');
            
            if (message.length === 0) {
                showError(messageInput, messageError, 'Message is required');
                return false;
            } else if (message.length < 10) {
                showError(messageInput, messageError, 'Message should be at least 10 characters');
                return false;
            } else {
                showSuccess(messageInput, messageError);
                return true;
            }
        }
        
        function createErrorElement(input, id) {
            const errorElement = document.createElement('div');
            errorElement.id = id;
            errorElement.className = 'error-message';
            input.parentNode.insertBefore(errorElement, input.nextSibling);
            return errorElement;
        }
        
        function showError(input, errorElement, message) {
            errorElement.textContent = message;
            input.classList.add('error');
            input.classList.remove('success');
        }
        
        function showSuccess(input, errorElement) {
            errorElement.textContent = '';
            input.classList.remove('error');
            input.classList.add('success');
        }
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isMessageValid = validateMessage();
            
            if (isNameValid && isEmailValid && isMessageValid) {
                // Simulate form submission
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
                
                setTimeout(() => {
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'form-success';
                    successMessage.textContent = 'Thank you! Your message has been sent.';
                    contactForm.appendChild(successMessage);
                    
                    // Reset form
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                    
                    // Remove success message after 5 seconds
                    setTimeout(() => {
                        successMessage.remove();
                    }, 5000);
                }, 1500);
            }
        });
    }
});
