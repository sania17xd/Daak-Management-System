// trackDaak.js

// This script handles tracking Daak entries by ID from localStorage.

document.addEventListener('DOMContentLoaded', () => {
    // Get a reference to the tracking form.
    // The form has the class 'login-form' in track.html, which is a bit generic,
    // but we'll use it since it's the only form on the page.
    const trackForm = document.querySelector('.login-form');

    // Get a reference to the Daak ID input field.
    const daakIdInput = document.getElementById('daakId');

    // Optional: Create a message/results display area for feedback.
    // You could add a div like <div id="trackResults" class="mt-6 p-4 border rounded-lg bg-gray-50"></div>
    // inside your <main> section in track.html, perhaps after the form-section,
    // to display search results directly on the page.
    // For now, if it doesn't exist, messages/results will be logged to the console.
    let trackResultsDiv = document.getElementById('trackResults');
    if (!trackResultsDiv) {
        console.warn("No element with ID 'trackResults' found. Tracking results will be logged to console.");
    }

    // Function to get existing daak entries from localStorage.
    // This function is reused from addDaak.js.
    function getDaakEntries() {
        const entriesJson = localStorage.getItem('daakEntries');
        return entriesJson ? JSON.parse(entriesJson) : [];
    }

    // Function to display messages or results to the user.
    function displayTrackResult(message, isError = false, daakEntry = null) {
        if (trackResultsDiv) {
            // Clear previous content
            trackResultsDiv.innerHTML = '';
            trackResultsDiv.className = 'mt-6 p-4 border rounded-lg';

            if (isError) {
                trackResultsDiv.classList.add('bg-red-100', 'border-red-400', 'text-red-700');
                trackResultsDiv.textContent = message;
            } else if (daakEntry) {
                trackResultsDiv.classList.add('bg-green-100', 'border-green-400', 'text-green-700');
                // Construct detailed display for the found entry
                trackResultsDiv.innerHTML = `
                    <h4 class="font-bold text-lg mb-2">Daak Details for ID: ${daakEntry.id}</h4>
                    <p><strong>Date:</strong> ${daakEntry.date}</p>
                    <p><strong>Subject:</strong> ${daakEntry.subject}</p>
                    <p><strong>Sender:</strong> ${daakEntry.sender}</p>
                    <p><strong>Receiver:</strong> ${daakEntry.receiver}</p>
                    <p><strong>Type:</strong> ${daakEntry.type}</p>
                    <p><strong>Status:</strong> ${daakEntry.status}</p>
                    <p><strong>Priority:</strong> ${daakEntry.priority}</p>
                    <p><strong>Description:</strong> ${daakEntry.description || 'N/A'}</p>
                `;
            } else {
                trackResultsDiv.classList.add('bg-blue-100', 'border-blue-400', 'text-blue-700');
                trackResultsDiv.textContent = message;
            }
        } else {
            // Fallback to console if no message div is available.
            if (isError) {
                console.error("Tracking Error: " + message);
            } else if (daakEntry) {
                console.log("Daak Found:", daakEntry);
            } else {
                console.log("Tracking Message: " + message);
            }
        }
    }

    // Add an event listener for the 'submit' event on the form.
    if (trackForm) {
        trackForm.addEventListener('submit', (event) => {
            // Prevent the default form submission behavior (page reload).
            event.preventDefault();

            // Get the Daak ID entered by the user.
            const searchId = daakIdInput.value.trim();

            // Basic validation: Check if the input field is empty.
            if (searchId === '') {
                displayTrackResult('Please enter a Daak ID to track.', true);
                return;
            }

            // Get all existing daak entries from localStorage.
            const allDaakEntries = getDaakEntries();

            // Search for the Daak entry with the matching ID.
            // Using find() method to get the first matching entry.
            const foundDaak = allDaakEntries.find(entry => entry.id === searchId);

            // Display the result.
            if (foundDaak) {
                displayTrackResult('Daak found!', false, foundDaak);
            } else {
                displayTrackResult(`Daak with ID "${searchId}" not found.`, true);
            }

            // Optional: Clear the input field after search
            // daakIdInput.value = '';
        });
    } else {
        console.error("Tracking form not found. Make sure an element with class 'login-form' exists or is correctly targeted.");
    }
});
