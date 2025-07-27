// login.js

// This script handles the login form submission on the index.html page.

document.addEventListener('DOMContentLoaded', () => {
    // Get a reference to the login form using its class name.
    // document.querySelector returns the first element that matches the selector.
    const loginForm = document.querySelector('.login-form');

    // Get references to the username and password input fields by their IDs.
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    // Optional: Create a message display area.
    // Since you don't want to modify HTML, we'll try to find an existing element
    // or log to the console. If you wish to display messages directly on the page,
    // you could add a simple <div id="loginMessage" class="text-center mt-4"></div>
    // inside your <section class="login-section"> in index.html.
    // For now, if it doesn't exist, messages will appear in the browser's console.
    let loginMessageDiv = document.getElementById('loginMessage');
    if (!loginMessageDiv) {
        console.warn("No element with ID 'loginMessage' found. Login messages will be logged to console.");
    }

    // Function to display messages to the user.
    function displayMessage(message, isError = false) {
        if (loginMessageDiv) {
            loginMessageDiv.textContent = message;
            // Apply basic styling for success/error if the div exists.
            if (isError) {
                loginMessageDiv.className = 'text-center mt-4 text-red-600 font-semibold';
            } else {
                loginMessageDiv.className = 'text-center mt-4 text-green-600 font-semibold';
            }
        } else {
            // Fallback to console if no message div is available.
            if (isError) {
                console.error("Login Error: " + message);
            } else {
                console.log("Login Success: " + message);
            }
        }
    }

    // Add an event listener for the 'submit' event on the login form.
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            // Prevent the default form submission behavior.
            // This stops the page from reloading when the form is submitted.
            event.preventDefault();

            // Get the current values from the username and password input fields.
            const username = usernameInput.value.trim(); // .trim() removes leading/trailing whitespace
            const password = passwordInput.value.trim();

            // Basic client-side validation: Check if fields are empty.
            if (username === '' || password === '') {
                displayMessage('Please enter both username and password.', true);
                return; // Stop the function if validation fails.
            }

            // --- Simulated Login Logic ---
            // In a real application, you would send these credentials to a server
            // for authentication (e.g., using fetch() API).
            // For this example, we'll use hardcoded values for demonstration.
            const validUsername = 'admin';
            const validPassword = 'password123';

            if (username === validUsername && password === validPassword) {
                displayMessage('Login successful! Redirecting...', false);
                // In a real app, you would redirect the user to a dashboard or home page.
                // Example: window.location.href = 'dashboard.html';
                // For now, we'll just log it.
                console.log("Simulated login successful for user:", username);

                // Clear the form fields after successful login
                usernameInput.value = '';
                passwordInput.value = '';

                // You might want to disable the form or show a loading state here
                // before a real redirection.
            } else {
                displayMessage('Invalid username or password. Please try again.', true);
                // Clear password field for security
                passwordInput.value = '';
            }
        });
    } else {
        console.error("Login form not found. Make sure an element with class 'login-form' exists.");
    }
});