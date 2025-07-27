// addDaak.js

// This script handles the form submission for adding new Daak entries
// and stores them in the browser's localStorage.

document.addEventListener('DOMContentLoaded', () => {
    // Get a reference to the form element using its class name.
    // The form has the class 'daak-form'.
    const daakForm = document.querySelector('.daak-form');

    // Optional: Create a message display area for feedback (e.g., success/error).
    // You could add a div like <div id="formMessage" class="text-center mt-4"></div>
    // inside your <section class="form-section"> in add.html, perhaps right before
    // the form-actions div, to display messages directly on the page.
    // For now, if it doesn't exist, messages will be logged to the console.
    let formMessageDiv = document.getElementById('formMessage');
    if (!formMessageDiv) {
        console.warn("No element with ID 'formMessage' found. Form messages will be logged to console.");
    }

    // Function to display messages to the user (on page or in console).
    function displayMessage(message, isError = false) {
        if (formMessageDiv) {
            formMessageDiv.textContent = message;
            // Apply basic styling for success/error.
            if (isError) {
                formMessageDiv.className = 'text-center mt-4 text-red-600 font-semibold';
            } else {
                formMessageDiv.className = 'text-center mt-4 text-green-600 font-semibold';
            }
        } else {
            // Fallback to console if no message div is available.
            if (isError) {
                console.error("Form Error: " + message);
            } else {
                console.log("Form Success: " + message);
            }
        }
    }

    // Function to get existing daak entries from localStorage.
    // This is a common pattern to retrieve and parse JSON data.
    function getDaakEntries() {
        const entriesJson = localStorage.getItem('daakEntries');
        return entriesJson ? JSON.parse(entriesJson) : [];
    }

    // Function to save daak entries to localStorage.
    // This converts the JavaScript array to a JSON string before saving.
    function saveDaakEntries(entries) {
        localStorage.setItem('daakEntries', JSON.stringify(entries));
    }

    // Add an event listener for the 'submit' event on the form.
    if (daakForm) {
        daakForm.addEventListener('submit', (event) => {
            // Prevent the default form submission behavior (page reload).
            event.preventDefault();

            // Create a FormData object from the form.
            // This easily collects all form field values by their 'name' attribute.
            const formData = new FormData(daakForm);

            // Create an object to store the new daak entry's data.
            // We use .get() method of FormData to retrieve values by input's name.
            const newDaakEntry = {
                id: formData.get('daak-id'),
                date: formData.get('date'),
                subject: formData.get('subject'),
                sender: formData.get('sender'),
                receiver: formData.get('receiver'),
                type: formData.get('type'),
                status: formData.get('status'),
                priority: formData.get('priority'),
                description: formData.get('description') || '' // Description is optional, default to empty string
            };

            // Basic validation: Check if required fields are filled.
            // The HTML already has 'required' attribute, but client-side JS validation
            // adds an extra layer and allows custom messages.
            if (!newDaakEntry.id || !newDaakEntry.date || !newDaakEntry.subject ||
                !newDaakEntry.sender || !newDaakEntry.receiver || !newDaakEntry.type ||
                !newDaakEntry.status || !newDaakEntry.priority) {
                displayMessage('Please fill in all required fields.', true);
                return;
            }

            // Get existing entries, add the new one, and save back to localStorage.
            const allDaakEntries = getDaakEntries();
            allDaakEntries.push(newDaakEntry);
            saveDaakEntries(allDaakEntries);

            // Provide success feedback to the user.
            displayMessage('Daak entry added successfully!', false);

            // Clear the form fields after successful submission.
            daakForm.reset();

            // Optional: You might want to automatically redirect to the 'View All' page
            // or 'Track' page after successful submission.
            // Example: setTimeout(() => { window.location.href = 'view.html'; }, 1500);
        });

        // Add event listener for the "Clear Form" button (reset-btn)
        const clearButton = daakForm.querySelector('.reset-btn');
        if (clearButton) {
            clearButton.addEventListener('click', () => {
                // The form's native reset functionality is usually sufficient,
                // but you can add custom logic here if needed.
                displayMessage('Form cleared.', false);
            });
        }
    } else {
        console.error("Daak form not found. Make sure an element with class 'daak-form' exists.");
    }
});
