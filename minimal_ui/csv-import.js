// Select DOM elements
const form = document.getElementById('import-form');
const messageField = document.getElementById('messageField');

/**
 * Displays a response message to the user.
 * Changes the color of the message based on whether it's a success or error.
 * @param {string} message - The message to display.
 */
function displayResponse(message){
    messageField.textContent = message;

    messageField.style.color = message !== 'Import succesfull.' ? "red" : "green";
}

/**
 * Handles the form submission event.
 * Prevents the default form submission and sends the file to the server via a POST request.
 * @param {Event} event - The submit event triggered when the form is submitted.
 */
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the page from reloading when the form is submitted

    const fileInput = document.getElementById('csv-import');
    const file = fileInput.files[0];

    const formData = new FormData();

    formData.append('file', file);
    
    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        displayResponse(data.message);
    })
    .catch(error => {
        console.log(error);
        messageField.textContent = 'Upload error';
    });
});