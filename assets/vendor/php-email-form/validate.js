/**
* Email Form Validation - v3.9
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
*/

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');
    if (!form) {
        console.error('Contact form not found. Please check if the element with id="contact-form" exists.');
        return;
    }

    form.addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent default form submission
        debugger;
        // Show loading state
        const loading = this.querySelector('.loading');
        const errorMessage = this.querySelector('.error-message');
        const sentMessage = this.querySelector('.sent-message');

        loading.style.display = 'block';
        errorMessage.style.display = 'none';
        sentMessage.style.display = 'none';

        try {
            const formData = new FormData(this);
            const response = await fetch('https://formspree.io/f/mblklyze', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Success: Show success message and reset form
                sentMessage.style.display = 'block';
                this.reset();
            } else {
                // Error: Show error message
                const data = await response.json();
                errorMessage.textContent = data.error || 'Something went wrong. Please try again.';
                errorMessage.style.display = 'block';
            }
        } catch (error) {
            // Network or unexpected error
            errorMessage.textContent = 'Failed to send message. Check your connection and try again.';
            errorMessage.style.display = 'block';
        } finally {
            // Hide loading state
            loading.style.display = 'none';
        }
    });
});
