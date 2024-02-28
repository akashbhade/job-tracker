document.addEventListener('DOMContentLoaded', function() {
    // Get reference to the table body
    var tableBody = document.querySelector('#jobTable tbody');

    // Sample data for demonstration
    var jobData = JSON.parse(localStorage.getItem('jobData')) || [];

    // Function to render table rows
    function renderTable() {
        tableBody.innerHTML = '';
        jobData.forEach(function(job, index) {
            var row = tableBody.insertRow();
            row.setAttribute('data-index', index);
            row.innerHTML = `
                <td>${job.title}</td>
                <td>${job.company}</td>
                <td>${job.deadline}</td>
                <td>${job.applied}</td>
                <td>${job.status}</td>
                <td>${job.notes}</td>
                <td>
                    <button class="btn-edit">Edit</button>
                    <button class="btn-delete">Delete</button>
                </td>
            `;
        });
    }

    renderTable();

    // Function to save job data to local storage
    function saveToLocalStorage() {
        localStorage.setItem('jobData', JSON.stringify(jobData));
    }

    // Event listener for adding a new job
    document.getElementById('addRow').addEventListener('click', function() {
        var jobTitle = document.getElementById('jobTitle').value;
        var companyName = document.getElementById('companyName').value;
        var deadline = document.getElementById('deadline').value;
        var dateApplied = document.getElementById('dateApplied').value;
        var status = document.getElementById('status').value;
        var notes = document.getElementById('notes').value;

        // Check if any field is empty
        if (!jobTitle || !companyName || !deadline || !dateApplied || !status || !notes) {
            alert('Please fill in all fields.');
            return;
        }

        // Add new job to jobData array
        jobData.push({
            title: jobTitle,
            company: companyName,
            deadline: deadline,
            applied: dateApplied,
            status: status,
            notes: notes
        });

        // Save to local storage and render table
        saveToLocalStorage();
        renderTable();

        // Clear input fields after adding job
        document.getElementById('jobTitle').value = '';
        document.getElementById('companyName').value = '';
        document.getElementById('deadline').value = '';
        document.getElementById('dateApplied').value = '';
        document.getElementById('status').value = '';
        document.getElementById('notes').value = '';
    });

    // Event delegation for editing and deleting rows
    tableBody.addEventListener('click', function(event) {
        var target = event.target;
        var row = target.closest('tr');
        var index = parseInt(row.getAttribute('data-index'));

        if (target.classList.contains('btn-edit')) {
            var cells = row.querySelectorAll('td:not(:last-child)');
            cells.forEach(function(cell) {
                cell.setAttribute('contenteditable', 'true');
            });
            target.textContent = 'Save';
            target.classList.remove('btn-edit');
            target.classList.add('btn-save');
        } else if (target.classList.contains('btn-save')) {
            var cells = row.querySelectorAll('td:not(:last-child)');
            cells.forEach(function(cell) {
                cell.setAttribute('contenteditable', 'false');
            });
            target.textContent = 'Edit';
            target.classList.remove('btn-save');
            target.classList.add('btn-edit');
            jobData[index] = {
                title: cells[0].textContent,
                company: cells[1].textContent,
                deadline: cells[2].textContent,
                applied: cells[3].textContent,
                status: cells[4].textContent,
                notes: cells[5].textContent
            };
            saveToLocalStorage();
        } else if (target.classList.contains('btn-delete')) {
            jobData.splice(index, 1);
            saveToLocalStorage();
            renderTable();
        }
    });
});
