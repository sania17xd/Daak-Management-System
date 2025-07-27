// viewAllDaak.js

// This script handles displaying, filtering, searching, and deleting
// Daak entries on the 'View All' page, using data from localStorage.

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Element References ---
    const daakTableBody = document.querySelector('.daak-table tbody');
    const filterTypeSelect = document.getElementById('filter-type');
    const filterStatusSelect = document.getElementById('filter-status');
    const searchDaakInput = document.getElementById('search-daak');
    const applyFiltersBtn = document.querySelector('.filter-btn');
    const clearFiltersBtn = document.querySelector('.clear-btn');
    const pageInfoSpan = document.querySelector('.page-info'); // For pagination display
    const recordCountSpan = document.querySelector('.record-count span'); // For record count display

    // --- Helper Functions ---

    // Function to get existing daak entries from localStorage.
    // This function is consistent across all your JS files.
    function getDaakEntries() {
        const entriesJson = localStorage.getItem('daakEntries');
        return entriesJson ? JSON.parse(entriesJson) : [];
    }

    // Function to save daak entries to localStorage.
    function saveDaakEntries(entries) {
        localStorage.setItem('daakEntries', JSON.stringify(entries));
    }

    // Function to determine the badge class for status and type for styling.
    function getBadgeClass(value) {
        switch (value.toLowerCase()) {
            case 'incoming': return 'badge incoming';
            case 'outgoing': return 'badge outgoing';
            case 'pending': return 'badge pending';
            case 'forwarded': return 'badge forwarded';
            case 'resolved': return 'badge resolved';
            default: return 'badge';
        }
    }

    // Function to determine the priority class for styling.
    function getPriorityClass(priority) {
        switch (priority.toLowerCase()) {
            case 'low': return 'priority low';
            case 'medium': return 'priority medium';
            case 'high': return 'priority high';
            case 'urgent': return 'priority urgent';
            default: return 'priority';
        }
    }

    // Function to render (display) the daak entries in the table.
    function renderDaakTable(entriesToRender) {
        // Clear existing table rows.
        daakTableBody.innerHTML = '';

        // Update record count display.
        recordCountSpan.textContent = `Showing ${entriesToRender.length} of ${getDaakEntries().length} records`;
        // Basic pagination info (not actual pagination logic yet)
        pageInfoSpan.textContent = `Page 1 of 1`; // Assuming all filtered results are on one page for now

        if (entriesToRender.length === 0) {
            // Display a message if no records are found.
            const noRecordsRow = document.createElement('tr');
            noRecordsRow.innerHTML = `<td colspan="9" class="text-center py-4 text-gray-500">No Daak records found.</td>`;
            daakTableBody.appendChild(noRecordsRow);
            return;
        }

        // Iterate over each entry and create a table row for it.
        entriesToRender.forEach(entry => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="daak-id">${entry.id}</td>
                <td class="subject">${entry.subject}</td>
                <td>${entry.date}</td>
                <td>${entry.sender}</td>
                <td>${entry.receiver}</td>
                <td><span class="${getBadgeClass(entry.type)}">${entry.type}</span></td>
                <td><span class="${getBadgeClass(entry.status)}">${entry.status}</span></td>
                <td><span class="${getPriorityClass(entry.priority)}">${entry.priority}</span></td>
                <td class="actions">
                    <button class="view-btn" title="View Details" data-id="${entry.id}">👁️</button>
                    <button class="edit-btn" title="Edit" data-id="${entry.id}">✏️</button>
                    <button class="delete-btn" title="Delete" data-id="${entry.id}">🗑️</button>
                </td>
            `;
            daakTableBody.appendChild(row);
        });

        // Attach event listeners to newly rendered action buttons (especially delete).
        addActionButtonListeners();
    }

    // Function to handle deleting a daak entry.
    function deleteDaakEntry(idToDelete) {
        let entries = getDaakEntries();
        // Filter out the entry with the matching ID.
        const updatedEntries = entries.filter(entry => entry.id !== idToDelete);
        saveDaakEntries(updatedEntries);
        // Re-render the table with the updated data.
        applyFiltersAndSearch(); // Re-apply filters to ensure correct display
    }

    // Function to attach event listeners to action buttons (view, edit, delete).
    function addActionButtonListeners() {
        // Select all delete buttons and add click listeners.
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.onclick = () => {
                // In a real app, you might want a confirmation dialog here.
                if (confirm(`Are you sure you want to delete Daak ID: ${button.dataset.id}?`)) {
                    deleteDaakEntry(button.dataset.id);
                }
            };
        });

        // For View and Edit buttons, you would typically redirect or open a modal.
        document.querySelectorAll('.view-btn').forEach(button => {
            button.onclick = () => {
                alert(`Viewing details for Daak ID: ${button.dataset.id}. (Functionality to be added)`);
                // Example: window.location.href = `view-details.html?id=${button.dataset.id}`;
            };
        });

        document.querySelectorAll('.edit-btn').forEach(button => {
            button.onclick = () => {
                alert(`Editing Daak ID: ${button.dataset.id}. (Functionality to be added)`);
                // Example: window.location.href = `edit.html?id=${button.dataset.id}`;
            };
        });
    }

    // Function to apply filters and search.
    function applyFiltersAndSearch() {
        const allEntries = getDaakEntries();
        let filteredEntries = [...allEntries]; // Create a shallow copy to work with

        const typeFilter = filterTypeSelect.value;
        const statusFilter = filterStatusSelect.value;
        const searchTerm = searchDaakInput.value.toLowerCase().trim();

        // Apply type filter
        if (typeFilter) {
            filteredEntries = filteredEntries.filter(entry => entry.type === typeFilter);
        }

        // Apply status filter
        if (statusFilter) {
            filteredEntries = filteredEntries.filter(entry => entry.status === statusFilter);
        }

        // Apply search term filter (ID, Subject, Sender)
        if (searchTerm) {
            filteredEntries = filteredEntries.filter(entry =>
                entry.id.toLowerCase().includes(searchTerm) ||
                entry.subject.toLowerCase().includes(searchTerm) ||
                entry.sender.toLowerCase().includes(searchTerm)
            );
        }

        renderDaakTable(filteredEntries);
    }

    // Function to clear all filters and search terms.
    function clearFilters() {
        filterTypeSelect.value = '';
        filterStatusSelect.value = '';
        searchDaakInput.value = '';
        applyFiltersAndSearch(); // Re-render with all entries
    }

    // --- Event Listeners ---

    // Initial render of all daak entries when the page loads.
    applyFiltersAndSearch(); // Call this to render initial table and update counts

    // Event listener for the "Apply Filters" button.
    applyFiltersBtn.addEventListener('click', applyFiltersAndSearch);

    // Event listener for the "Clear" filters button.
    clearFiltersBtn.addEventListener('click', clearFilters);


});
