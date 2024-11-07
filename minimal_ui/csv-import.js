// Select DOM elements
const form = document.getElementById('import-form');
const response = document.getElementById('response');

// Maximum allowed file size for upload (1 MB)
const MAX_FILE_SIZE = 1024 * 1024;

// Messages to show for different situations
const messages = {
    success: "Import successful.",
    noFile: "No file selected",
    invalidType: "Invalid file type, please upload only CSV files.",
    fileTooLarge: "File exceeds the maximum allowed file size limit.",
    noData: "No data available.",
    missingColumn: "Missing columns in the CSV file.",
    wrongColumn: "Incorrect column format.",
    invalidDataType: "Invalid data type in one or more columns.",
    requiredFields: "Required fields are missing in the CSV file.",
    duplicateRecords: "Duplicate records found.",
    nullValue: "NULL values found in records."
};

// Regular expressions to check file names for errors
const validationPatterns = {
    empty: messages.noData,
    missing_column: messages.missingColumn,
    wrong_column: messages.wrongColumn,
    wrong_datatype: messages.invalidDataType,
    required_field: messages.requiredFields,
    duplicate_records: messages.duplicateRecords,
    null_value: messages.nullValue
};

/**
 * Displays a response message to the user.
 * Changes the color of the message based on whether it's a success or error.
 * @param {string} message - The message to display.
 */
function displayResponse(message){
    response.textContent = message;

    response.style.color = message !== messages.success ? "red" : "green";
}

/**
 * Validate the selected file.
 * Checks if the file exists, if it's a CSV, and if the size is acceptable.
 * @param {File} file - The file to be valideted.
 * @returns {boolean} - Returns true if the file is valid, false otherwise.
 */
function validateFile(file){
    if (!file) {
        displayResponse(messages.noFile);
        return false;
    }

    if (file.type !== 'text/csv') {
        displayResponse(messages.invalidType);
        return false;
    }

    if (file.size > MAX_FILE_SIZE) {
        displayResponse(messages.fileTooLarge);
        return false;
    }

    return true;
}

/**
 * Validates the file data based on the file name.
 * Checks if the file name has any errors and shows the appropriate message.
 * @param {string} fileName - The name of the file to be validated.
 * @returns {boolean} - Returns true if the data is valid, false otherwise.
 */
function validateData(fileName) {
    // Loop through all validation patterns and check if any pattern matches the file name
    for (const [pattern, message] of Object.entries(validationPatterns)) {
        if (new RegExp(pattern).test(fileName)) {
            displayResponse(message);
            return false;
        }
    }

    displayResponse(messages.success);
    return true;
}

/**
 * Handle the form submission event.
 * Prevents the default form submission and validates the file.
 * @param {Event} event - The submit event triggered when the form is submitted.
 */
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the page from reloading when the form is submitted

    const fileInput = document.getElementById('csv-import');
    const file = fileInput.files[0];

    const fileValidated = validateFile(file);

    if(fileValidated){
        validateData(file.name);
    }
});