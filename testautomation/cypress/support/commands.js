
/**
 * Mocks a CSV file upload with a specific status code and response message.
 * This command creates a fake response for a POST request to the '/upload' endpoint.
 * @param {number} statusCode - The HTTP status code to return (e.g., 200 for success).
 * @param {string} message - The message text to return in the response.
 */
Cypress.Commands.add('mockCsvUpload', (statusCode, message) => {
    cy.intercept('POST', '/upload', {
        statusCode: statusCode,
        body: { message: message },
    }).as('uploadCsv');
});


/**
 * Uploads a file for CSV import.
 * This command selects the given file from the "cypress/fixtures" folder
 * and submits it by clicking the submit button.
 * @param {string} fileName - The name of the file to upload from the 'cypress/fixtures' folder.
 */
Cypress.Commands.add('uploadFile', (fileName) => {
    const filePath = 'cypress/fixtures/'

    if(fileName !== ''){
        cy.get('#csv-import').selectFile(`${filePath}${fileName}`);
    }
    
    cy.get('#submit-button').click();
});