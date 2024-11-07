const form = document.getElementById('import-form');
const response = document.getElementById('response');
const MAX_FILE_SIZE = 1024 * 1024;

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

const validationPatterns = {
    empty: messages.noData,
    missing_column: messages.missingColumn,
    wrong_column: messages.wrongColumn,
    wrong_datatype: messages.invalidDataType,
    required_field: messages.requiredFields,
    duplicate_records: messages.duplicateRecords,
    null_value: messages.nullValue
};

function displayResponse(message){
    response.textContent = message;

    response.style.color = message !== messages[0] ? "red" : "green";
}

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

function validateData(fileName) {
    for (const [pattern, message] of Object.entries(validationPatterns)) {
        if (new RegExp(pattern).test(fileName)) {
            displayResponse(message);
            return false;
        }
    }

    displayResponse(messages.success);
    return true;
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const fileInput = document.getElementById('csv-import');
    const file = fileInput.files[0];

    const fileValidated = validateFile(file);

    if(fileValidated){
        validateData(file.name);
    }
});